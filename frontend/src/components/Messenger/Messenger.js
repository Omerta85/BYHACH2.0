import { ChatEngine } from 'react-chat-engine';
import ChatFeed from "./ChatFeed";

export default function Messenger(){

    const projectID = '2bc5e43b-b4f6-41a7-8f75-5b656b3d3c04';

    return(
        <div className='w-90 center-box'>
            <ChatEngine
                height="100vh"
                // userName={localStorage.getItem('username')}
                // userSecret={localStorage.getItem('password')}
                userName='Omerta666'
                userSecret='SamsungM31'
                projectID={projectID}
                renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
                onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
            />
        </div>
    )
}
