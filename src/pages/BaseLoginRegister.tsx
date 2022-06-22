import React, { FormEvent, useState } from "react";

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
} from '@chakra-ui/react';

type thisProps = {
  title: string,
  textButtom: string
  hidden: boolean,
}

type thisLogin = {
  email: string,
  password: string,
}

type thisName = {
  name: string,
}

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

  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}>

        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            marginTop={{ base: 20, md: 0 }}
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
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
          maxW={{ lg: 'lg' }}>
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              { props.title }
            </Heading>
          </Stack>
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <FormControl id="name">
                <Input
                  name="name"
                  hidden={props.hidden}
                  placeholder="Seu nome"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  onChange={ handleChange }
                  />
              </FormControl>
              <FormControl id="email">
                <Input
                  name="email"
                  placeholder="seu_email_aqui@email.com"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  onChange={ handleChange }
                  />
              </FormControl>
              <FormControl id="password">
                <Input
                  name="password"
                  placeholder="digite sua senha com 6 dígitos"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  onChange={ handleChange }
                />
              </FormControl>
            </Stack>
            <Button
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}>
              { props.textButtom }
            </Button>
          </Box>
          form
        </Stack>
      </Container>
      <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(70px)' }}
      />
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
