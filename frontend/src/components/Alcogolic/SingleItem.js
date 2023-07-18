import './alcogolic.css'
import {
    faCalendarAlt,
    faClock,
    faUsers,
    faVenusMars,
    faWallet,
    faHryvnia,
    faCoffee, faPhoneAlt, faTrash,
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as React from "react";
import {faTelegramPlane} from "@fortawesome/free-brands-svg-icons";
import {useDispatch} from "react-redux";
import {removeItemFromOffer} from "../../actions/offer";

export default function SingleItem({user}) {
    const dispatch = useDispatch()

    const userStorage = JSON.parse(localStorage.getItem('profile'))

    return (
        <div>
            <div className='w-90 center-box mb-40'>
                {user.offer && user.offer.length > 0 ? (
                    <h4>Пропозиції від користувача {user.name}</h4>
                ) : (<div/>)}

            </div>

            <div className='w-90 center-box item-wrap jc-sa'>

                {user.offer && user.offer.map((item) => (
                    <div key={item._id}>
                        <div className='wrapper d-flex mb-40'>

                            {userStorage && userStorage.role === 'admin' ? (
                                <div className='img-trash'>
                                    <FontAwesomeIcon
                                        className='small-icon'
                                        icon={faTrash}
                                        onClick={() => {
                                            dispatch(removeItemFromOffer(user._id, item._id))
                                        }}/>
                                </div>
                            ) : (<div/>)}

                            <div className='w-35 center-vertical'>

                                <div className='center icon-center'>
                                    <div className='img-box center'>
                                        <img src={item.img} alt="profile" className='img'/>
                                    </div>

                                    <div className='item-name'>
                                        {item.creator}
                                    </div>
                                    <div
                                        id={item._id}
                                        style={{display: 'none'}}
                                        className='animate__animated animate__flipInX'>

                                        <div className='d-flex item-phone center-box'>
                                            <FontAwesomeIcon icon={faPhoneAlt}/>
                                            <p>{item.phone_number}</p>
                                        </div>
                                    </div>

                                    <button onClick={() => {
                                        const input = document.getElementById(item._id);
                                        if (input.style.display === "none") {
                                            input.style.display = "block"
                                        } else {
                                            input.style.display = "none"
                                        }
                                    }} className='btn-call item-name'>Call me
                                    </button>
                                </div>
                            </div>
                            <div className='w-65'>

                                <h5 className='center'>
                                    {item.name}
                                </h5>

                                <div className='d-flex font jc-sa'>

                                    <div className='w-30'>
                                        <div className='d-flex item'>
                                            <FontAwesomeIcon icon={faCalendarAlt}/>
                                            <p>{item.date}</p>
                                        </div>

                                        <div className='d-flex item'>
                                            <FontAwesomeIcon icon={faClock}/>
                                            <p>{item.time}</p>
                                        </div>

                                        <div className='d-flex item'>
                                            <FontAwesomeIcon icon={faUsers}/>
                                            <p>{item.quantity}</p>
                                        </div>

                                        <div className='d-flex item'>
                                            <FontAwesomeIcon icon={faVenusMars}/>
                                            <p>{item.sex}</p>
                                        </div>

                                    </div>

                                    <div className='w-40'>
                                        <div className='d-flex item'>
                                            <FontAwesomeIcon icon={faTelegramPlane}/>
                                            <p>{item.telegram}</p>
                                        </div>

                                        <div className='d-flex item'>
                                            <FontAwesomeIcon icon={faWallet}/>
                                            <p>{item.paid}</p>
                                        </div>

                                        <div className='d-flex item'>
                                            <FontAwesomeIcon icon={faHryvnia}/>
                                            <p>{item.sum}</p>
                                        </div>

                                        <div className='d-flex item'>
                                            <FontAwesomeIcon icon={faCoffee}/>
                                            <p>{item.goal}</p>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                ))}

            </div>

        </div>

    )
}
