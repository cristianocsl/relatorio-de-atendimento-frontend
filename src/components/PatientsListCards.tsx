import React, { BaseSyntheticEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box,  Flex, Text, Checkbox, useToast, Button } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { thisPatient, idPatient, statusObject } from '../services/types';
import MyContext from '../context/MyContext';
import Status from './Status';
import UpdatePatient from './UpdatePatient';

type patientT = thisPatient & idPatient;

const PatientsList = (props: { day: number, monthDay: number, filterPatientsByDay: any }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { filterPatientsByDay, day, monthDay } = props;
  const { handleChangeStatus, resetWeeklyServices, resetMonthlyServices } = useContext(MyContext);
  
  const patientsByDay = filterPatientsByDay(day);
  
  const isChecked = (arraySchedule: Array<statusObject>, monthDay: number): boolean => {
    const daySchedule = arraySchedule.find((daySchedule: statusObject) => daySchedule.monthDay === monthDay && daySchedule.status === 'OK');
    return daySchedule ? true : false;
  }

  const changeColor = (performed: number, goal: number): string => {
    if (performed === goal) {
      return 'red';
    }
    return 'wine.7';
  };

  const callToast = () => toast({
    title: 'Para reiniciar a contagem dos atendimentos, clique sobre a numeração em vermelho!',
    status: 'success',
    duration: 8000,
    isClosable: true,
  });

  const isEqual = (info: patientT) => {
    const condition1 = info.servicePerformed.weekly === info.serviceGoal.weekly;
    const condition2 = info.servicePerformed.monthly === info.serviceGoal.monthly;
    if (condition1 || condition2) {
      return callToast();
    }
  }

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
          Atend. Hoje
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
                w='48%'
                color="wine.7"
                textAlign={'start'}>
                <Checkbox
                  isChecked={isChecked(info.schedule, monthDay)}
                  marginRight={5}
                  iconColor={'wine.7'}
                  colorScheme={'white'}
                  borderColor={'wine.7'}
                  justifyContent={'start'}
                  onChange={ (e: BaseSyntheticEvent) => { handleChangeStatus(e.target.checked, info._id, monthDay), isEqual(info)} }
                >
                  <Text fontSize={'12px'}>
                    { info.patient }
                  </Text>
                </Checkbox>
              </Box>

              <Button
                variant="text"
                size="large"
                type="submit"
                width={'12%'}
                color='wine.7'
                onClick={() => navigate(`/updatePatient/${info._id}`) }
              >
                <EditIcon/>
              </Button>

              <Box
                onClick={ () => { resetWeeklyServices(info) } }
                w={{ base: '92px', smm: '130px', md: '160px' }}
                color={ changeColor(info.servicePerformed.weekly, info.serviceGoal.weekly) }
              >
                { info.servicePerformed.weekly + '/' + info.serviceGoal.weekly }
              </Box>

              <Box
                w={{ base: '90px', smm: '130px', md: '160px' }}
                onClick={ () => { resetMonthlyServices(info) } }
                color={ changeColor(info.servicePerformed.monthly, info.serviceGoal.monthly) }
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
                  if (daySchedule.monthDay === monthDay) {
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
