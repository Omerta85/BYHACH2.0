import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import '../../index.css'
import './auth.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebookF, faGoogle, faGithub} from '@fortawesome/free-brands-svg-icons'
import {useDispatch} from "react-redux";
import {login, register} from "../../actions/auth";
import {Context} from "../../index";
import firebase from 'firebase/compat/app'
import {useAuthState} from 'react-firebase-hooks/auth'

export default function Auth() {
    const {auth} = useContext(Context)
    useAuthState(auth)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const history = useNavigate()
    const [isSignup, setIsSignup] = useState(false);
    const [data, setData] = useState({name: '', email: '', password: '', born_year: ''})
    const [avatar, setAvatar] = useState()

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        console.log(isSignup)
    }

    const handleAuthSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        const fileField = document.querySelector('input[type="file"]')
        const nameField = document.querySelector('input[name="name"]')
        const emailField = document.querySelector('input[name="email"]')
        const bornYearField = document.querySelector('input[name="born_year"]')
        const passwordField = document.querySelector('input[name="password"]')

        formData.append('name', nameField.value)
        formData.append('email', emailField.value)
        formData.append('born_year', bornYearField.value)
        formData.append('password', passwordField.value)
        formData.append('avatar', fileField.files[0])

        try {
            if (isSignup) {
                dispatch(register(formData, history));
            } else {
                dispatch(login(formData, history));


            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const googleLogin = async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider()
            await auth.signInWithPopup(provider)
        } catch (e) {
            console.log(e)
        }
    }

    const facebookLogin = async () => {
        try {
            const provider = new firebase.auth.FacebookAuthProvider()
            await auth.signInWithPopup(provider)

        } catch (e) {
            console.log(e)
        }
    }

    const githubLogin = async () => {
        try {
            const provider = new firebase.auth.GithubAuthProvider()
            await auth.signInWithPopup(provider)

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {

        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        if (signUpButton) {
            signUpButton.addEventListener('click', () => {
                container.classList.add("right-panel-active");
            });
        }

        if (signInButton) {
            signInButton.addEventListener('click', () => {
                container.classList.remove("right-panel-active");
            })
        }
    }, [])

    return (
        <div>
            {/*{!user &&*/}
            <div>
                <h2>Welcome to BYHACH</h2>
                <div className="container" id="container">
                    <div className="form-container sign-up-container">
                        <form action="#">
                            <h1>Create Account</h1>
                            <div>
                                <div>
                                    <input
                                        name='name'
                                        placeholder='Name'
                                        type="text"
                                        value={data.name}
                                        onChange={({target: {value}}) => setData({...data, name: value})}
                                    />
                                </div>
                                <div>
                                    <input
                                        name='email'
                                        placeholder='Email'
                                        type="text"
                                        value={data.email}
                                        onChange={({target: {value}}) => setData({...data, email: value})}
                                    />
                                </div>
                                <div>
                                    <input
                                        name='born_year'
                                        placeholder='Born year'
                                        type="number"
                                        value={data.born_year}
                                        onChange={({target: {value}}) => setData({...data, born_year: value})}
                                    />
                                </div>
                                <div>
                                    <input
                                        name='password'
                                        placeholder='Password'
                                        type="text"
                                        value={data.password}
                                        onChange={({target: {value}}) => setData({...data, password: value})}
                                    />
                                </div>
                                <div>
                                    <input
                                        name='avatar'
                                        placeholder='Avatar'
                                        type="file"
                                        value={avatar}
                                        onChange={({target: {value}}) => setAvatar(value)}
                                    />
                                </div>
                                <button
                                    type='submit'
                                    disabled={!data.name || !data.email ||
                                    !data.born_year || !data.password || !avatar || loading}
                                    onClick={handleAuthSubmit}
                                >SIGN UP
                                </button>
                            </div>


                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form action="#">
                            <h1>Sign in</h1>
                            <div className="social-container">
                                <Link to="/" className="social" onClick={googleLogin}>
                                    <FontAwesomeIcon icon={faGoogle} className='fab'/></Link>
                                <Link to="/" className="social" onClick={facebookLogin}>
                                    <FontAwesomeIcon icon={faFacebookF} className='fab'/></Link>
                                <Link to="/" className="social" onClick={githubLogin}>
                                    <FontAwesomeIcon icon={faGithub} className='fab'/></Link>
                            </div>
                            <span>or use your account</span>


                            <div>
                                <div>
                                    <input
                                        name='email'
                                        placeholder='Email'
                                        type="text"
                                        value={data.email}
                                        onChange={({target: {value}}) => setData({...data, email: value})}
                                    />
                                </div>
                                <div>
                                    <input
                                        name='password'
                                        placeholder='Password'
                                        type="password"
                                        value={data.password}
                                        onChange={({target: {value}}) => setData({...data, password: value})}

                                    />
                                </div>
                                <Link to="/forgot">Forgot your password?</Link>
                                <button
                                    className='mt-30'
                                    type='submit'
                                    disabled={!data.email || !data.password || loading}
                                    onClick={handleAuthSubmit}
                                >SIGN IN
                                </button>
                            </div>


                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className="ghost" id='signIn' onClick={switchMode}>Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className="ghost" id='signUp' onClick={switchMode}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*}*/}
        </div>
    )
}
