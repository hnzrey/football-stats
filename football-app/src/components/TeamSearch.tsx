import React, { useState } from 'react';
import { Box, Input, Button } from '@chakra-ui/react';

interface TeamSearchProps {
  onSearch: (teamName: string) => void;
}

const TeamSearch: React.FC<TeamSearchProps> = ({ onSearch }) => {
  const [teamName, setTeamName] = useState('');

  const handleSearch = () => {
    onSearch(teamName);
  };

  return (<>
    <Box>&nbsp;</Box>
    <Box>
      <Input
        placeholder="Enter team name"
        value={teamName}
        onChange={e => setTeamName(e.target.value)}
        mb={4}
      />
      <Button onClick={handleSearch} colorScheme="blue">
        Search
      </Button>
    </Box>
    </>
  );
};

export default TeamSearch;