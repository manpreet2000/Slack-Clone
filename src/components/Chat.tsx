import React from 'react'
import styled from 'styled-components';
import {StarBorderOutlined, InfoOutlined} from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';

function Chat() {
    const roomId=useSelector(selectRoomId);
    const [roomDetails] = useDocument(
        roomId && db.collection('rooms').doc(roomId)
    )
    const [roomMessages] = useCollection(
        roomId && 
        db.collection("rooms").doc(roomId).collection("messages").
        orderBy("timestamp","asc")
    )
    return (
        <ChatContainer >
            <Header>
                <HeaderLeft>
                    {/* @ts-ignore */}
                    <h4><strong>#{roomDetails?.data().name}</strong></h4>
                    <StarBorderOutlined />
                </HeaderLeft>
                <HeaderRight>
                <p>
                    <InfoOutlined /> Details
                </p>
                </HeaderRight>
            </Header>

            <ChatMessages>
                {roomMessages?.docs.map((doc)=>{
                    const {message,timestamp,user,userImage}=doc.data();
                    return (
                        <Message 
                            key={doc.id}
                            message={message}
                            timestamp={timestamp}
                            user={user}
                            userImage={userImage}
                        />
                    )
                })}
            </ChatMessages>
            <ChatInput 
            roomId={roomId}
            // @ts-ignore
            channelName={roomDetails?.data().name}
            />
        </ChatContainer>
    )
}

export default Chat;
const ChatMessages=styled.div``;
const Header=styled.div`
    display:flex;
    justify-content: space-between;
    padding:20px;
    border-bottom: 1px solid lightgray;
`;
const HeaderLeft=styled.div`
    display:flex;
    align-items:center;
    >h4{
        display:flex;
        text-transform:lowercase;
        margin-right:10px;
    }
    >h4 > .MuiSvgIcon-root{
        margin-left:10px;
        font-size:18px;
    }
`;
const HeaderRight=styled.div`
    >p{
        display:flex;
        align-items:center;
        font-size:14px;
    }
    >p > .MuiSvgIcon-root{
        margin-right:5px !important;
        font-size:16px;
    }
`;


const ChatContainer=styled.div`
flex:0.7;
flex-grow:1;
overflow-y:scroll;
margin-top:60px;
>h1 {
    color:black;
}
`;
