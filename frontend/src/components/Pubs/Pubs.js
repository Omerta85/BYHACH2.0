import Pub from './Pub'
import 'animate.css/animate.css';
import Loading from "../Loading/Loading";

export default function Pubs({setCurrentId, pubs}) {

    if (pubs && !pubs.length) return <Loading/>

    return (
        <div>
            <div className='align-center center-box w-100'>
                {pubs?.map((pub) => (
                    <div key={pub._id} className='center-boxes mb-40 animate__animated animate__zoomIn'>
                        <Pub pub={pub} setCurrentId={setCurrentId} />
                    </div>
                ))}
            </div>
        </div>
    )
}
