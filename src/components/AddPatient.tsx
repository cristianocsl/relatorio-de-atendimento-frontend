import React from "react";
import { Box, Button } from "@chakra-ui/react";
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import { useNavigate } from "react-router-dom";

export default function AddPatient () {
  const navigate = useNavigate();
  return (
    <Box>
      <h1>Adicionar Paciente</h1>
      <Button
        onClick={ () => navigate('/patients') }
        bg={'wine.8'}
        _hover={{ bg: 'wine.6' }}
        color={'red'}
      >
        <UndoRoundedIcon sx={{ color: 'wine.main' }} />
      </Button>
    </Box>
  );
}