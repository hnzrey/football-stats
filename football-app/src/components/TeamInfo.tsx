import React from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';

interface Team {
  address: string;
  phone: string;
  website: string;
}

interface TeamInfoProps {
  team: Team | null;
}

const TeamInfo: React.FC<TeamInfoProps> = ({ team }) => {
  if (!team) return null;

  return (
    <VStack spacing={5} alignItems="flex-start">
      <Text fontSize={"xl"} fontWeight={"bold"}>Team Information</Text>
      <Text>Address: {team.address}</Text>
      <Text>Phone: {team.phone}</Text>
      <Text>Website: {team.website}</Text>
    </VStack>
  );
};

export default TeamInfo;