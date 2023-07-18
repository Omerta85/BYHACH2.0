import {useNavigate} from "react-router-dom";
import '../newsPage.css'
import {useEffect, useState} from "react";
import picture from "../../../images/bottle.png";

export default function AllEvents({pub}) {
    const history = useNavigate()
    const [sortedNews, setSortedNews] = useState([])

    const sorted = [...pub.news].sort((a, b) => (b.createdAt > a.createdAt) ? 1 : -1)

    useEffect(() => {
        setSortedNews(sorted)
    }, [])

    return (
        <div>
            {sortedNews && sortedNews.map((singleNews) => (

                <div key={singleNews}>
                    {singleNews.category === 'events' ? (
                        <div className='news_title' onClick={() => {
                            history.push(`/news/events/${pub._id}/${singleNews._id}`)
                        }}>

                            <div className='center news-wrapper'>
                                <div className='news-img'>
                                    <img src={picture} alt=""/>
                                </div>

                                <div className='news-title center hover'>
                                    {singleNews.title}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div/>
                    )}
                </div>
            ))}
        </div>
    )
}

