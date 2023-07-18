import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getPub} from "../../../actions/pubs";
import {useParams} from "react-router";
import '../newsPage.css'

export default function SingleNews() {
    const {pub_id, news_id} = useParams()
    const dispatch = useDispatch()

    const {pub} = useSelector((state) => state.pubs)

    useEffect(() => {
        dispatch(getPub(pub_id))
    }, [pub_id])

    return (

        <div>
            {pub && pub.news.map((singleNews) => (
                <div key={singleNews._id} className='w-80 center-box'>
                    {singleNews && singleNews._id === news_id ? (
                        <div className='singleNews d-flex jc p-10'>
                            <div>
                                <div>
                                    <h5>{singleNews.title}</h5>
                                    {singleNews.text}
                                </div>
                            </div>
                            <div className='center-vertical p-20'>
                                <img src={singleNews.avatar} alt="news" height={300}/>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            ))}
        </div>


    )
}
