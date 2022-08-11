import React, { BaseSyntheticEvent, useContext } from 'react';
import { Box,  Flex, Text, Checkbox } from '@chakra-ui/react';
import { thisPatient, idPatient, statusObject } from '../services/types';
import MyContext from '../context/MyContext';
import Status from './Status';

const PatientsList = (props: { day: number, monthDay: string, filterPatientsByDay: any }) => {
  const { filterPatientsByDay, day, monthDay } = props;
  const { handleChangeStatus, dataCalendar } = useContext(MyContext);
  
  const patientsByDay = filterPatientsByDay(day);

  return (
    <Box>
      <Flex
        textAlign={'center'}
        align={'center'}
        fontWeight={'bold'}
        fontSize={'12px'}
        p={'0 4px 0 4px'}
        justifyContent={'start'}>
        <Box
          w='58%'
          color="wine.7"
          textAlign={'start'}
          pl={'27px'}
        >
          Paciente
        </Box>
        <Box
          w={{ base: '92px', smm: '130px', md: '160px' }}
          wordBreak={'break-word'}
          color="wine.7"
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
          w={{ base: '40%', smm: '52%' }}
          display={{ base: 'none', ssm: 'block' }}
          color="wine.7"
        >
          Empresa
        </Box>
        <Box
          w={{ base: '50px', smm: '100px' }}
          color="wine.7"
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
              height={{ base: '50px', smm: '40px' }}
              m={'0 0 16px 0'}>
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
                  onChange={(e: BaseSyntheticEvent) => handleChangeStatus(e.target.checked, info._id, +monthDay)}
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
                {info.schedule.map((daySchedule: statusObject) => {
                  if (+daySchedule.monthDay === +monthDay) {
                    return (
                      <Status
                        key={daySchedule.monthDay}
                        daySchedule={daySchedule}
                      />
                    )
                  }
                  })}
              </Box>
            </Flex>
          )
        })
      }
      
    </Box>
  );
}

export default PatientsList;
