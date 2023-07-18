import moment from "moment";

export default function UsersCard({user}){

    return(
        <div className='center w-80 user-card'>
            <div className='users-avatar center mt-22'>
                <img src={user.avatar} alt="avatar" className='img'/>
            </div>
            <div className='center'>
                <h5>
                    {user.name}
                </h5>
            </div>
            <div className='users-moment mt-22'>
                <p>Долучився до нас:</p>
                {moment(user.createdAt).fromNow()}
            </div>
        </div>
    )
}
