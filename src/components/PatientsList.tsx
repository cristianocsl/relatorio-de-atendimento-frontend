import {
  Checkbox,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  Box,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import { thisPatient } from '../services/types';

type idPatient = { _id: string };

const PatientsList = () => {
  const { patients } = useContext(MyContext);
  
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
                        <Checkbox marginRight={5}>
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
