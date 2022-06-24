import React, { useContext } from 'react';
import {
  Wrap,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react'
import Patients from './PatientsList';
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
      <TabList justifyContent={'center'}>
        <Wrap justify={'center'}>
        <Tab bgGradient="linear(to-r, red.300,purple.100)">
          H
        </Tab>
          {
            weekDays.map(
              (day: string, index: number) => <Tab
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
          <Patients patientsByDay={ patientsByDay } day={today}/>
        </TabPanel>
        {
          weekDays.map((_day, index: number) => {
            return (
              <TabPanel key={index}>
                <Patients patientsByDay={ patientsByDay } day={index + 1}/>
              </TabPanel>
            )
          })
        }
      </TabPanels>
    </Tabs>
  );
}

export default NavBar;
