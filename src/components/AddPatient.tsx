import React, { BaseSyntheticEvent, useState } from "react";
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Button, Text, Input, Flex, Grid, GridItem,
} from '@chakra-ui/react'
import { buttonValuesKeys, buttonFocusKeys,  } from '../services/types';

const DAYS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

const BUTTONVALUE: buttonValuesKeys = {
  1: { value: 0 },
  2: { value: 0 },
  3: { value: 0 },
  4: { value: 0 },
  5: { value: 0 },
  6: { value: 0 },
  7: { value: 0 },
}

const BUTTONFOCUS: buttonFocusKeys = {
  1: { focus: false },
  2: { focus: false },
  3: { focus: false },
  4: { focus: false },
  5: { focus: false },
  6: { focus: false },
  7: { focus: false },
}

export default function AddPatient () {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [buttonsValue, setButtonsValue] = useState<buttonValuesKeys>(BUTTONVALUE);
  const [buttonsFocus, setButtonsFocus] = useState<buttonFocusKeys>(BUTTONFOCUS);

  const handleInputChange = (e: BaseSyntheticEvent) => setInput(e.target.value);

  const handleDayClick = (e: BaseSyntheticEvent, index: number) => {
    if (!buttonsFocus[index].focus) {
      setButtonsFocus({ ...buttonsFocus, [index]: { focus: true } });
      setButtonsValue({ ...buttonsValue, [index]: { value: +e.target.value as number } });
    } else {
      setButtonsFocus({ ...buttonsFocus, [index]: { focus: false } });
      setButtonsValue({ ...buttonsValue, [index]: { value: 0 } });
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
          htmlFor='patient-name'
          fontWeight={'bold'}
          fontSize={'14px'}
          m={'10px 0 0 0'}
        >
          Paciente:
        </FormLabel>
        <Input
          id='patient-name'
          type='text'
          value={input}
          bg={'green.1'}
          onChange={handleInputChange}
          p={'0'}
          />

        <Grid templateColumns='repeat(2, 1fr)' gap={4}>
          <GridItem>
            <FormLabel
              htmlFor='bairro'
              fontWeight={'bold'}
              fontSize={'14px'}
              m={'10px 0 0 0'}
            >
              Bairro:
            </FormLabel>
            <Input
              id='bairro'
              type='text'
              value={input}
              bg={'green.1'}
              onChange={handleInputChange}
              width={'100%'}
            />
          </GridItem>

          <GridItem>
            <FormLabel
              htmlFor='empresa'
              fontWeight={'bold'}
              fontSize={'14px'}
              m={'10px 0 0 0'}
            >
              Empresa:
            </FormLabel>
            <Input
              id='empresa'
              type='text'
              value={input}
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