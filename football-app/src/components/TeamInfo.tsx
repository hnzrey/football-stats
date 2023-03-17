import React from 'react';
import { VStack, Text } from '@chakra-ui/react';

export interface TeamModel {
  address: string;
  founded: string; // it seems that there is no phone present in API. I used founder year instead to display something interesting
  website: string;
}

interface TeamInfoProps {
  team: TeamModel | null;
}

const TeamInfo: React.FC<TeamInfoProps> = ({ team }) => {
  if (!team) return null;

  return (
    <VStack spacing={5} alignItems="flex-start">
      <Text fontSize={"xl"} fontWeight={"bold"}>Team Information</Text>
      <Text>Address: {team.address}</Text>
      <Text>year founded: {team.founded}</Text> 
      <Text>Website: {team.website}</Text>
    </VStack>
  );
};

export default TeamInfo;