import {useNavigate} from "react-router-dom";
import '../newsPage.css'
import {useEffect, useState} from "react";
import picture from '../../../images/bottle.png'

export default function AllNews({pub}) {
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
                    {singleNews.category === 'news' ? (
                        <div>
                            <div onClick={() => {
                                history.push(`/news/news/${pub._id}/${singleNews._id}`)
                            }}>
                                <div className='center news-wrapper'>
                                    <div className='news-img'>
                                        <img src={picture} alt="news-img"/>
                                    </div>

                                    <div className='news-title center hover'>
                                        {singleNews.title}
                                    </div>
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
