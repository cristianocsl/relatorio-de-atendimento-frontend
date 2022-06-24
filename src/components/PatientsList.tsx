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
  const { patientsByDay, day } = props;

  const patients = patientsByDay(day);
  
  return (
    <TableContainer>
      <Table>
        <Tbody>
          {
            patients.map((info: thisPatient & idPatient) => {
              return (
                <Tr key={info._id}>
                  <Td>
                    <Box
                      bg={'white'}
                      borderRadius={7}
                      mb={-3}
                      mt={-3}
                      ml={0}
                      mr={0}
                      p={2}
                      boxShadow='base'
                      color='white'
                      bgGradient="linear(to-r, red.400,pink.400)">
                      <Checkbox
                        marginRight={5}
                        colorScheme='red'
                        borderColor={'red.600'}
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
