import {useEffect} from "react";
import {getAllPubs} from "../../../actions/pubs";
import {useDispatch, useSelector} from "react-redux";
import AllEvents from "./AllEvents";
import Loading from "../../Loading/Loading";

export default function EventsCard() {
    const {data} = useSelector((state) => state.pubs.pubs)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPubs())
    }, [dispatch])

    if (!data) return <Loading/>

    const sortedPubs = [...data].sort((a, b) => (b.createdAt > a.createdAt) ? 1 : -1)

    return (
        <div className='w-80 center-box'>
            <h1>Події</h1>

            <div className='w-100 '>
                {sortedPubs.map((pub) => (
                    <div key={pub._id}>
                        <AllEvents pub={pub}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

