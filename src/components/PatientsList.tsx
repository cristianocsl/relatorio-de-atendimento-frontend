import {
  Checkbox,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td
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
                      <Checkbox marginRight={5}>
                        { info.patient }
                      </Checkbox>
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
