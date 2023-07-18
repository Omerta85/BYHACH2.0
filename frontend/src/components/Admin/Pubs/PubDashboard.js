import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import Pubs from "./Pubs";
import PubForm from "./PubForm";
import {useLocation} from "react-router-dom";
import {getAllSortedPubs} from "../../../actions/pubs";
import PaginationPubsItems from "./PaginationPub";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export default function PubDashboard(){
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch()
    const query = useQuery()
    const page = query.get('page') || 1

    useEffect(() => {
        const query = `?page=${page}`
        dispatch(getAllSortedPubs(query))
    }, [currentId, dispatch, page])

    return(
        <div className='w-90 center-box'>
            <div>
                <div className='d-flex w-100 j-content-between mb-50'>
                    <Pubs setCurrentId={setCurrentId}/>
                    <PubForm currentId={currentId} setCurrentId={setCurrentId}/>
                </div>
                <PaginationPubsItems page={page}/>
            </div>
        </div>
    )
}
