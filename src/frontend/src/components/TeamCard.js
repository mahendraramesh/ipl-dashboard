import './TeamCard.scss';
import { React } from 'react';
import { Link } from 'react-router-dom';

export const TeamCard = ({team}) => {
  return(
   <div className='TeamCard'>
     <h3>
        <Link to={`/teams/${team.teamName}`}>{team.teamName}</Link>
      </h3>
    </div>
  )
}