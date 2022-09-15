import React, {  useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Flex, Box } from '@chakra-ui/react'
import { bodyDataPatient, thisPatient, idPatient } from '../services/types';
import MyContext from '../context/MyContext';

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
  schedule: [],
  activeService: '',
}

export default function UpdatePatient () {
  const { patients, finances } = useContext(MyContext)
  const navigate = useNavigate();

  type patientT = thisPatient & idPatient;


  return (
    <Box>
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
                p={'0 4px 0 4px'}
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
    </Box>
  );
}