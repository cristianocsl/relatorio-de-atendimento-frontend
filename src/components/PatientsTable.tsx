import React, { useContext, useEffect } from 'react';
import {
  Wrap,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Flex,
  Box,
} from '@chakra-ui/react'
import PatientsList from './PatientsList';
import MyContext from '../context/MyContext';
import { useNavigate } from 'react-router-dom';
import IsLoading from './IsLoading';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const PatientsTable = () => {
  const { filterPatientsByDay, isLoading } = useContext(MyContext);

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
      <Tabs
        variant='soft-rounded'
        colorScheme='red'
        ml={-7}
        mr={-7}
        p={1}>
        <TabList justifyContent={'center'} ml={6} mr={6}>
          <Wrap justify={'center'}>
          <Tab
            bgGradient="linear(to-r, red.300,purple.100)"
            width={'5%'}>
            H
          </Tab>
            {
              weekDays.map(
                (day: string, index: number) => <Tab
                  width={'5%'}
                  key={ index }
                  bgGradient="linear(to-r, red.300,purple.100)">
                    { day }
                  </Tab>
              )
            }
          </Wrap>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PatientsList filterPatientsByDay={ filterPatientsByDay } day={today}/>
          </TabPanel>
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

      <Flex
        position={'fixed'}
        justifyContent={'center'}
        width={'100%'}
      >
        <AddCircleRoundedIcon sx={{ fontSize: 50}} onClick={ () => navigate('/addPatient') } />
      </Flex>
    </Box>
  );
}

export default PatientsTable;
