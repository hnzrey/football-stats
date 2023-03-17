import React, { useState } from 'react';
import { VStack, Box, useToast} from '@chakra-ui/react';
import axios from 'axios';
import TeamSearch from './components/TeamSearch';
import TeamInfo, { TeamModel } from './components/TeamInfo';
import TeamStats, { TeamStatsModel } from './components/TeamStats';



const App: React.FC = () => {
  const [team, setTeam] = useState<TeamModel | null>(null);
  const [stats, setStats] = useState<TeamStatsModel | null>(null);
  const toast = useToast();


  const getTeamData = async (teamName: string) => {
    try {
      const apiUrl = 'http://localhost:4000/team';
      const response = await axios.get(`${apiUrl}/${encodeURIComponent(teamName)}`);
      // Axios instance should be used instead
      // refactor to use separate service for data fetch
      // refactor to use useQuery hook
      const {teamInfo, stats} = response.data;

      setTeam({...teamInfo});

      setStats({...stats});
    } catch (error) {
      console.error('Error fetching team data:', error);
      toast({
        position: 'top-left',
        title: "User input error",
        description: 'Team not found',
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack>
      <Box>
        Example team name: Manchester United FC
      </Box>
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