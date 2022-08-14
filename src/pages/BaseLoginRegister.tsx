import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { thisLogin, thisName, thisProps, thisResponseLogin, thisRespRegister } from '../services/types';
import { useNavigate } from 'react-router-dom';
import axiosService from '../services';

import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  FormControl,
  Alert,
  AlertIcon,
  Image,
} from '@chakra-ui/react';
import MyContext from '../context/MyContext';

const BODY_REGISTER = {
  name: '',
  email: '',
  password: '',
}

const BODY_LOGIN = {
  email: '',
  password: '',
}

export default function BaseComponent(props: thisProps) {
  const [bodyRegister, setBodyRegister] = useState<thisLogin | thisName>(BODY_REGISTER);
  const [bodyLogin, setBodyLogin] = useState<thisLogin>(BODY_LOGIN);
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [hideAlert, setHideAlert] = useState<boolean>(true);

  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(MyContext);

  useEffect(() => {
    const wakeUpHeroku = async () => axiosService.wakeUp();
    wakeUpHeroku();
  }, []);

  const handleChange = (event: FormEvent<HTMLInputElement>): void => {
    const { name, value } = (event.target as HTMLInputElement);
    if (props.title === 'Cadastro') {
      setBodyRegister({
        ...bodyRegister,
        [name]: value,
      });
    }

    if (props.title === 'Login') {
      setBodyLogin({
        ...bodyLogin,
        [name]: value,
      });
    }
  };

  const workingWhitError = (response: thisRespRegister & thisResponseLogin & string): void => {
    !response.name ?
      (
        setResponseMessage(response as string),
        setHideAlert(false)
      ) : setHideAlert(true), setIsLoggedIn(true);
  }

  const handleSubmit = async(event: any) => {
    event.preventDefault();
    if (props.title === 'Login') {
      const response = await axiosService.login(bodyLogin);
      workingWhitError(response);
      response.name && navigate('/patients');
    }
    
    if (props.title === 'Cadastro') {
      const response = await axiosService.register(bodyRegister);
      workingWhitError(response);
      const { email, password } = bodyRegister as thisLogin;
      response.name && (await axiosService.login({ email, password }), navigate('/patients'));
    }
  };

  return (
    <Box position={'relative'} height={'100vh'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >

        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            bgClip={'text'}
            bgGradient="linear-gradient(90deg, wine.8 11.62%, wine.4 113.13%)"
            marginTop={{ base: 20, md: 0 }}
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
          >
            Minha Agenda
            <Text fontWeight={'bold'}>
              Home Care
            </Text>
          </Heading>
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          bgGradient="linear-gradient(180deg, green.3 0%, green.7 100%)"
          maxW={{ lg: 'lg' }}>
          <Stack spacing={4}>
            <Heading
              color={'green.9'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              { props.title }
            </Heading>
          </Stack>
          <Box as={'form'} mt={10} onSubmit={ handleSubmit }>
            <Stack spacing={4}>
              <FormControl id="name">
                <Input
                  name="name"
                  hidden={props.hidden}
                  placeholder="Seu nome"
                  bg={'green.1'}
                  border={0}
                  color={'green.5'}
                  _placeholder={{
                    color: 'green.5',
                  }}
                  onChange={ handleChange }
                  />
              </FormControl>
              <FormControl id="email">
                <Input
                  name="email"
                  placeholder="seu_email_aqui@email.com"
                  bg={'green.1'}
                  border={0}
                  color={'green.5'}
                  _placeholder={{
                    color: 'green.5',
                  }}
                  onChange={ handleChange }
                  />
              </FormControl>
              <FormControl id="password">
                <Input
                  name="password"
                  placeholder="digite sua senha com 6 dígitos"
                  bg={'green.1'}
                  border={0}
                  color={'green.5'}
                  _placeholder={{
                    color: 'green.5',
                  }}
                  onChange={ handleChange }
                />
              </FormControl>
            </Stack>
            <Button
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bg="wine.8"
              color={'wine.1'}
              onClick={ handleSubmit }
              _hover={{
                bg: 'green.3',
                color: 'wine.8',
                boxShadow: 'xl',
              }}>
              { props.textButtom }
            </Button>
          </Box>
          form
          <Alert
            status="error"
            hidden={hideAlert}
            bg={'wine.2'}
            color={'wine.8'}
            borderRadius={'6px'}>
            <AlertIcon color={'warning'} />
            { responseMessage }
          </Alert>
        </Stack>
      </Container>
      
      <Image
        display={{ base: 'block', ssm: 'block', smm: 'none' }}
        src={'background2.png'}
        alt="background"
        position={'absolute'}
        zIndex={-1}
        bottom={'0%'}
        left={'50%'}
        transform={'translate(-50%, 0%)'}
      />
    </Box>
  );
}
