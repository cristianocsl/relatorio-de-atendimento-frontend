import React, { BaseSyntheticEvent, useState } from "react";
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Button, Text, Input, Flex, Grid, GridItem, Box, Checkbox,
} from '@chakra-ui/react'
import { buttonFocusKeys, bodyDataPatient } from '../services/types';
import objectCounterWeekDays from "../services/daysOfMonth";

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
    weekly: '',
    monthly: '',
  },
  servicePerformed: {
    weekly: '',
    monthly: '',
  },
  unitPrice: '',
  evolution: '',
}

export default function AddPatient () {
  const navigate = useNavigate();
  const [buttonsFocus, setButtonsFocus] = useState<buttonFocusKeys>(BUTTONFOCUS);
  const [dataForm, setDataForm] = useState<bodyDataPatient>(DATA_PATIENT);
  const [fixedQuantity, setFixedQuantity] = useState<boolean>(false);

  
  const handleInputChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    const newState = Object.assign({}, dataForm);

    if (name === 'serviceGoal.monthly') {
      newState.serviceGoal.monthly = value;
      setDataForm(newState);
    }
    else if (name === 'servicePerformed.monthly') {
      newState.servicePerformed.monthly = value;
      setDataForm(newState);
    }
    else if (name === 'servicePerformed.weekly') {
      newState.servicePerformed.weekly = value;
      setDataForm(newState);
    }
    else if (name === 'fixedQuantity') {
      value === 'false' ? setFixedQuantity(true) : setFixedQuantity(false);
    } else {
      setDataForm({ ...dataForm, [name]: value });
    }

  };

  const handleDayClick = (e: BaseSyntheticEvent, index: number) => {
    const newState = Object.assign({}, dataForm);

    let monthly = +newState.serviceGoal.monthly;

    if (!buttonsFocus[index].focus) {
      setButtonsFocus({ ...buttonsFocus, [index]: { focus: true } });
      dataForm.days.push(index);
      newState.serviceGoal.weekly = dataForm.days.length.toString();
      monthly += objectCounterWeekDays[index];
      newState.serviceGoal.monthly = monthly.toString();
    } else {
      setButtonsFocus({ ...buttonsFocus, [index]: { focus: false } });
      const copyDays = [...dataForm.days];
      copyDays.splice(dataForm.days.indexOf(index), 1);
      setDataForm({ ...dataForm, days: copyDays });
      newState.serviceGoal.weekly = copyDays.length.toString();
      monthly -= objectCounterWeekDays[index];
      newState.serviceGoal.monthly = monthly.toString();
    }
  }

  const isFixedQuantity = (value: string) => {
    if (fixedQuantity) {
      const quantityServices = dataForm.days.length * 4;
      return quantityServices.toString();
    } else {
      return value;
    }
  }

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
        <Box
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
            name='fixedQuantity'
            value={fixedQuantity.toString()}
            onChange={handleInputChange}
          >
            <Text fontSize={'12px'} fontWeight={'bold'}>
              Marque, se a quantidade de atendimentos mensais é fixa.
            </Text>
          </Checkbox>
        </Box>

        <Grid templateColumns='repeat(2, 1fr)' gap={4}>
          <GridItem>
            <FormLabel
              htmlFor='serviceGoal.monthly'
              fontWeight={'bold'}
              fontSize={'14px'}
              m={'10px 0 0 0'}
            >
              Qtd de atendim. mensais:
            </FormLabel>
            <Input
              id='serviceGoal.monthly'
              name='serviceGoal.monthly'
              type='text'
              value={isFixedQuantity(dataForm.serviceGoal.monthly)}
              bg={'green.1'}
              onChange={handleInputChange}
              width={'100%'}
              disabled={fixedQuantity}
            />
          </GridItem>

          <GridItem>
            <FormLabel
              htmlFor='healthInsurance'
              fontWeight={'bold'}
              fontSize={'14px'}
              m={'10px 0 0 0'}
            >
              Valor do atendimento (R$):
            </FormLabel>
            <Input
              id='unitPrice'
              name='unitPrice'
              borderRadius={'4px'}
              value={dataForm.unitPrice}
              bg={'green.1'}
              onChange={handleInputChange}
              width={'100%'}
            />
          </GridItem>
        </Grid>
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