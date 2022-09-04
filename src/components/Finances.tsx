import React, { useContext } from 'react';
import {
  Box,
  Button,
  Text,
  Flex,
} from '@chakra-ui/react';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import MyContext from '../context/MyContext';
import { Tfinances } from '../services/types';


const Finances = () => {
  const navigate = useNavigate();
  const { finances } = useContext(MyContext);

  console.log(finances);
  return (
    <Box>
      <Text
        fontWeight={'bold'}
        fontSize={'20px'}
        color={'green.7'}
        mt={'40px'}
      >
        Meus rendimentos
      </Text>
      <Button
        className="content-field"
        variant="text"
        size="large"
        type="submit"
      >
        <LogoutIcon
          sx={{ fontSize: 25, color: 'gray' }}
          onClick={ () => { navigate('/login'), localStorage.clear(); } }
        />
      </Button>

      <Flex
        textAlign={'center'}
        align={'center'}
        fontWeight={'bold'}
        fontSize={'12px'}
        p={'0 12px 0 12px'}
        justifyContent={'space-around'}>
        <Box
          w='33.33%'
          color="wine.7"
          textAlign={'start'}
        >
          Empresa
        </Box>
        <Box
          w='33.33%'
          wordBreak={'break-word'}
          color="wine.7"
        >
          Renda prevista
        </Box>
        <Box
          w='33.33%'
          color="wine.7"
        >
          Renda realizada
        </Box>
      </Flex>
      {
        finances.map((item: Tfinances) => {
          return(
            <Flex
              key={item.userId +  Math.random() * (10000 - 1) + 1}
              textAlign={'center'}
              align={'center'}
              fontWeight={'bold'}
              fontSize={'12px'}
              p={'0 12px 0 12px'}
              justifyContent={'space-around'}>
              <Box
                w='20%'
                color="wine.7"
                textAlign={'start'}>
                <Text fontSize={'12px'}>
                  { item.createdAt }
                </Text>
              </Box>
              <Box
                w='20%'
                color="wine.7"
                textAlign={'start'}>
                <Text fontSize={'12px'}>
                  { item.patientId }
                </Text>
              </Box>
              <Box
                w='20%'
                color="wine.7"
                textAlign={'start'}>
                <Text fontSize={'12px'}>
                  { item.healthInsurance }
                </Text>
              </Box>

              <Box
                w='20%'
              >
                { item.prevTotalPrice }
              </Box>

              <Box
                w='20%'
              >
                { item.doneTotalPrice }
              </Box>
            </Flex>
          )
        })
      }

      <Button
        position={'fixed'}
        bottom={'60px'}
        left={'40px'}
        onClick={ () => navigate('/patients') }
        bg={'wine.8'}
        _hover={{ bg: 'wine.6' }}
        color={'wine.2'}
        alignSelf={'start'}
      >
        <UndoRoundedIcon/>
      </Button>
    </Box>
  )
}

export default Finances;