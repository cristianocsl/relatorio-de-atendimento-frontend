import React, {  useContext } from 'react';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import { useNavigate } from 'react-router-dom';
import { Text, Flex, Box, Button } from '@chakra-ui/react'
import { thisPatient, idPatient } from '../services/types';
import MyContext from '../context/MyContext';

export default function UpdatePatient () {
  const { patients } = useContext(MyContext);
  const navigate = useNavigate();
  type patientT = thisPatient & idPatient;


  return (
    <Box pb={'120px'}>
      <Text
        fontWeight={'bold'}
        fontSize={'20px'}
        color={'green.7'}
        mt={'40px'}
      >
        Lista de pacientes
      </Text>

      <Flex
        textAlign={'center'}
        align={'center'}
        fontWeight={'bold'}
        fontSize={'12px'}
        p={'0 4px 0 4px'}
        justifyContent={'start'}
      >
        <Box
          w='50%'
          color="wine.7"
          textAlign={'center'}
        >
          Pacientes
        </Box>

        <Box
          w='50%'
          color="wine.7"
          textAlign={'center'}
        >
          Empresa
        </Box>
      </Flex>
        {
          patients.map((patient: patientT, index: number) => {
            return (
              <Flex
                key={patient._id}
                textAlign={'center'}
                align={'center'}
                fontWeight={'bold'}
                fontSize={'12px'}
                p={'10px 4px 0 4px'}
                justifyContent={'start'}
              >
                <Box
                  w='50%'
                  color="wine.7"
                  textAlign={'center'}
                >
                  <Text
                    borderRadius={'4px'}
                    fontSize={'11px'} fontWeight={'bold'}
                    height={'30px'}
                  >
                    {index + 1}. { patient.patient }
                  </Text>
                </Box>

                <Box
                  w='50%'
                  color="wine.7"
                  textAlign={'center'}
                >
                  <Text
                    borderRadius={'4px'}
                    fontSize={'11px'} fontWeight={'bold'}
                    height={'30px'}
                  >
                    { patient.healthInsurance }
                  </Text>
                </Box>
              </Flex>)
            }
          )
        }
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
    </Box>
  );
}