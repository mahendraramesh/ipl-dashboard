import './MatchPage.scss';
import { React, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { YearSelector } from '../components/YearSelector';

export const MatchPage = () => {
  const { teamName, year } = useParams();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`);
      const data = await response.json();
      setMatches(data);
    };
    
    fetchMatches();
  }, [teamName, year]);

  if(!teamName || matches.length === 0) {
    return(
      <h1>Team Not Found. Talk to BCCI to get your team added in IPL next season!</h1>
    )
  }

  return(
    <div className="MatchPage">
      <Link to='/'>Home</Link>
      <div className='match-container'>
        <YearSelector teamName={teamName} currentYear={year}/>
        <div>
          <h1 className='match-heading'>Matches played by {teamName} in {year}</h1>
          {matches.map(match => <MatchDetailCard key={match.id} teamName={teamName} match={match}/>)}
        </div>
      </div>
    </div>
  );
}