import {useEffect} from "react";
import {getAllPubs} from "../../../actions/pubs";
import {useDispatch, useSelector} from "react-redux";
import AllNews from "./AllNews";
import Loading from "../../Loading/Loading";

export default function NewsCard() {
    const dispatch = useDispatch()
    const {data} = useSelector((state) => state.pubs.pubs)

    useEffect(() => {
        dispatch(getAllPubs())
    }, [dispatch])

    if (!data) return <Loading/>

    const sortedPubs = [...data].sort((a, b) => (b.createdAt > a.createdAt) ? 1 : -1)

    return (
        <div className='w-80 center-box'>
            <h1>Новини</h1>
            <div className='w-100'>
                {sortedPubs.map((pub) => (
                    <div key={pub._id}>
                        <AllNews pub={pub}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
