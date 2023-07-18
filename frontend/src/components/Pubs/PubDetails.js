import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {useNavigate, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAllSortedPubs, getPub, newNews, newReview} from "../../actions/pubs";
import CardMedia from "@mui/material/CardMedia";
import * as React from "react";
import moment from 'moment'
import {Rating} from "@material-ui/lab";
import ReviewCard from "./ReviewCard";
import Loading from "../Loading/Loading";
import PubNews from "../News/PubNews";
import {
    faClock,
    faGlassCheers,
    faMapMarkerAlt,
    faPhoneAlt,
    faWallet
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export default function PubDetails() {
    const {pub, pubs} = useSelector((state) => state.pubs)

    const dispatch = useDispatch()
    const history = useNavigate()
    const {pub_id} = useParams()
    const query = useQuery()
    const page = query.get('page') || 1

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [newsText, setNewsText] = useState('')
    const [newsTitle, setNewsTitle] = useState('')

    const [news, setNews] = useState('')
    const [avatar, setAvatar] = useState()

    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        const query = `?page=${page}`

        dispatch(getPub(pub_id))
        dispatch(getAllSortedPubs(query))
    }, [pub_id])

    if (!pub) return <Loading/>

    const slicedPubs = pubs.data.slice(-6)

    const recommendedPubs = pubs.data ? slicedPubs.filter(({_id}) => _id !== pub._id) : null

    const openPub = (_id) => history.push(`/pubs/${_id}`)

    const splitedTags = pub.tags.map((t) => t.split(','))
    const hashedTags = splitedTags.map(tag => tag.map(t => `#${t} `))

    const options = {
        size: 'large',
        value: pub.ratings,
        readOnly: true,
        precision: 0.5,
    };

    const handleSubmitReviews = (e) => {
        e.preventDefault()

        dispatch(newReview(rating, comment, pub._id, user._id, user.name))
    }

    const handleSubmitNews = (e) => {
        e.preventDefault()

        const formData = new FormData()
        const fileField = document.querySelector('input[type="file"]')
        const textField = document.querySelector('textarea[name="news_text"]')
        const titleField = document.querySelector('input[name="news_title"]')
        const selectField = document.querySelector('select[name="news_select"]')

        formData.append('news_text', textField.value)
        formData.append('news_select', selectField.value)
        formData.append('news_title', titleField.value)
        formData.append('avatar', fileField.files[0])

        dispatch(newNews(formData, pub._id, user._id))
    }

    const handleAlcogolic = () => {
        history.push('/alco')
        localStorage.setItem('pubname', JSON.stringify(pub.name));
    }

    return (
        <div className='paginate w-90 center-box'>
            <div>
                <div className='d-flex jc p-30'>
                    <div className='m-details'>
                        <h2 className='ta-left'>{pub.name}</h2>
                        <h6>{moment(pub.createdAt).fromNow()}</h6>
                        <p>{hashedTags}</p>
                        <Rating {...options}/>
                        <h5 className='text-justify'>{pub.description}</h5>
                        <div className='d-flex info-wrapper jc-sa mb-40'>
                            <div>
                                <div className='d-flex info-item'>
                                    <FontAwesomeIcon icon={faMapMarkerAlt}/>
                                    <p>{pub.address}</p>
                                </div>
                                <div className='d-flex info-item'>
                                    <FontAwesomeIcon icon={faWallet}/>
                                    <p>{pub.order}</p>
                                </div>
                            </div>
                            <div>
                                <div className='d-flex info-item'>
                                    <FontAwesomeIcon icon={faPhoneAlt}/>
                                    <p>{pub.contact}</p>
                                </div>
                                <div className='d-flex info-item'>
                                    <FontAwesomeIcon icon={faClock}/>
                                    <p>{pub.schedule}</p>
                                </div>
                            </div>
                        </div>
                        <button className='btn-create' onClick={handleAlcogolic}>Бухач<FontAwesomeIcon
                            icon={faGlassCheers}/></button>

                        <h5 className='mt-50'>Залишити відгук</h5>

                        <div>
                            <div>
                                <Rating
                                    onChange={(e) => setRating(e.target.value)}
                                    value={rating}
                                    size="large"
                                />
                            </div>

                            <textarea
                                className="submitTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button className='btn-create' onClick={handleSubmitReviews}>Відправити</button>
                        </div>
                    </div>

                    <div>
                        <CardMedia
                            component="img"
                            height="380"
                            className='icon-details'
                            image={pub.avatar}
                            alt={pub.name}/>
                    </div>

                </div>

                <div>
                    {user && user.role === 'admin' ? (
                        <div className='d-flex center-box mb-40'>
                            <div className='m-10 news_area'>
                                <h5>Новини</h5>

                                <form>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder='Put title'
                                            name='news_title'
                                            value={newsTitle}
                                            onChange={({target: {value}}) => setNewsTitle(value)}
                                        />

                                        <textarea
                                            name='news_text'
                                            className="submitTextArea"
                                            cols="30"
                                            rows="5"
                                            value={newsText}
                                            onChange={({target: {value}}) => setNewsText(value)}/>
                                    </div>

                                    <div className='center-box'>
                                        <select
                                            name='news_select'
                                            className='select-nav  w-select1'
                                            onChange={({target: {value}}) => setNews(value)}
                                            defaultValue='news'>

                                            <option value="news">News</option>
                                            <option value="shares">Shares</option>
                                            <option value="events">Events</option>
                                        </select>
                                    </div>

                                    <input
                                        type="file"
                                        value={avatar}
                                        onChange={({target: {value}}) => setAvatar(value)}
                                    />

                                    <button
                                        className='btn-create'
                                        onClick={handleSubmitNews}>
                                        Відправити
                                    </button>

                                </form>
                            </div>

                        </div>
                    ) : (<div/>)}
                </div>

                <div className='d-flex center-box'>

                    <div className='w-45 review-wrapper'>
                        <h5>Відгуки</h5>
                        <div className='mt-10'>
                            {pub.reviews &&
                            pub.reviews.map((review) => (
                                <div key={review._id}>
                                    <ReviewCard review={review}/>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='w-45 review-wrapper'>
                        <h5>Новини</h5>
                        <PubNews pub={pub}/>
                    </div>
                </div>

            </div>
            {recommendedPubs && !!recommendedPubs.length && (
                <div>
                    <h5 className='ml-20'>You might also like: (Бухачки рекомендують)</h5>
                    <div className='paginate d-flex bp jc-se'>
                        {recommendedPubs.map(({name, address, order, rating, avatar, _id}) => (
                            <div className='recomended' key={_id}>
                                <div onClick={() => openPub(_id)} key={_id}>
                                    <CardMedia
                                        component="img"
                                        height="150"
                                        className='icon-details'
                                        image={avatar}
                                        alt={name}
                                    />
                                </div>
                                <div>
                                    <div className='h-45'><b className='ml-10 mb-7'>{name}</b></div>
                                    <p className='h-45 m-0 ml-10 mb-7'>{address}</p>
                                    <p className='m-0 ml-10'>Сер. чек: {order}</p>
                                    <div className='like-recomended'>
                                        <div>
                                            <Rating size="large" value={rating} readOnly/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
