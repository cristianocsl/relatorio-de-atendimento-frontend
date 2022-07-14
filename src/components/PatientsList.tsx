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
} from '@chakra-ui/react';
import { Props } from 'framer-motion/types/types';
import { thisPatient, idPatient } from '../services/types';

const PatientsList = (props: Props) => {
  const { filterPatientsByDay, day } = props;

  const patientsByDay = filterPatientsByDay(day);

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th color="wine.7">Paciente</Th>
            <Th color="wine.7">Meta Sem.</Th>
            <Th color="wine.7">Meta Mens.</Th>
            <Th color="wine.7">Plano</Th>
            <Th color="wine.7">Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            patientsByDay.map((info: thisPatient & idPatient) => {
              return (
                <Tr key={info._id} color={'wine.7'} fontWeight={'bold'} bg={'green.2'}>
                  <Td p={'0 20px'} m={'0'}>
                    <Checkbox
                      marginRight={5}
                      iconColor={'wine.7'}
                      colorScheme={'white'}
                      borderColor={'wine.7'}
                    >
                      { info.patient }
                    </Checkbox>
                  </Td>
                  <Td><Box>{ info.servicePerformed.weekly + '/' + info.serviceGoal.weekly }</Box></Td>
                  <Td><Box>{ info.servicePerformed.monthly + '/' + info.serviceGoal.monthly }</Box></Td>
                  <Td><Box>{ info.healthInsurance }</Box></Td>
                  <Td><Box>{ info.status }</Box></Td>
                </Tr>
              )
            })
          }
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default PatientsList;
