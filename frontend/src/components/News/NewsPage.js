import './newsPage.css'
import photo2 from '../../images/adult-boy-businessman-facial-hair.jpg'
import photo3 from '../../images/images.jpg'
import photo4 from '../../images/newFile-3.jpg'
import photo from '../../images/51_main.jpeg'
import photo5 from '../../images/23910051.jpg'
import photo6 from '../../images/admin.jpg'
import {getAllUsers} from "../../actions/users";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import UsersCard from "./UsersCard";
import {Link} from "react-router-dom";

export default function NewsPage() {
    const dispatch = useDispatch()

    const {users} = useSelector((state) => state.users)

    const newArrayUsers = users.slice(-4)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])


    return (
        <div className='w-90 center-box'>
            <div className='d-flex center-box j-content-around w-100'>

                <div className='w-30'>
                    <Link to={'/news/shares'}>
                        <div className='w-100 mb-40 card'>
                            <img src={photo3} alt="news" className='responsive'/>

                            <div className='p-10'>
                                <h4 className='text-card'>Акції</h4>
                                <p>Акції закладів, а також великі знижки для великої компанії! </p>
                            </div>
                        </div>
                    </Link>

                    <div className='w-100 card mt-62'>
                        <img src={photo} alt="news" className='responsive'/>
                        <div className='p-10'>
                            <h4 className='text-card'>Карантинні заходи і воєнного стану</h4>
                            <p>Шановні бухачі, ознайомтесь з правилами роботи закладів під час карантинуі воєнного стану,
                                обмеженнями у певних карантинних і близьких до фронту зонах та інше.</p>
                        </div>
                    </div>
                </div>

                <div className='w-30'>
                    <div className='w-100 main-card mb-40 card'>
                        <div className='p-10'>
                            <div className='d-flex j-content-between'>
                                <h3 className='text-card'>Новини</h3>
                                <div>
                                    <img src={photo5} alt="news" className='responsive mw-200'/>
                                </div>
                            </div>
                            <p>Тут ви дізнаєтесь всі актуальні новини, акції і події наших закладів.</p>
                        </div>
                    </div>

                    <Link to={'/news/news'}>
                        <div className='w-100 card'>
                            <img src={photo2} alt="news" className='responsive'/>
                            <div className='p-10'>
                                <h4 className='text-card'>Загальні новини</h4>
                                <p> Останні новини закладів.</p>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className='w-30'>
                    <Link to={'/news/events'}>
                        <div className='w-100 mb-40 card'>
                            <img src={photo4} alt="news" className='responsive'/>

                            <div className='p-10'>
                                <h4 className='text-card'>Події</h4>
                                <p>Будьте в курсі усіх подій, не пропустіть жодної.</p>
                            </div>
                        </div>
                    </Link>

                    <div className='w-100 card mt-62'>
                        <img src={photo6} alt="news" className='responsive'/>
                        <div className='p-10'>
                            <h4 className='text-card'>Попередження!</h4>
                            <p>Адміністрація застерігає Вас бути обережними і не зустрічатися з незнайомими людьми
                                в небезпечних чи невідомих Вам місцях!</p>
                        </div>

                    </div>
                </div>
            </div>


            <div className='text-news center mt-30'>
                Нові пиячки, які приєднались до нашої спільноти
            </div>

            <div className='d-flex j-content-around mt-30'>
                {newArrayUsers.map((user) => (
                    <div key={user._id} className='w-100 center'>
                        <UsersCard user={user}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
