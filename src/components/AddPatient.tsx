import React, { BaseSyntheticEvent, useContext, useState } from 'react';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import { useNavigate } from 'react-router-dom';
import {
  FormControl, FormLabel, Textarea, useToast,
  Button, Text, Input, Flex, Grid, GridItem, Box, Checkbox,
} from '@chakra-ui/react'
import { buttonFocusKeys, bodyDataPatient, statusObject } from '../services/types';
import objectCounterWeekDays, { addToSchedule, removeFromSchedule } from '../services/daysOfMonth';
import axiosServices from '../services/index';
import MyContext from '../context/MyContext';

const DAYS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

const BUTTONFOCUS: buttonFocusKeys = {
  1: { focus: false },
  2: { focus: false },
  3: { focus: false },
  4: { focus: false },
  5: { focus: false },
  6: { focus: false },
  7: { focus: false },
}

const DATA_PATIENT: bodyDataPatient = {
  patient: '',
  neighborhood: '',
  healthInsurance: '',
  days: [],
  serviceGoal: {
    weekly: 0,
    monthly: 0,
  },
  servicePerformed: {
    weekly: 0,
    monthly: 0,
  },
  unitPrice: '',
  evolution: '',
  schedule: []
}

export default function AddPatient () {
  const { setNewRequestIfItChanged, newRequestIfItChanged } = useContext(MyContext)
  const navigate = useNavigate();
  const toast = useToast();
  const [buttonsFocus, setButtonsFocus] = useState<buttonFocusKeys>(BUTTONFOCUS);
  const [dataForm, setDataForm] = useState<bodyDataPatient>(DATA_PATIENT);
  const [chooseQuantity, setChooseQuantity] = useState<boolean>(false);
  const [performed, setPerformed] = useState<boolean>(false);

  const handleChangeUnitPrice = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const copyDataForm = { ...dataForm };
    const { value } = e.target as HTMLInputElement;
    const number = value;
    copyDataForm.unitPrice = number.replace(',', '.');
    setDataForm(copyDataForm);
  }

  const handleInputChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    const newState = Object.assign({}, dataForm);

    if (name === 'serviceGoal.monthly') {
      newState.serviceGoal.monthly = +value;
      setDataForm(newState);
    }
    else if (name === 'servicePerformed.monthly') {
      newState.servicePerformed.monthly = +value;
      setDataForm(newState);
    }
    else if (name === 'servicePerformed.weekly') {
      newState.servicePerformed.weekly = +value;
      setDataForm(newState);
    }
    else if (name === 'chooseQuantity') {
      value === 'false' ? setChooseQuantity(true) : setChooseQuantity(false);
    }
    else if (name === 'performed') {
      value === 'false' ? setPerformed(true) : setPerformed(false);
    }
    // else if (name === 'unitPrice') {
    //   newState.unitPrice = +value;
    //   setDataForm(newState);
    // }
    else if (name !== 'unitPrice')  {
      setDataForm({ ...dataForm, [name]: value });
    }
  };

  const checkIfCanSetSchedule = (arraySchedule: statusObject[], arrayStatusFromState: statusObject[]): void => {
    const isRepeted = arraySchedule.some((statusSchedule) => {
      return arrayStatusFromState.some((statusState) => {
        statusSchedule.monthDay === statusState.monthDay
      })
    });
    
    if (isRepeted) {
      setDataForm({ ...dataForm });
    }
    else {
      const newArray = [ ...dataForm.schedule, ...arraySchedule ];
      setDataForm({ ...dataForm, schedule: newArray });
    }
  }

  const includeExcludeSchedule = (index: number) => {  
    if (dataForm.days.includes(index) === false) {
      const schedule = addToSchedule(index);
      const arrayStatus = [...dataForm.schedule ];
      checkIfCanSetSchedule(schedule, arrayStatus);
    }
    if (dataForm.days.includes(index) === true) {
      const copyArrayStatus = [...dataForm.schedule];
      const newArray = removeFromSchedule(index, copyArrayStatus);
      const dataFormCopy = dataForm;
      dataFormCopy.schedule = newArray;
      setDataForm(dataFormCopy);
    }
  }


  const handleDayClick = (e: BaseSyntheticEvent, index: number) => {
    includeExcludeSchedule(index);

    const newState = Object.assign({}, dataForm);

    let monthly = +newState.serviceGoal.monthly;
    
    if (!chooseQuantity && !buttonsFocus[index].focus) {
      monthly += objectCounterWeekDays[index];
      newState.serviceGoal.monthly = monthly;
    }

    if (!chooseQuantity && buttonsFocus[index].focus) {
      monthly -= objectCounterWeekDays[index];
      monthly = monthly < 0 ? 0 : monthly;
      newState.serviceGoal.monthly = monthly;
    }

    if (!buttonsFocus[index].focus) {
      setButtonsFocus({ ...buttonsFocus, [index]: { focus: true } });
      dataForm.days.push(index);
      newState.serviceGoal.weekly = dataForm.days.length;
    } else {
      setButtonsFocus({ ...buttonsFocus, [index]: { focus: false } });
      const copyDays = [...dataForm.days];
      copyDays.splice(dataForm.days.indexOf(index), 1);
      setDataForm({ ...dataForm, days: copyDays });
      newState.serviceGoal.weekly = copyDays.length;
    }
  }

  const isFixedQuantity = (value: string) => {
    const newState = Object.assign({}, dataForm);
    if (chooseQuantity) {
      return newState.serviceGoal.monthly;
    }
    else {
      return value;
    }
  }

  const callToast = (statusValue: any, message: string) => toast({
    title: message,
    status: statusValue,
    duration: 6000,
    isClosable: true,
  });

  const callToastEmptyDays = () => toast({
    title: 'Escolha os dias de atendimento!',
    status: 'error',
    duration: 4000,
    isClosable: true,
  });

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const copyWeekdaysArray = [...dataForm.days];
    if (!copyWeekdaysArray.length) {
      return callToastEmptyDays();
    }
    const response = await axiosServices.create(dataForm);

    response.patient
    ? (callToast('success', response.message), setNewRequestIfItChanged(!newRequestIfItChanged), setDataForm(DATA_PATIENT), setTimeout(() => { window.location.reload() }, 2000))
    : callToast('error', response);
  };

  return (
    <Flex flexDirection={'column'}>
      <Text
        fontWeight={'bold'}
        fontSize={'20px'}
        color={'green.7'}
        mt={'40px'}
      >
        Adicione um novo paciente
      </Text>

      <FormControl color={'wine.7'} borderWidth={0} p={'0 20px 0 20px'}>
        <FormLabel
          htmlFor='patient'
          fontWeight={'bold'}
          fontSize={'14px'}
          m={'10px 0 0 0'}
        >
          Paciente:
        </FormLabel>
        <Input
          id='patient'
          name='patient'
          type='text'
          value={dataForm.patient}
          bg={'green.1'}
          onChange={handleInputChange}
          p={'0'}
          />

        <Grid templateColumns='repeat(2, 1fr)' gap={4}>
          <GridItem>
            <FormLabel
              htmlFor='neighborhood'
              fontWeight={'bold'}
              fontSize={'14px'}
              m={'10px 0 0 0'}
            >
              Bairro:
            </FormLabel>
            <Input
              id='neighborhood'
              name='neighborhood'
              type='text'
              value={dataForm.neighborhood}
              bg={'green.1'}
              onChange={handleInputChange}
              width={'100%'}
            />
          </GridItem>

          <GridItem>
            <FormLabel
              htmlFor='healthInsurance'
              fontWeight={'bold'}
              fontSize={'14px'}
              m={'10px 0 0 0'}
            >
              Empresa:
            </FormLabel>
            <Input
              id='healthInsurance'
              name='healthInsurance'
              type='text'
              value={dataForm.healthInsurance}
              bg={'green.1'}
              onChange={handleInputChange}
              width={'100%'}
            />
          </GridItem>
        </Grid>

        <FormLabel
          htmlFor='day'
          fontWeight={'bold'}
          fontSize={'14px'}
          m={'10px 0 0 0'}
        >
          Dias de atendimento:
        </FormLabel>
        <Flex flexWrap={'wrap'} justifyContent={'space-between'} id='day'>
          {
            DAYS.map((day: string, index: number) => {
              return (
                <Button
                  key={index}
                  value={index + 1}
                  id={'day' + index}
                  onClick={ (e: BaseSyntheticEvent) => handleDayClick(e, index + 1) }
                  borderRadius={'4px'}
                  fontSize={'11px'} fontWeight={'bold'}
                  width={'35px'}
                  height={'30px'}
                  bg={ buttonsFocus[index + 1].focus ? 'wine.7' : 'green.1' }
                  color={ buttonsFocus[index + 1].focus ? 'green.1' : 'wine.7' }
                >
                  { day }
                </Button>
                )
              }
            )
          }
        </Flex>
        
        {/* <Box
          p={'4px'}
          height={'30px'}
          bg={'green.1'}
          borderRadius={'4px'}
          textAlign={'start'}
          m={'20px 0 0 0'}
        >
          <Checkbox
            p={'0'}
            m={'0'}
            iconColor={'wine.7'}
            colorScheme={'white'}
            borderColor={'wine.7'}
            justifyContent={'start'}
            name='chooseQuantity'
            value={chooseQuantity.toString()}
            onChange={handleInputChange}
          >
            <Text fontSize={{ base: '10.5px', sm: '12px' }} fontWeight={'bold'}>
              Quero escolher a quantidade de atendimentos mensais.
            </Text>
          </Checkbox>
        </Box> */}

        <Grid templateColumns='repeat(2, 1fr)' gap={4}>
          <GridItem>
            <FormLabel
              htmlFor='serviceGoal.monthly'
              fontWeight={'bold'}
              fontSize={'11px'}
              m={'10px 0 0 0'}
            >
              Meta de atendim. mensais:
            </FormLabel>
            <Input
              id='serviceGoal.monthly'
              name='serviceGoal.monthly'
              type='text'
              value={isFixedQuantity(dataForm.serviceGoal.monthly.toString())}
              bg={'green.1'}
              onChange={handleInputChange}
              width={'100%'}
              disabled={!chooseQuantity}
              textAlign={'center'}
            />
          </GridItem>

          <GridItem>
            <FormLabel
              htmlFor='healthInsurance'
              fontWeight={'bold'}
              fontSize={'11px'}
              m={'10px 0 0 0'}
            >
              Valor do atendimento (R$):
            </FormLabel>
            <Input
              id='unitPrice'
              name='unitPrice'
              borderRadius={'4px'}
              pattern="[0-9]+([,\.][0-9]+)?"
              type='text'
              value={ dataForm.unitPrice.replace('.', ',') }
              bg={'green.1'}
              onChange={ handleChangeUnitPrice }
              width={'100%'}
              textAlign={'center'}
            />
          </GridItem>
        </Grid>

        <Grid
          templateColumns='repeat(2, 1fr)'
          gap={4}
          alignItems={'end'}
        >
          <GridItem>
            <FormLabel
              fontSize={{ base: '10.5px', sm: '12px' }}
              htmlFor='serviceGoal.monthly'
              fontWeight={'bold'}
              textAlign={'start'}
              m={'10px 0 0 0'}
            >
              Quantos atendimentos você realizou até hoje neste mês?
            </FormLabel>
            <Input
              id='servicePerformed.monthly'
              name='servicePerformed.monthly'
              type='text'
              value={dataForm.servicePerformed.monthly}
              bg={'green.1'}
              onChange={handleInputChange}
              textAlign={'center'}
              width={'100%'}
              />
          </GridItem>

          <GridItem>
            <FormLabel
              fontSize={{ base: '10.5px', sm: '12px' }}
              htmlFor='healthInsurance'
              fontWeight={'bold'}
              m={'10px 0 0 0'}
              textAlign={'start'}
            >
              Quantos atendimentos você realizou até hoje nesta semana?
            </FormLabel>
            <Input
              id='servicePerformed.weekly'
              name='servicePerformed.weekly'
              borderRadius={'4px'}
              value={dataForm.servicePerformed.weekly}
              bg={'green.1'}
              onChange={handleInputChange}
              textAlign={'center'}
              width={'100%'}
            />
          </GridItem>
        </Grid>

        <FormLabel
          htmlFor='evolution'
          fontWeight={'bold'}
          fontSize={'14px'}
          m={'10px 0 0 0'}
        >
          Evolução:
        </FormLabel>
        <Textarea
          id='evolution'
          name='evolution'
          value={dataForm.evolution}
          bg={'green.1'}
          onChange={handleInputChange}
          p={'0'}
          fontSize={'12px'}
          placeholder='Descreva a evolução do atendimento (Campo opcional)'
          />

        <Button
          fontFamily={'heading'}
          mt={8}
          w={[ '160px', '160px']}
          bg="wine.8"
          color={'wine.1'}
          onClick={ handleSubmit }
          _hover={{
            bg: 'green.3',
            color: 'wine.8',
            boxShadow: 'xl',
          }}>
          Salvar
        </Button>
        
      </FormControl>


      <Button
        position={'fixed'}
        bottom={'60px'}
        left={'40px'}
        onClick={ () => navigate('/patients') }
        bg={'wine.8'}
        _hover={{ bg: 'wine.6' }}
        color={'wine.2'}
        alignSelf={'start'}
      >
        <UndoRoundedIcon/>
      </Button>
    </Flex>
  );
}