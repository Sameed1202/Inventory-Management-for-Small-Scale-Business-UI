import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { green } from '@mui/material/colors';

export default function ActionAreaCard({heading, content, imgsource}) {
  return (
    <Card sx={{ maxWidth: 345, marginRight: "20px"}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imgsource}
          alt="green iguana"
        />
        <CardContent>
          <Typography sx={{fontSize: 20, color: "green", fontWeight: 'bold'}} gutterBottom variant="h5" component="div">
            {heading}
          </Typography>
          <Typography sx={{fontSize: 20, fontWeight: 'bold'}} variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
