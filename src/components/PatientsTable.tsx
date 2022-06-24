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
const NavBar = () => {
  return (
    <Tabs variant='soft-rounded' colorScheme='green'>
      <TabList>
        <Wrap justify={'center'}>
          <Tab>Hoje</Tab>
          <Tab>Dom</Tab>
          <Tab>Seg</Tab>
          <Tab>Ter</Tab>
          <Tab>Qua</Tab>
          <Tab>Qui</Tab>
          <Tab>Sex</Tab>
          <Tab>Sáb</Tab>
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
