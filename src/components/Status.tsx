import React from 'react';
import { Text } from '@chakra-ui/react';
import { Props } from 'framer-motion/types/types';

const Status = (props: Props) => {
  const { daySchedule } = props;
  return (
    <Text>
      { daySchedule.status }
      { daySchedule.monthDay }
    </Text>
  )
};

export default Status;
