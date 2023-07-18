import {Link} from "react-router-dom";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import DoneIcon from "@material-ui/icons/Done";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import './dashboard.css'

export default function Sidebar() {

    return (
        <div className="sidebar ">
            <h6>Admin panel</h6>

            <Link to="/root">
                <p>
                    <span>
                        <DashboardIcon/> Dashboard
                    </span>
                </p>
            </Link>
            <Link to="/root/activate">
                <p>
                    <span>
                        <DoneIcon/> Модерація
                    </span>
                </p>
            </Link>
            <Link to='/root/pubs'>
                <p>
                    <span>
                        <ListAltIcon/> Заклади
                    </span>
                </p>
            </Link>
            <Link to="/root/users">
                <p>
                    <span>
                        <PeopleIcon/> Користувачі
                    </span>
                </p>
            </Link>
            <Link to="/root/news">
                <p>
                    <span>
                        <AnnouncementIcon/> Новини
                    </span>
                </p>
            </Link>
            <Link to="/root/reviews">
                <p>
                    <span>
                        <RateReviewIcon/> Відгуки
                    </span>
                </p>
            </Link>
        </div>
    )
}
