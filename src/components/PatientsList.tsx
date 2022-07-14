import React from 'react';
import {
  Checkbox,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  Box,
} from '@chakra-ui/react';
import { Props } from 'framer-motion/types/types';
import { thisPatient, idPatient } from '../services/types';

const PatientsList = (props: Props) => {
  const { filterPatientsByDay, day } = props;

  const patientsByDay = filterPatientsByDay(day);

  return (
    <TableContainer>
      <Table width={'100%'}>
        <Tbody>
          {
            patientsByDay.map((info: thisPatient & idPatient) => {
              return (
                <Tr key={info._id}>
                  <Td pl={'0px'} pr={'0px'} pb={'20px'} pt={'20px'} m={'0'}>
                    <Box
                      borderRadius={7}
                      mb={-3}
                      mt={-3}
                      ml={0}
                      mr={0}
                      p={2}
                      height={'40px'}
                      boxShadow='base'
                      color='wine.6'
                      bg="green.1"
                      width={'100%'}>
                      <Checkbox
                        marginRight={5}
                        iconColor={'wine.6'}
                        colorScheme={'white'}
                        borderColor={'wine.6'}
                        >
                        { info.patient }
                      </Checkbox>
                    </Box>
                  </Td>
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
