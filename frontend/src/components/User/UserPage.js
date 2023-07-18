import React, {useContext, useEffect} from "react";
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import moment from "moment";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../actions/users";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import UpdateForm from "./UpdateForm";

export default function UserPage() {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const data = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()

    const userData = useSelector((state) => state.users.user)

    useEffect(() => {
        dispatch(getUser(data._id))
    },[dispatch])

    if (!userData && !user) return <Loading/>

    const handleSubmit = async () => {

        const response = await fetch('https://localhost:5000/auth/forgot', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: userData.email
            })
        })
        await response.json()
    }

    const showVisible = () => {
        const input = document.getElementById('user-form');
        if (input.style.display === "none") {
            input.style.display = "block"
        } else {
            input.style.display = "none"
        }
    }

    return (
        <div>
            <div className='d-flex w-90 center-box'>
                <div className='w-50'>
                    <div className='center align-center w-300'>

                        <h3>Мій профіль</h3>
                        <div className='img-wrapper'>
                            {user ? (
                                <img src={user.photoURL} alt='user_photo' height={100}/>
                            ) : (
                                <img src={userData.avatar} alt='user_photo' className='img'/>
                            )}
                        </div>
                        <button className='btn-user mt-30' onClick={showVisible}>Редагувати</button>
                    </div>

                </div>
                <div className='w-50'>
                    <div>
                        <h5>Повне імʼя</h5>
                        <p>{userData ? (
                            <div>{userData.name}</div>
                        ) : (
                            <div>{user.displayName}</div>
                        )}</p>
                    </div>
                    <div>
                        <h5>Email</h5>
                        <p>{userData ? (
                            <div>{userData.email}</div>
                        ) : (
                            <div>{user.email}</div>
                        )}</p>
                    </div>
                    <div>
                        <h5>Долучився до спільноти</h5>
                        <p>{userData ? (
                            <div>{moment(userData.createdAt).fromNow()}</div>
                        ) : (
                            <div>Joined from unknown times</div>
                        )}
                        </p>
                    </div>

                    <Link to={'/user/cart'}>
                        <button className='btn-user'>Улюблені заклади</button>
                    </Link>

                    <br/>
                    <br/>

                    <button className='btn-user' onClick={() => {
                        handleSubmit()

                        Swal.fire('Перевірте свою пошту!')
                    }}>Змінити пароль
                    </button>
                </div>

                <div className='min-w-30' id='user-form' style={{display: 'none'}}>
                    <UpdateForm user={userData}/>
                </div>

            </div>

        </div>
    )
}
