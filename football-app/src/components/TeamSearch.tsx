import React, { useState } from 'react';
import { Input, Button, VStack } from '@chakra-ui/react';

interface TeamSearchProps {
  onSearch: (teamName: string) => void;
}

const PLACEHOLDER_TEXT = 'Enter team name';

const TeamSearch: React.FC<TeamSearchProps> = ({ onSearch }) => {
  const [teamName, setTeamName] = useState('');

  const handleSearch = () => {
    onSearch(teamName);
  };

  return (
    <VStack spacing={4}>
      <Input
        placeholder={PLACEHOLDER_TEXT}
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
      <Button onClick={handleSearch} colorScheme="blue">
        Search
      </Button>
    </VStack>
  );
};

export default TeamSearch;