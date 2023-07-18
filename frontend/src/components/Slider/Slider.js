import image1 from '../../images/carousel-1.jpeg'
import image2 from '../../images/carousel-2.jpeg'
import image3 from '../../images/carousel-3.jpeg'
import image4 from '../../images/carousel-4.jpeg'
import image5 from '../../images/carousel-5.jpeg'
import M from 'materialize-css'
import './slider.css'
import {Link} from "react-router-dom";
import {useEffect} from "react";

export default function Slider() {

    useEffect(() => {
        let elems = document.querySelectorAll('.carousel');
        M.Carousel.init(elems);
    }, [])

    const result = "1,2,3";
    const x = result.search('1')
    console.log(x)


    // console.log(x);

    return (
        <div>
            <div className='center mt-105'>
                <h4>Найкращі заклади на думку адміністрації</h4>
            </div>
            <div>
                <div className='carousel'>
                    <Link to="/pubs/61dc903c2f6cfb90419f31f6" className='carousel-item'>
                        <img src={image1} alt="pic1"/>
                        <div className='center'>
                            <p>Криївка (Львів)</p>
                        </div>
                    </Link>
                    <Link to="/pubs/61dc8ef72f6cfb90419f31f3" className='carousel-item'>
                        <img src={image2} alt="pic2"/>
                        <div className='center'>
                            <p>Ресторація Бачевських (Львів)</p>
                        </div>
                    </Link>
                    <Link to="/pubs/61dc8b562f6cfb90419f31e1" className='carousel-item'>
                        <img src={image3} alt="pic3"/>
                        <div className='center'>
                            <p>Steak House (Київ)</p>
                        </div>
                    </Link>
                    <Link to="/pubs/61dc8d9a2f6cfb90419f31f0" className='carousel-item'>
                        <img src={image4} alt="pic4"/>
                        <div className='center'>
                            <p>Foundation Coffee Roadsters (Одеса)</p>
                        </div>
                    </Link>
                    <Link to="/pubs/61dc89552f6cfb90419f31de" className='carousel-item'>
                        <img src={image5} alt="pic5"/>
                        <div className='center'>
                            <p>Fratelli (Одеса)</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
