import React from 'react';
import {
  Wrap,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react'
import Patients from './PatientsList';

const weekDays = ['H', 'D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const NavBar = () => {
  return (
    <Tabs
      variant='soft-rounded'
      colorScheme='red'
      ml={-7}
      mr={-7}
      p={1}>
      <TabList justifyContent={'center'}>
        <Wrap justify={'center'}>
          {
            weekDays.map(
              (day: string) => <Tab
                key={ day }
                bgGradient="linear(to-r, red.300,purple.100)">
                  { day }
                </Tab>
            )
          }
        </Wrap>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Patients />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default NavBar;
