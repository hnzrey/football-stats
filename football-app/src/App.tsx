import React, { useState } from 'react';
import { VStack, Box, useToast} from '@chakra-ui/react';
import axios from 'axios';
import TeamSearch from './components/TeamSearch';
import TeamInfo from './components/TeamInfo';
import TeamStats, { TeamStatsModel } from './components/TeamStats';


interface Team {
  address: string;
  phone: string;
  website: string;
}

const App: React.FC = () => {
  const [team, setTeam] = useState<Team | null>(null);
  const [stats, setStats] = useState<TeamStatsModel | null>(null);
  const toast = useToast();


  const getTeamData = async (teamName: string) => {
    try {
      const apiUrl = 'http://localhost:4000/team';
      const response = await axios.get(`${apiUrl}/${encodeURIComponent(teamName)}`);

      const {teamInfo, stats} = response.data;

      setTeam({
        address: teamInfo.address,
        phone: teamInfo.phone,
        website: teamInfo.website,
      });

      setStats({
        wins: stats.wins,
        draws: stats.draws,
        losses: stats.losses,
        averageGoals: stats.averageGoals,
        goalsAway: stats.goalsAway,
        goalsHome: stats.goalsHome,
      });
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