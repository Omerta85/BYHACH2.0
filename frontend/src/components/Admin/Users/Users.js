import {useDispatch, useSelector} from "react-redux";
import User from "./User";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {getUsersByAdmin, getUsersBySearch} from "../../../actions/admin";

export default function Users({setCurrentId}) {

    const [search, setSearch] = useState('')

    const dispatch = useDispatch()
    const {users} = useSelector((state) => state.users)
    const [sortedUsers, setSortedUsers] = useState([])
    console.log(users)

    useEffect(() => {
        setSortedUsers(users)
    }, [users])

    if (!users.length) return 'No users'


    const searchUser = () => {
        if (search.trim()) {
            dispatch(getUsersBySearch({search}))
            // history.push(`/root/search?searchQuery=${search || 'none'}`)
        } else {
            dispatch(getUsersByAdmin(1))
            // history.push('/root')
        }
    }


    return (

        <div className='w-65'>
            <div>
                <div className='d-flex pl-15'>
                    <div className='search-input'>
                        <input
                            type='text'
                            placeholder='Пошук користувачів...'
                            onChange={({target: {value}}) => setSearch(value)}
                        />
                    </div>
                    <FontAwesomeIcon icon={faSearch} className='ml-20 icon' onClick={searchUser}/>
                </div>

                <div className='table-wrapper h-670'>
                    <div className='d-flex j-content-around w-100 header-table'>
                        <div className='w-20 tr-text'>NAME</div>
                        <div className='w-20 tr-text'>BORN YEAR</div>
                        <div className='w-30 tr-text'>EMAIL</div>
                        <div className='w-30 tr-text'>CREATED AT</div>
                    </div>
                    {sortedUsers.map((user) => (
                        <div key={user._id}>
                            <User user={user} setCurrentId={setCurrentId}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
