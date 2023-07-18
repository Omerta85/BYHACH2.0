import * as React from 'react';
import {Link} from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsersByAdmin} from "../../../actions/admin";

export default function PaginationUserItems({page}) {
    const {numberOfUserPages} = useSelector((state) => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        if (page) {
            dispatch(getUsersByAdmin(page))
        }
    }, [dispatch, page])

    return (
        <Pagination
            page={Number(page) || 1}
            className='paginate align-center center'
            count={numberOfUserPages}
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/root?page=${item.page}`}
                />
            )}
        />
    )
}
