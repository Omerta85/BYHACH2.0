import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {Rating} from "@material-ui/lab";
import {useNavigate} from "react-router";

export default function PubOnMap({pub}) {

    const history = useNavigate()

    const openPub = () => {
        history.push(`/pubs/${pub._id}`)
    }

    const options = {
        size: "large",
        value: pub.ratings,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <div className='mb-40 '>

        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea className='btn-none'>
                <CardMedia
                    component="img"
                    height="140"
                    image={pub.avatar}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {pub.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {pub.description}
                    </Typography>
                    <Typography>
                        <Rating {...options}/>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" className='btn-none' onClick={openPub}>
                    Більше
                </Button>
            </CardActions>
        </Card>
        </div>

    );
}
