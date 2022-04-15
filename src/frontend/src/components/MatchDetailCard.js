import './MatchDetailCard.scss';
import { React } from 'react';
import { Link } from 'react-router-dom';

export const MatchDetailCard = ({match, teamName}) => {
  if(!match) return null;

  const otherTeam = teamName === match.team1 ? match.team2 : match.team1;
  const otherTeamRoute = `/teams/${otherTeam}`;
  const isMatchWon = teamName === match.matchWinner;
  return(
    <div className={isMatchWon ? 'match-won MatchDetailCard' : 'match-lost MatchDetailCard'}>
      <div>
        <span>vs</span> <h1><Link to={otherTeamRoute}>{otherTeam}</Link></h1>
        <h2 className='match-date'>{match.date}</h2>
        <h3 className='match-venue'>at {match.venue}</h3>
        <h3 className='match-winner'>{match.matchWinner} won by {match.resultMargin} {match.result}</h3>
      </div>
      <div className='additional-match-details'>
        <h3>First Innings</h3>
        <p>{match.team1}</p>
        <h3>Second Innings</h3>
        <p>{match.team2}</p>

        <h3>Man of the Match</h3>
        <p>{match.playerOfMatch}</p>
      </div>
      
    </div>
  );
}