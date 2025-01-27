import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Link } from 'react-router-dom';
import "../Styles/menu.css"

export default function Menu({foodName, description, imageUrl}) {
  return (
    <Link to={"/all-food-items"} style={{textDecoration: "none"}}>
      <Card sx={{ maxWidth: 700 }} style={{margin: "auto", marginTop: "20px"}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="170"
            image={imageUrl}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {foodName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" className='menuButton'>
            See all items
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
}