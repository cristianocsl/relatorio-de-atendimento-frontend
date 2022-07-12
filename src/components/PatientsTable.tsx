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
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { extractDataType } from '../services/types';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const PatientsTable = () => {
  const { filterPatientsByDay, isLoading, dataCalendar } = useContext(MyContext);

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
        margin={'0 auto'}
        >
        <TabList justifyContent={'center'} height={'180px'} width={'100%'} overflow={'hidden'}>
          <Wrap justify={'center'}>
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
