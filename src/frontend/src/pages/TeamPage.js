import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LatestMatchDetail } from '../components/LatestMatchDetail';
import { MatchSmallCard } from '../components/MatchSmallCard';

export const TeamPage = () => {
  const { teamName } = useParams();
  const [team, setTeam] = useState({matches: []});

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch(`http://localhost:8080/team/${teamName}`);
      const data = await response.json();
      console.log(data);
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
    <div className="Team-page">
      <h1>{team.teamName}</h1>
      
      <LatestMatchDetail match={team.matches[0]} teamName={team.teamName}/>

      {team.matches.slice(1).map((match) => <MatchSmallCard key={match.id} teamName={team.teamName} match={match}/>)}
    </div>
  );
}