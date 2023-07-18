import * as React from 'react';
import {Link} from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllSortedPubs} from "../../../actions/pubs";

export default function PaginationPubsItems({page}) {
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
            className='paginate align-center center'
            count={numberOfPages}
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/root/pubs?page=${item.page}`}
                />
            )}
        />
    )
}
