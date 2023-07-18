import * as React from "react";

export default function Pub({pub, setCurrentId}) {

    return (
        <div>
            <div className='d-flex j-content-around user-tr' onClick={() => setCurrentId(pub._id)}>
                <div className='w-20 tr-text'>{pub.name}</div>
                <div className='w-30 tr-text'>{pub._id}</div>
                <div className='w-30 tr-text'>{pub.address}</div>
                <div className='w-10 tr-text'>{pub.order}</div>
            </div>
        </div>
    )
}
