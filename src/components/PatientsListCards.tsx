import React from 'react';
import {
  Checkbox,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  Thead,
  Box,
  Flex,
  Container,
  Spacer,
} from '@chakra-ui/react';
import { Props } from 'framer-motion/types/types';
import { thisPatient, idPatient } from '../services/types';

const PatientsList = (props: Props) => {
  const { filterPatientsByDay, day } = props;

  const patientsByDay = filterPatientsByDay(day);
Container
  return (
    <Box>
      <Flex align={'center'} fontWeight={'semibold'}>
        <Box w='60%' color="wine.7">Paciente</Box>
        <Spacer />
        <Box w={{ base: '92px', smm: '130px', md: '160px' }} wordBreak={'break-word'} color="wine.7" mr={'3px'}>Atend. Sem.</Box>
        <Spacer />
        <Box w={{ base: '90px', smm: '130px', md: '160px' }} color="wine.7">Atend. Mens.</Box>
        <Spacer />
        <Box w={{ base: '40%', smm: '50%' }} color="wine.7">Empr.</Box>
        <Spacer />
        <Box w={{ base: '50px', smm: '100px' }} color="wine.7">Status</Box>
      </Flex>
    </Box>
  );
}

export default PatientsList;
