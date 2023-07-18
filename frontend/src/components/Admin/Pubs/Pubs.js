import {useDispatch, useSelector} from "react-redux";
import Pub from "./Pub";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {getAllSortedPubs} from "../../../actions/pubs";
import * as React from "react";

export default function Pubs({setCurrentId}){
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    const {pubs} = useSelector((state) => state.pubs)
    console.log(pubs)


    if (pubs.data && !pubs.data.length) return 'No pubs'

    const searchPub = () => {
        if (search) {
            const query = `?name=${search}`
            dispatch(getAllSortedPubs(query))
        }
    }

    return(
        <div className='w-65'>
            <div>
                <div className='d-flex pl-15'>
                    <div className='search-input'>
                        <input
                            type='text'
                            placeholder='Пошук закладів...'
                            onChange={({target: {value}}) => setSearch(value)}
                        />
                    </div>
                    <FontAwesomeIcon icon={faSearch} className='ml-20 icon center-vertical' onClick={searchPub}/>

                </div>
            </div>

            <div className='table-wrapper h-780 shadow'>
                <div className='d-flex j-content-around w-100 header-table'>
                    <div className='w-20 tr-text'>NAME</div>
                    <div className='w-30 tr-text'>ID</div>
                    <div className='w-30 tr-text'>ADDRESS</div>
                    <div className='w-10 tr-text'>ORDER</div>
                </div>
                {pubs.data && pubs.data.map((pub) => (
                    <div key={pub._id}>
                        <Pub pub={pub} pubs={pubs} setCurrentId={setCurrentId}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
