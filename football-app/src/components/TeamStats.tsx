import React from 'react';
import { VStack, Text } from '@chakra-ui/react';

export interface TeamStatsModel {
  wins: number;
  draws: number;
  losses: number;
  averageGoals: number;
  goalsAway: number;
  goalsHome: number;
  totalGoals: number;
}

interface TeamStatsProps {
  stats: TeamStatsModel | null;
}

const TeamStats: React.FC<TeamStatsProps> = ({ stats }) => {
  if (!stats) return null;

  return (
    <VStack spacing={5} alignItems="flex-start">
      <Text fontSize="xl" fontWeight={"bold"}>Team Statistics</Text>
      <Text>Wins: {stats.wins}</Text>
      <Text>Draws: {stats.draws}</Text>
      <Text>Losses: {stats.losses}</Text>
      <Text>Goals at Home: {stats.goalsHome}</Text>
      <Text>Goals at Away: {stats.goalsAway}</Text>
      <Text>Total goals: {stats.totalGoals}</Text>
      <Text>Average Goals: {stats.averageGoals?.toFixed(2) || 0}</Text>
    </VStack>
  );
};

export default TeamStats;