import './YearSelector.scss';
import { React } from 'react';
import { Link } from 'react-router-dom';

export const YearSelector = ({teamName, currentYear}) => {
  
  const startYear = process.env.REACT_APP_DATA_START_YEAR;
  const endYear = process.env.REACT_APP_DATA_END_YEAR;
  const years = [];
  for(let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  return(
    <div className='YearSelector'>
      <h3 className='year-heading'>Select Year</h3>
      <ul>
        {years.map(year => 
          <li key={year}>
            <Link className={year == currentYear ? 'highlight': ''} to={`/teams/${teamName}/matches/${year}`}>{year}</Link>
          </li>
        )}
      </ul>
      
    </div>
  );
}