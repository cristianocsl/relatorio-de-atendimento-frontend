import React, { useContext } from 'react';
import {
  Wrap,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react'
import PatientsList from './PatientsList';
import MyContext from '../context/MyContext';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const NavBar = () => {
  const { patientsByDay } = useContext(MyContext);

  const today = new Date().getDay() + 1;
  
  return (
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
          <PatientsList patientsByDay={ patientsByDay } day={today}/>
        </TabPanel>
        {
          weekDays.map((_day, index: number) => {
            return (
              <TabPanel key={index}>
                <PatientsList patientsByDay={ patientsByDay } day={index + 1}/>
              </TabPanel>
            )
          })
        }
      </TabPanels>
    </Tabs>
  );
}

export default NavBar;
