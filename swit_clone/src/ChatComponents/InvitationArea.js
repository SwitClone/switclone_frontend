import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InvitationArea(props){
    const [ChannelList, setChannelList] = useState({});

    const getChannels = async() => {
        await axios.get("http://localhost:8080/api/channel",{
            params:{
                channelId : props.currentChannelIndex
            }
        }
        ).then(response => {
            setChannelList(response.data.channel);
            
        })
    }

    useEffect(()=>{
        getChannels();
    },[props.currentChannelIndex]);
    return(
        <div className= "invite_area">
            <div className= "chatting_room_member">
                @{props.username}
            </div>

            <div className = "invite_text">
                has entered
            </div>

            <div className = "chatting_room_name">
                {ChannelList.name}
            </div>                            
        </div>
    );
}

export default InvitationArea;