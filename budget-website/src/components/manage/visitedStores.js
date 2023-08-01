import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import '../styles/manage.scss';

export default function VisitedStores() {

  const bodyContent = 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'

  return (
    <div>

      <div className='manage--card--header'>
        VISITED STORES
        
      </div>

      <hr />

      <div className='manage--card--bg'>
        
        <div className='manage--card--bg--body'>
          ${bodyContent}
        </div>

      </div>

    </div>
  )
}
