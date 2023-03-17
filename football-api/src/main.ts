import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 4000;

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.football-data.org/v4';
const constants = {
  COMPETITION: 'Premier League',
  DRAW: 'DRAW',
  HOME_TEAM: 'HOME_TEAM',
  AWAY_TEAM: 'AWAY_TEAM',
  SEASON: '2021'
};

const footballAPI = axios.create({
  baseURL: BASE_URL,
  headers: { 'X-Auth-Token': API_KEY },
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.get('/team/:teamName', async (req, res) => {
    try {
        const teamName = req.params.teamName;
        const teamInfo = await getTeamInfo(teamName);
        const stats = await getTeamStats(teamInfo.id);

        res.json({
            teamInfo,
            stats,
        });
    } catch (error) {
        res.status(400).json({ message: 'An error occurred', error });
    }
});

async function getTeamInfo(teamName) {
    const response = await footballAPI.get('/competitions/PL/teams');
    const team = response.data.teams.find(t => t.name.toLowerCase() === teamName.toLowerCase());
    if (!team) throw new Error('Team not found');

    return {
        id: team.id,
        address: team.address,
        founded: team.founded, // it seems that there is no phone present in API. I used founder year instead to display something interesting
        website: team.website,
    };
}

async function getTeamStats(teamId) {
    const response = await footballAPI.get(`/teams/${teamId}/matches?status=FINISHED&season=${constants.SEASON}`);
    const matches = response.data.matches.filter(
        match => match.competition.name === constants.COMPETITION
    );

    let wins = 0;
    let draws = 0;
    let goalsHome = 0;
    let goalsAway = 0;
    let losses = 0;
    let totalGoals = 0;

    matches.forEach(match => {

        if (match.score.winner === constants.DRAW) {
            draws++;
        } else if (
            (match.score.winner === constants.HOME_TEAM && match.homeTeam.id === teamId)
            || (match.score.winner === constants.AWAY_TEAM  && match.awayTeam.id === teamId)
        ) {
            wins++;
        } else {
            losses++;
        }

        if (match.homeTeam.id === teamId) {
            goalsHome += match.score.fullTime.home;
            totalGoals += match.score.fullTime.home;
        } else {
            goalsAway += match.score.fullTime.away
            totalGoals += match.score.fullTime.away;
        }
    });
    const averageGoals = totalGoals / matches.length;

    return {
        wins,
        draws,
        losses,
        averageGoals,
        totalGoals,
        goalsAway,
        goalsHome
    };
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});