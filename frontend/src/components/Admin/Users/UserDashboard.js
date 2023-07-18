import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getUsersByAdmin} from "../../../actions/admin";
import Users from "./Users";
import UserForm from "./UserForm";
import PaginationUserItems from "./PaginationUser";
import {useLocation} from "react-router-dom";
import '../adminPage.css'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export default function UserDashboard() {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch()
    const query = useQuery()
    const page = query.get('page') || 1

    useEffect(() => {
        dispatch(getUsersByAdmin(page))
    }, [currentId, dispatch, page])

    return (
        <div className='w-90 center-box'>
            <div>
                <div className='d-flex w-100 j-content-between mb-50'>
                    <Users setCurrentId={setCurrentId}/>
                    <UserForm currentId={currentId} setCurrentId={setCurrentId}/>
                </div>
                <PaginationUserItems page={page}/>
            </div>
        </div>
    )
}
