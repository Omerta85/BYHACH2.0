import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {faFacebook, faGithub, faInstagram, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import './footer.css'
import {Link} from "react-router-dom";
import Logo from "../../images/Logo.png";
import PhoneIcon from '@mui/icons-material/Phone';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import EmailIcon from '@mui/icons-material/Email';


export default function Footer() {

    return (

        <div className='w-90 center-box mt-105 footer'>
            <footer className="footer-distributed">

                <div className="footer-left">

                    <div className="footer-appName"><h3>BYHACH</h3> <img src={Logo} alt="LOGO" className="logo"/></div>

                    <p className="footer-links">
                        <Link to="#" className="link-1">Home</Link>

                        <Link to="#">Blog</Link>

                        <Link to="#">Pricing</Link>

                        <Link to="#">About</Link>

                        <Link to="#">Faq</Link>

                        <Link to="#">Contact</Link>
                    </p>

                    <p className="footer-company-name">Omerta666 © 2023</p>
                </div>

                <div className="footer-center">

                    <div>
                        <i>

                        <AddLocationIcon/>                      </i>

                        <p><span>St. Botanichna 10B</span> Ivano-Frankivsk, Ukraine</p>
                    </div>

                    <div>
                        <i>

                        <PhoneIcon/>                      </i>

                        <p>+38068-541-86-28</p>
                    </div>

                    <div>
                        <i>

                        <EmailIcon/>                    </i>

                        <p><Link to="mailto:666Omerta@gmail.com">666Omerta@gmail.com</Link></p>
                    </div>

                </div>

                <div className="footer-right">

                    <p className="footer-company-about">
                        <span>About the company</span>
                        "Omerta666" is a leading company specializing in the development of high-quality web applications.
                    </p>

                    <div className="footer-icons">

                        <Link to="https://www.facebook.com/Omerta666" target='_blank'><FontAwesomeIcon icon={faFacebook}/></Link>
                        <Link to="https://www.instagram.com/zastavnyjmiroslav/" target='_blank'><FontAwesomeIcon icon={faInstagram}/></Link>
                        <Link to="https://github.com/Omerta85" target='_blank'><FontAwesomeIcon icon={faGithub}/></Link>
                        <Link to="https://www.linkedin.com/in/myroslav-zastavnyi-1aa98566/" target='_blank'><FontAwesomeIcon icon={faLinkedin}/></Link>

                    </div>

                </div>

            </footer>
        </div>
    )
}
