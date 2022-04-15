import './HomePage.scss';
import { React, useEffect, useState } from 'react';
import { TeamCard } from '../components/TeamCard';

export const HomePage = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await fetch(`http://localhost:8080/team/list`);
      const data = await response.json();
      setTeams(data);
    };

    fetchTeams();
  }, []);

  return(
   <div className='HomePage'>
     <h1 className='header'>IPL Dashboard</h1>
     <p className='caption'>View Matches played by your Favourite IPL Teams</p>
     <div className='team-list-container'>
      {teams.map(team => <TeamCard key={team.id} team={team}/>)}
     </div>
   </div>
  )
}