import React, { useContext, useEffect } from 'react';
import {
  Wrap,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Flex,
  Text,
  Box,
} from '@chakra-ui/react'
import PatientsList from './PatientsList';
import MyContext from '../context/MyContext';
import { useNavigate } from 'react-router-dom';
import IsLoading from './IsLoading';
import { AddBoxRounded, EditRounded } from '@mui/icons-material';

import { extractDataType } from '../services/types';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const PatientsTable = () => {
  const {
    filterPatientsByDay, isLoading, dataCalendar,
    patientsToday, patientsPending, greetingMessage } = useContext(MyContext);

  const navigate = useNavigate();

  const TOKEN = localStorage.getItem('token');

  useEffect(() => {
    if (!TOKEN) {
      navigate('/login');
    }
  }, []);

  const today = new Date().getDay() + 1;

  if (isLoading) return <IsLoading />;
  return (
    <Box position={'relative'}>
      <Text
        align={'start'}
        color={'green.8'}
        fontWeight={'bold'}
        fontSize={'20px'}
        ml={'20px'}
        mt={'40px'}
      >
        { greetingMessage }
      </Text>

      <Box
        color={'green.8'}
        fontWeight={'bold'}
        fontSize={'11px'}
        ml={'20px'}
        display={'flex'}
      >
        Você tem <Text color={'wine.8'} ml={'5px'} mr={'5px'}>{ patientsToday } pacientes</Text> para hoje!
      </Box>

      <Box
        color={'green.8'}
        fontWeight={'bold'}
        fontSize={'11px'}
        ml={'20px'}
        mb={'14px'}
        display={'flex'}        
      >
        Você tem <Text color={'#9D0400'} ml={'5px'} mr={'5px'}>{ patientsPending } pacientes</Text> não atendidos!
      </Box>

      <Tabs variant='soft-rounded' margin={'0 auto'} defaultIndex={3}>
        <TabList justifyContent={'center'} height={'200px'} width={'100%'} overflow={'hidden'}>
          <Wrap justify={'center'} spacing={'20px'} width={'100%'}>
            {
              dataCalendar.map(
                (item: extractDataType, index: number) => <Tab
                  width={'60px'}
                  height={'70px'}
                  key={ index }
                  borderRadius={'4px'}
                  bg="green.7"
                  _selected={{ bg: 'wine.7', color: 'wine.1' }}
                  flexDirection={'column'}
                  color="green.1"
                  boxShadow="4px 15px 20px #216177"
                  >
                    <Text fontSize={'12px'} fontWeight={'regular'}>
                      { item.day }
                    </Text>
                    <Text fontSize={'16px'} fontWeight={'bold'}>
                      { item.weekDay }
                    </Text>
                  </Tab>
              )
            }
          </Wrap>
        </TabList>
        <TabPanels>
          {
            weekDays.map((_day, index: number) => {
              return (
                <TabPanel key={index}>
                  <PatientsList filterPatientsByDay={ filterPatientsByDay } day={index + 1}/>
                </TabPanel>
              )
            })
          }
        </TabPanels>
      </Tabs>

      <Flex>
        <Flex
          position={'fixed'}
          justifyContent={'center'}
          width={'100%'}
          bottom={'3%'}>
          <Box
            position={'absolute'}
            left={'50%'}
            bg={'wine.8'}
            boxSize={'45px'}
            borderRadius={'4px'}
            zIndex={-1}
            transform={'translate(-230%, 33%)'}
            boxShadow="4px 15px 20px #032029"/>
          <Box
            position={'absolute'}
            transform={'translate(-270%, 60%)'}
          >
            <EditRounded color="primary" sx={{ fontSize: '30px', color: '#85BFD3' }}/>
          </Box>

          <Box
            position={'absolute'}
            left={'50%'}
            bg={'green.3'}
            boxSize={'45px'}
            zIndex={-1}
            transform={'translate(-51%, 33%)'}
            boxShadow="4px 15px 20px #032029"
          />
          <AddBoxRounded
            color="primary"
            sx={{ fontSize: '75px' }}
            onClick={ () => navigate('/addPatient') }
          />

          <Box
            position={'absolute'}
            left={'50%'}
            bg={'wine.8'}
            boxSize={'45px'}
            fontWeight={'bold'}
            color={'green.3'}
            borderRadius={'4px'}
            zIndex={-1}
            transform={'translate(128%, 33%)'}
            fontSize={'30px'}
            boxShadow="4px 15px 20px #032029"
          >
            $
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default PatientsTable;
Box
Box