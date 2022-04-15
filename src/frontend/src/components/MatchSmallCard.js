import './MatchSmallCard.scss';
import { React } from 'react';
import { Link } from 'react-router-dom';

export const MatchSmallCard = ({match, teamName}) => {
  if(!match) return null;

  const otherTeam = teamName === match.team1 ? match.team2 : match.team1;
  const otherTeamRoute = `/teams/${otherTeam}`;
  const isMatchWon = teamName === match.matchWinner;
  return(
    <div className={isMatchWon ? 'match-won MatchSmallCard' : 'match-lost MatchSmallCard'}>
      <span>vs</span>
      <h3><Link to={otherTeamRoute}>{otherTeam}</Link></h3>
      <p>{match.matchWinner} won by {match.resultMargin} {match.result}</p>
    </div>
  );
}