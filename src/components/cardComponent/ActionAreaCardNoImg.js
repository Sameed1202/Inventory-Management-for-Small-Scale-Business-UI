import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { green } from '@mui/material/colors';

export default function ActionAreaCardNoImg({heading, content}) {
  return (
    <Card sx={{ maxWidth: 345, maxHeight: 100, marginRight: "25px", marginBottom: "20px"}}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{fontSize: 20, color: "#2C3333", fontWeight: 'bold'}} gutterBottom variant="h5" component="div">
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
