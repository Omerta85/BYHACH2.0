import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deletePubByAdmin, getNotActivatedPubs} from "../../../actions/admin";
import ModerationPub from "./ModerationPub";
import {activatePub} from "../../../actions/pubs";
import {Link} from "react-router-dom";

export default function Moderation() {
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        dispatch(getNotActivatedPubs())
    }, [currentId, dispatch])

    const {pubs} = useSelector((state) => state.pubs)
    const pub = useSelector((state) => currentId ? state.pubs.pubs.find((pub) => pub._id === currentId) : null)

    if (!pubs.length) return <div>
        <h3 className='w-90 center'>Наразі немає закладів для модерації</h3>
        <div className='w-90 center'><Link to={'/root'}><button className='btn-change'>Go back to Admin page</button></Link></div>
    </div>

    const clear = () => {
        setCurrentId(0)
    }

    const pubName = pubs.map((pub) => {
        if (currentId === pub._id) return pub.name
    })

    const handleSubmit = () => {
        dispatch(activatePub(pub._id))
        dispatch(getNotActivatedPubs())
        setCurrentId(0)
    }

    const handleDelete = () => {
        dispatch(deletePubByAdmin(pub._id))
        dispatch(getNotActivatedPubs())
    }

    return (
        <div className='w-90 center-box'>
            <h1>Модерація</h1>
            <h4>{currentId ? <div className='d-flex'>
                <div>Вибрано заклад: {pubName}</div>

                <button className='btn-link' onClick={handleSubmit}>Активувати</button>

                <button className='btn-change' onClick={clear}>Вибрати інший</button>

                <button className='btn-change' onClick={handleDelete}>Видалити</button>

            </div> : <div>Виберіть заклад, щоб активувати</div>}
            </h4>
            <div className='table-wrapper h-auto shadow'>
                <div className='d-flex j-content-around w-100 header-table'>
                    <div className='w-10 tr-text'>NAME</div>
                    <div className='w-20 tr-text'>ADDRESS</div>
                    <div className='w-10 tr-text'>CONTACT</div>
                    <div className='w-10 tr-text'>ORDER</div>
                    <div className='w-30 tr-text'>Description</div>
                    <div className='w-10 tr-text'>SCHEDULE</div>
                    <div className='w-10 tr-text'>AVATAR</div>
                </div>
                <div>
                    {pubs?.map((pub) => (
                        <div key={pub._id}>
                            <ModerationPub pub={pub} setCurrentId={setCurrentId}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
