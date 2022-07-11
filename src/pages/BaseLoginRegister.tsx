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
  useBreakpointValue,
  IconProps,
  Icon,
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
      hideAlert && navigate('/patients');
    }
    
    if (props.title === 'Cadastro') {
      const response = await axiosService.register(bodyRegister);
      workingWhitError(response);
    }
  };

  return (
    <Box position={'relative'}>
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
            bgGradient="linear-gradient(90deg, #032F3F 11.62%, rgba(61, 130, 153, 0.8) 113.13%)"
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
                  bg={'green.5'}
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
          <Alert status="error" hidden={hideAlert}>
            <AlertIcon />
            { responseMessage }
          </Alert>
        </Stack>
      </Container>
      <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(70px)' }}
      />

      {/* <Image
        src={'background2.png'}
        alt="background"
        // position={'absolute'}
      /> */}
    </Box>
  );
}

export const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
