import {removeItemFromCart} from "../../actions/cart";
import {useDispatch} from "react-redux";
import './cart.css'
import {faClock, faMapMarkerAlt, faPhoneAlt, faTrash, faWallet} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as React from "react";
import {useNavigate} from "react-router-dom";

export default function CartItem({item, user}) {

    const dispatch = useDispatch()
    const history = useNavigate()

    const deleteCartItems = (e) => {
        e.preventDefault()

        dispatch(removeItemFromCart(user._id, item._id))
    }

    const openPub = () => {
        history.push(`/pubs/${item._id}`)
    }

    return (
        <div className='center-box'>

            <div  className='m-50' >
                <div className='cart-items d-flex'>

                    <div className='w-40 ' onClick={openPub}>
                        <img src={item.avatar} alt="pub" height={170} width='100%'/>
                    </div>
                    <div className='w-55'>
                        <h5>
                            {item.name}
                        </h5>

                        <div>
                            <div className='d-flex jc-sa mb-40'>
                                <div>
                                    <div className='d-flex info-item cart-address h-45'>
                                        <FontAwesomeIcon icon={faMapMarkerAlt}/>
                                        <p>{item.address}</p>
                                    </div>
                                    <div className='d-flex info-item'>
                                        <FontAwesomeIcon icon={faWallet}/>
                                        <p>{item.order}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='d-flex info-item h-45'>
                                        <FontAwesomeIcon icon={faPhoneAlt}/>
                                        <p>{item.contact}</p>
                                    </div>
                                    <div className='d-flex info-item'>
                                        <FontAwesomeIcon icon={faClock}/>
                                        <p>{item.schedule}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-5'>
                        <FontAwesomeIcon
                            className='small-icon'
                            icon={faTrash}
                            onClick={deleteCartItems}/>
                    </div>
                </div>
            </div>

        </div>
    )
}
