import express from 'express';
import axios from 'axios';

const app = express();
const port = 4000;

const API_KEY = 'PUT YOUR API KEY HERE'; // obviously it should not be hardcoded here
const BASE_URL = 'https://api.football-data.org/v4';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
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
    const response = await axios.get(`${BASE_URL}/competitions/PL/teams`, {
        headers: { 'X-Auth-Token': API_KEY },
    });
    const team = response.data.teams.find(t => t.name.toLowerCase() === teamName.toLowerCase());
    if (!team) throw new Error('Team not found');

    return {
        id: team.id,
        address: team.address,
        phone: team.phone,
        website: team.website,
    };
}

async function getTeamStats(teamId) {
    const response = await axios.get(`${BASE_URL}/teams/${teamId}/matches?status=FINISHED&season=2021`, {
        headers: { 'X-Auth-Token': API_KEY },
    });

    const matches = response.data.matches.filter(
        match => match.competition.name === 'Premier League'
    );

    let wins = 0;
    let draws = 0;
    let winsHome = 0; // ah it turned out that it is not needed. no time to refactor.
    let winsAway = 0; // ah it turned out that it is not needed. no time to refactor.
    let goalsHome = 0;
    let goalsAway = 0;
    let losses = 0;
    let totalGoals = 0;

    matches.forEach(match => {

        if (match.score.winner === 'DRAW') {
            draws++;
        } else if (
            (match.score.winner === 'HOME_TEAM' && match.homeTeam.id === teamId)
        ) {
            winsHome++;
        } else if (
          (match.score.winner === 'AWAY_TEAM' && match.awayTeam.id === teamId)
        ) {
            winsAway++;
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
    wins = winsAway + winsHome;
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