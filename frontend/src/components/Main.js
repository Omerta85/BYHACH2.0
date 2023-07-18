import picture from '../images/1.jpg'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import pic1 from '../images/news.jpg'
import pic2 from '../images/holidaysrest-1.jpg'
import pic3 from '../images/google_map.png'
import pic4 from '../images/proposition.jpg'
import {Link} from "react-router-dom";
import Slider from "./Slider/Slider";

export default function Main() {

    return (
        <div className='w-90 center-box'>

            <div className='relative main-img-wrapper'>
                <img src={picture} alt="wine" width='100%'/>

                <div className='absolute main-text'>
                    <h3>Ласкаво просимо в нашу спільноту!</h3>
                </div>
            </div>

            <div className='mt-105'>
                <div className='d-flex jc-sa'>

                    <div>
                        <Card sx={{width: 345}} id='border-10'>
                            <Link to='/news'>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={pic1}
                                    alt="news"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Новини
                                    </Typography>
                                </CardContent>
                            </Link>
                        </Card>
                        <br/>
                        <br/>
                        <br/>
                        <Card sx={{width: 345}} id='border-10'>
                            <Link to='/pubs'>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={pic2}
                                    alt="news"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Заклади
                                    </Typography>
                                </CardContent>
                            </Link>
                        </Card>
                    </div>

                    <div>
                        <Card sx={{width: 345}} id='border-10'>
                            <Link to='/map'>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={pic3}
                                    alt="news"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Карта закладів
                                    </Typography>
                                </CardContent>
                            </Link>
                        </Card>
                        <br/>
                        <br/>
                        <br/>
                        <Card sx={{width: 345}} id='border-10'>
                            <Link to='/alco/items'>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={pic4}
                                    alt="news"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Пропозиції
                                    </Typography>
                                </CardContent>
                            </Link>
                        </Card>
                    </div>

                </div>

            </div>

            <div>

                <Slider/>

            </div>

        </div>
    )
}
