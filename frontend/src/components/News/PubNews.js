import {useNavigate} from "react-router-dom";
import './newsPage.css'
import {useEffect, useState} from "react";

export default function PubNews({pub}) {
    const history = useNavigate()
    const [sortedNews, setSortedNews] = useState([])

    useEffect(() => {
        setSortedNews([...pub.news].sort((a, b) => (b.createdAt > a.createdAt) ? 1 : -1))
    },[pub])

    return (
        <div className='w-90 center-box'>
            {sortedNews && sortedNews.map((singleNews) => (

                <div key={singleNews._id} className='news_title' onClick={() => {

                    history.push(`/news/news/${pub._id}/${singleNews._id}`)
                }}>
                    <div>
                        {singleNews.title}
                    </div>
                </div>

            ))}
        </div>
    )
}

