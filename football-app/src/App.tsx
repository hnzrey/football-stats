import React, { useState } from 'react';
import { VStack, Box, useToast } from '@chakra-ui/react';
import api from './services/api';
import TeamSearch from './components/TeamSearch';
import TeamInfo, { TeamModel } from './components/TeamInfo';
import TeamStats, { TeamStatsModel } from './components/TeamStats';

const App: React.FC = () => {
  const [team, setTeam] = useState<TeamModel | null>(null);
  const [stats, setStats] = useState<TeamStatsModel | null>(null);
  const toast = useToast();

  const getTeamData = async (teamName: string) => {
    try {
      const response = await api.get(`/team/${encodeURIComponent(teamName)}`);
      const { teamInfo, stats } = response.data;

      setTeam({ ...teamInfo });
      setStats({ ...stats });
    } catch (error) {
      console.error('Error fetching team data:', error);
      toast({
        position: 'top-left',
        title: 'User input error',
        description: 'Team not found',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack>
      <Box>Example team name: Manchester United FC</Box>
      <Box>
        <TeamSearch onSearch={getTeamData} />
      </Box>
      <Box>
        <TeamInfo team={team} />
      </Box>
      <Box>
        <TeamStats stats={stats} />
      </Box>
    </VStack>
  );
};

export default App;
