import {useEffect} from "react";
import {getAllUsers} from "../../actions/users";
import {useDispatch, useSelector} from "react-redux";
import SingleItem from "./SingleItem";
import '../Maps/map.css'
import Loading from "../Loading/Loading";

import * as React from "react";

export default function AlcogolicItems(){
    const dispatch = useDispatch()

    const {users} = useSelector((state)=> state.users)

    useEffect(()=> {
        dispatch(getAllUsers())
    },[dispatch])

    if (!users) return <Loading/>
    return(
        <div>

            {users && users.map((user) => (
                <div key={user._id}>
                    <SingleItem user={user} users_lenght={users.length}/>
                </div>
            ))}

        </div>
    )
}
