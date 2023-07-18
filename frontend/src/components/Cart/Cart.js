import {useDispatch, useSelector} from 'react-redux'
import CartItem from "./CartItem";
import {useEffect} from "react";
import {getUser} from "../../actions/users";

export default function Cart() {
    const {user} = useSelector((state) => state.users);
    const userDB = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser(userDB._id))

    }, [dispatch])

    return (
        <div className='w-90 center-box'>
            <div>
                <h1>Козирні заклади</h1>
            </div>
            <div>
                {!user && (
                    <h3>Please Login.</h3>
                )}
            </div>

            <div className='d-flex jc-sa cart-wrap'>
                {user && user.cart.map((item) => (
                    <div key={item._id} className='w-50'>
                        <CartItem item={item} user={user}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
