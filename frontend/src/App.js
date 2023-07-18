import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import CreateForm from './components/Pubs/CreateForm';
import Auth from './components/Auth/Auth';
import Main from './components/Main';
import Alcogolic from "./components/Alcogolic/Alcogolic";
import UserPage from "./components/User/UserPage";
import Navbar from "./components/Navbar";
import PubDetails from "./components/Pubs/PubDetails";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import Swal from 'sweetalert2'
import PubsPage from "./components/Pubs/PubsPage";
import Moderation from "./components/Admin/Moderation/Moderation";
import News from "./components/Admin/News";
import Dashboard from "./components/Admin/Dashboard";
import Reviews from "./components/Admin/Reviews";
import UserDashboard from "./components/Admin/Users/UserDashboard";
import PubDashboard from "./components/Admin/Pubs/PubDashboard";
import NewsPage from "./components/News/NewsPage";
import Footer from "./components/Footer/Footer";
import NewsCard from "./components/News/NewsCards/NewsCard";
import SharesCard from "./components/News/SharesCards/SharesCard";
import EventsCard from "./components/News/EventsCards/EventsCard";
import Cart from "./components/Cart/Cart";
import SingleNews from "./components/News/NewsCards/SingleNews";
import AlcogolicItems from "./components/Alcogolic/AlcogolicItems";
import Messenger from "./components/Messenger/Messenger";
import MapWrapper from './components/Maps/MapWrapper'
import ErrorPage from "./components/ErrorPage";

function App() {
    const alerted = localStorage.getItem('alerted') || '';
    if (alerted !== 'yes') {
        Swal.fire({
            title: 'Вам точно 18?',
            text: "Входячи на наш сайт, ви погоджуєтесь, що вам є 18 років",
            icon: 'warning',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
        // Swal.fire({
        //     title: 'Вам є 18?',
        //     text: "Входячи на наш сайт, ви погоджуєтесь, що вам є 18 років",
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Так, мені є 18!',
        //     cancelButtonText: "Мені немає 18",
        //     showClass: {
        //         popup: 'animate__animated animate__fadeInDown'
        //     },
        //     hideClass: {
        //         popup: 'animate__animated animate__fadeOutUp'
        //     }
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         Swal.fire(
        //             'Прийнято!',
        //             'Ласкаво просимо до "Пиячка".',
        //             'success'
        //         )
        //     } else {
        //         redirect()
        //     }
        // })
.then(() => {
            Swal.fire({
                title: 'Обережно!',
                text: "Адміністрація застерігає вас бути обережними і " +
                    "не зустрічатися з незнайомими людьми в небезпечних чи невідомих вам місцях!",
                icon: 'warning',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
        })
        localStorage.setItem('alerted', 'yes')
    }

    return (
        <div>
            <Router>
                <Navbar/>
                <Routes>
                    <Route  path='/' element={<Main/>} />
                    <Route  path='/news' element={<NewsPage/>} />
                    <Route  path='/news/news' element={<NewsCard/>} />
                    <Route  path='/news/news/:pub_id/:news_id' element={<SingleNews/>} />
                    <Route  path='/news/shares' element={<SharesCard/>} />
                    <Route  path='/news/shares/:pub_id/:news_id' element={<SingleNews/>} />
                    <Route  path='/news/events' element={<EventsCard/>} />
                    <Route  path='/news/events/:pub_id/:news_id' element={<SingleNews/>} />
                    <Route  path='/create' element={<CreateForm/>} />
                    <Route  path='/login' element={<Auth/>} />
                    <Route  path='/pubs' element={<PubsPage/>} />
                    <Route  path='/pubs/earch' element={<PubsPage/>} />
                    <Route  path='/pubs/:pub_id' element={<PubDetails/>} />
                    <Route  path='/alco' element={<Alcogolic/>} />
                    <Route  path='/alco/items' element={<AlcogolicItems/>}/>
                    <Route  path='/user/cart' element={<Cart/>}/>
                    <Route  path='/user' element={<UserPage/>}/>
                    <Route  path='/root' element={<Dashboard/>}/>
                    <Route  path='/root/activate' element={<Moderation/>}/>
                    <Route  path='/root/reviews' element={<Reviews/>}/>
                    <Route  path='/root/users' element={<UserDashboard/>}/>
                    <Route  path='/root/pubs' element={<PubDashboard/>}/>
                    <Route  path='/root/news' element={<News/>}/>
                    <Route  path='/forgot' element={<ForgotPassword/>}/>
                    <Route  path='/reset/:token' element={<ResetPassword/>}/>

                    <Route  path='/xxx' element={<Messenger/>}/>
                    <Route  path='/error' element={<ErrorPage/>}/>
                    <Route  path='/map' element={<MapWrapper/>}/>
                    <Route  path='/' element={<Navigate to="/login"/>}/>
                </Routes>
                <Footer/>
            </Router>
        </div>
    )
}

export default App;
