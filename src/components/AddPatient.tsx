import React, { useState } from "react";
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Box, Button, Text, Input, Flex, Grid, GridItem,
} from '@chakra-ui/react'

export default function AddPatient () {
  const navigate = useNavigate();
  const [input, setInput] = useState('')

  const handleInputChange = (e: any) => setInput(e.target.value)

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
              htmlFor='bairro'
              fontWeight={'bold'}
              fontSize={'14px'}
              m={'10px 0 0 0'}
            >
              Empresa:
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