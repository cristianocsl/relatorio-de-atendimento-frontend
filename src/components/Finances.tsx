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
        p={'0 4px 0 4px'}
        justifyContent={'space-around'}>
        <Box
          color="wine.7"
          textAlign={'start'}
        >
          Empresa
        </Box>
        <Box
          w={{ base: '92px', smm: '130px', md: '160px' }}
          wordBreak={'break-word'}
          color="wine.7"
          >
          Renda prevista
        </Box>
        <Box
          w={{ base: '90px', smm: '130px', md: '160px' }}
          color="wine.7"
        >
          Renda realizada
        </Box>
      </Flex>

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