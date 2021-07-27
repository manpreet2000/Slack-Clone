import React, { useState } from 'react'
import styled from 'styled-components';
import {Button} from '@material-ui/core';
import {auth, db} from "../firebase";
import firebase from 'firebase';
import {useAuthState} from "react-firebase-hooks/auth";
interface props{
    roomId:string,
    channelName:string
};

function ChatInput({roomId,channelName}:props) {
    const [input,setInput]=useState("");
    const [user]=useAuthState(auth);
    // @ts-ignore
    function sendMEssage(e){
        e.preventDefault();
        if(!roomId){
            return false;
        }
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            // @ts-ignore
            user:user.displayName,
            // @ts-ignore
            userImage:user.photoURL
        });

        setInput("");
    }
    return (
        <ChatInputContainer>
            <form>
                <input value={input} onChange={e=>setInput(e.target.value)} placeholder={`message # ${channelName}`} />
                <Button hidden type='submit' onClick={sendMEssage}>SEND</Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput;

const ChatInputContainer=styled.div`
    border-radius:20px;
    > form{
        position:relative;
        display:flex;
        justify-content: center;
    }

    > form > input{
        position:fixed;
        bottom:30px;
        width:60%;
        border:1px solid gray;
        border-radius: 3px;
        padding:20px;
        outline:none;
    }
    > form >button{
        display:none !important;
    }
`;
function userAuthState(auth: any): [any] {
    throw new Error('Function not implemented.');
}

