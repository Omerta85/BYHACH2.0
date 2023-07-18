import photo from '../../images/sozdat-sait-vizitku.jpg'

export default function Conversation(){

    return(
        <div>
            <div className='mt-22'>
                <img src={photo} height={60}/>
                <span>Name Surname</span>
            </div>
        </div>
    )
}
