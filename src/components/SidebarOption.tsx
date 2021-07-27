import React from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {db} from '../firebase';
import {enterRoom} from '../features/appSlice';

interface props{
    Icon?:any | undefined,
    title:string,
    addchannels?:boolean | undefined,
    id?:string
}

const SidebarOption:React.FC<props>=({Icon,addchannels,title,id})=> {
    const dispatch= useDispatch();
    const addChannel=()=>{
        const channelName=prompt("please enter channel name");
        if(channelName){
            db.collection('rooms').add({
                name:channelName
            })
        }
    };
    const selectChannel=()=>{
        if(id){
            dispatch(enterRoom({
                roomId: id
            }))
        }
    };

    return (
        <SidebarOptionContainer
        onClick={addchannels ? addChannel : selectChannel}
        >
            {Icon && <Icon fontSize='small' style={{padding:10}}/>}
            {Icon ? (
                <h3>{title}</h3>
            ): (
                <SidebarOptionChannel>
                    <span>#</span> {title}
                </SidebarOptionChannel>
            )}
        </SidebarOptionContainer>
    )
}

export default SidebarOption

const SidebarOptionContainer=styled.div`
    display: flex;
    font-size:12px;
    align-items:center;
    padding-left:2px;
    cursor:pointer;

    :hover{
        opacity: 0.9;
        background-color:#340e36;
    }

    >h3{
        font-weight:500;
    }
    >h3 >span{
        padding:15px;
    }
`;
const SidebarOptionChannel=styled.h3`
    padding:10px 0;
    font-weight:400;
`;