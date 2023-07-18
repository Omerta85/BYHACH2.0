import * as React from 'react';
import {Link} from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {useEffect} from "react";
import {getAllSortedPubs} from "../../actions/pubs";
import {useDispatch, useSelector} from "react-redux";

export default function PaginationItems({page}) {
    const {numberOfPages} = useSelector((state) => state.pubs.pubs)
    const dispatch = useDispatch()

    useEffect(() => {
        if (page) {
            const query = `?page=${page}`
            dispatch(getAllSortedPubs(query))
        }
    }, [dispatch, page])


    return (
        <Pagination
            page={Number(page) || 1}
            id='pagination'
            className='paginate align-center w-90 center'
            count={numberOfPages}
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/pubs?page=${item.page}`}
                />
            )}
        />
    )
}
