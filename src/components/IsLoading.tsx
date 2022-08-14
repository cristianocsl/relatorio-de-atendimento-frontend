import React from 'react';
import { Center, CircularProgress } from '@chakra-ui/react';

const IsLoading = () => {
  return (
    <Center py="100px">
      <CircularProgress isIndeterminate color="card.deepPurple" size="200px" />
    </Center>
  );
}

export default IsLoading;
