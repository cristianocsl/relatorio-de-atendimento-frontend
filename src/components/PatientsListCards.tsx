import React from 'react';
import {
  Checkbox,
  Box,
  Text,
  Flex,
} from '@chakra-ui/react';
import { Props } from 'framer-motion/types/types';
import { thisPatient, idPatient } from '../services/types';

const PatientsList = (props: Props) => {
  const { filterPatientsByDay, day } = props;

  const patientsByDay = filterPatientsByDay(day);

  return (
    <Box>
      <Flex
        textAlign={'center'}
        align={'center'}
        fontWeight={'bold'}
        fontSize={'12px'}
        justifyContent={'start'}>
        <Box
          w='60%'
          color="wine.7"
          textAlign={'start'}
          pl={'28px'}
        >
          Paciente
        </Box>
        <Box
          w={{ base: '92px', smm: '130px', md: '160px' }}
          wordBreak={'break-word'}
          color="wine.7"
          mr={'3px'}
        >
          Atend. Sem.
        </Box>
        <Box
          w={{ base: '90px', smm: '130px', md: '160px' }}
          color="wine.7"
        >
          Atend. Mens.
        </Box>
        <Box
          w={{ base: '40%', smm: '50%' }}
          display={{ base: 'block', ssm: 'none' }}
          color="wine.7"
        >
          Empr.
        </Box>
        <Box
          w={{ base: '40%', smm: '50%' }}
          display={{ base: 'none', ssm: 'block' }}
          color="wine.7"
        >
          Empresa
        </Box>
        <Box
          w={{ base: '50px', smm: '100px' }}
          color="wine.7"
          pr={'5px'}
        >
          Status
        </Box>
      </Flex>
      {
        patientsByDay.map((info: thisPatient & idPatient) => {
          return(
            <Flex
              key={info._id}
              textAlign={'center'}
              align={'center'}
              fontWeight={'bold'}
              fontSize={'12px'}
              p={'4px'}
              bg={'green.1'}
              borderRadius={'4px'}
              height={{ base: '50px', smm: '50px', md: '60px' }}
              m={'0 0 10px 0'}>
              <Box
                w='60%'
                color="wine.7"
                textAlign={'start'}>
                <Checkbox
                  marginRight={5}
                  iconColor={'wine.7'}
                  colorScheme={'white'}
                  borderColor={'wine.7'}
                  justifyContent={'start'}
                >
                  <Text fontSize={'12px'}>
                    { info.patient }
                  </Text>
                </Checkbox>
              </Box>
              <Box
                w={{ base: '92px', smm: '130px', md: '160px' }}
                color="wine.7"
              >
                { info.servicePerformed.weekly + '/' + info.serviceGoal.weekly }
              </Box>
              <Box
                w={{ base: '90px', smm: '130px', md: '160px' }}
                color="wine.7"
              >
                { info.servicePerformed.monthly + '/' + info.serviceGoal.monthly }
              </Box>
              <Box
                w={{ base: '40%', smm: '50%' }}
                color="wine.7"
              >
                { info.healthInsurance }
              </Box>
              <Box
                w={{ base: '50px', smm: '100px' }}
                color="wine.7"
              >
                { info.status }
              </Box>
            </Flex>
          )
        })
      }
      
    </Box>
  );
}

export default PatientsList;
