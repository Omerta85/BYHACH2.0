export default function ModerationPub({pub, setCurrentId}) {

    return (
        <div>
            <div className='d-flex j-content-around user-tr' onClick={() => setCurrentId(pub._id)}>
                <div className='w-10 center-vertical tr-text'>{pub.name}</div>
                <div className='w-20 center-vertical tr-text'>{pub.address}</div>
                <div className='w-10 center-vertical tr-text'>{pub.contact}</div>
                <div className='w-10 center-vertical tr-text'>{pub.order}</div>
                <div className='w-30 center-vertical d-inline tr-text'>{pub.description}</div>
                <div className='w-10 center-vertical tr-text'>{pub.schedule}</div>
                <div className='w-10 center-vertical'>
                <img src={pub.avatar} alt='avatar' height='70px'/>
                </div>
            </div>
        </div>
    )
}
