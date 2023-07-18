export default function User({user, setCurrentId}) {

    return (
        <div>
            <div className='d-flex j-content-around user-tr' onClick={() => setCurrentId(user._id)}>
                <div className='w-20 tr-text'>{user.name}</div>
                <div className='w-20 tr-text'>{user.born_year}</div>
                <div className='w-30 tr-text'>{user.email}</div>
                <div className='w-30 tr-text'>{user.createdAt}</div>
            </div>
        </div>
    )
}
