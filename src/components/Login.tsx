import React from 'react'
import styled from 'styled-components';
import {Button} from '@material-ui/core';
import {auth,provider} from '../firebase';

function Login() {
    function signIn(e:any){
        e.preventDefault();
        auth.signInWithPopup(provider).catch(err=>alert(err.message));
    }
    return (
        <LoginContainer>
            <LoginInnerContainer>
                <img src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" alt="" />
                <Button type='submit' onClick={signIn}>
                    Signin with Google
                </Button>
            </LoginInnerContainer>
        </LoginContainer>
    )
}

export default Login;

const LoginContainer=styled.div`
    background-color: #f8f8f8;
    height:100vh;
    display:grid;
    place-items: center;
`;
const LoginInnerContainer = styled.div`
    padding:100px;
    text-align:center;
    background-color: white;
    border-radius:10px;
    
    display:flex;
    align-items:center;
>img{
        object-fit:contain;
        height:100px;
        margin-bottom:40px;
        margin-left:100px;
    }

    >button{
        /* margin-top:50px; */
        text-transform: inherit !important;
        background-color: #0a8d48 !important;
        color:white;
    }
`;
