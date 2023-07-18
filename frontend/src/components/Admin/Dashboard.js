import Sidebar from "./Sidebar";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllPubs} from "../../actions/pubs";
import {getAllUsers} from "../../actions/users";
import {Link} from "react-router-dom";

export default function Dashboard() {
    const dispatch = useDispatch()

    const {data} = useSelector((state) => state.pubs.pubs)
    const {users} = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(getAllPubs())
        dispatch(getAllUsers())
    }, [dispatch])

    const notActivatedPubs = data ? data.filter((pub) => pub.isActivated === false) : null

    return (
        <div className='d-flex center-box w-90'>
            <div className='w-20'>
                <Sidebar/>
            </div>

            <div className="center w-80">
                <div className="d-flex text j-content-around">
                    <Link to="/root/pubs">
                        <div className='pubs-dashboard'>
                            <div className='center-circle'>
                                <p>Всі заклади</p>
                                <p>{data && data.length}</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="/root/activate">
                        <div className='pubs-dashboard not_active-dashboard'>
                            <div className='center-circle'>
                                <p>Не перевірені заклади</p>
                                <p>{notActivatedPubs && notActivatedPubs.length}</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/root/users">
                        <div className='pubs-dashboard users-dashboard'>
                            <div className='center-circle'>
                                <p>Користувачі</p>
                                <p>{users && users.length}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
