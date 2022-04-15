import './TeamPage.scss';
import { React, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import {PieChart } from 'react-minimal-pie-chart';

export const TeamPage = () => {
  const { teamName } = useParams();
  const [team, setTeam] = useState({matches: []});
  const latestYear = process.env.REACT_APP_DATA_END_YEAR;

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch(`http://localhost:8080/team/${teamName}`);
      const data = await response.json();
      setTeam(data);
    };
    
    fetchMatches();
  }, [teamName]);

  if(!team || !team.teamName) {
    return(
      <h1>Team Not Found. Talk to BCCI to get your team added in IPL next season!</h1>
    )
  }

  return(
    <div className='TeamPage'>
      <Link to='/'>Home</Link>
      <div className='team-container'>
        <div className='team-name-section'>
          <h1>{team.teamName}</h1>
        </div>

        <div className='win-loss-section'>
          <h3>Wins / Losses</h3>
          <PieChart 
            data={[
              { title: 'Losses', value : team.totalMatches - team.totalWins, color: '#a34d5d' },
              { title: 'Wins', value : team.totalWins, color: '#4da375' }
            ]}
            radius='40'
          />
        </div>
        
        <div className='match-detail-section'>
          <h2>Latest Matches</h2>
          <MatchDetailCard match={team.matches[0]} teamName={team.teamName}/>
        </div>

        {team.matches.slice(1).map((match) => 
          <MatchSmallCard key={match.id} teamName={team.teamName} match={match}/>
        )}
        <div className='more'>
          <Link to={`/teams/${teamName}/matches/${latestYear}`}>More ></Link>
        </div>
      </div>
    </div>
  );
}