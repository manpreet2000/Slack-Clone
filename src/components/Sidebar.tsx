import React from 'react'
import styled from 'styled-components';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import SidebarOption from './SidebarOption';
import { InsertComment, Inbox, Drafts, BookmarkBorder, PeopleAlt
    ,Apps, FileCopy, ExpandLess, ExpandMore, Add} from '@material-ui/icons';
import {useCollection} from 'react-firebase-hooks/firestore';
import {auth, db} from '../firebase';
import {useAuthState} from "react-firebase-hooks/auth";


function Sidebar() {
    const[channels,loading,error]=useCollection(db.collection('rooms'));
    const [user]=useAuthState(auth);
    
    return (
        <SidebarContainer>
            <SidebarHeader>
                <SidebarInfo>
                    <h2>Company</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        {user && user.displayName}
                        
                    </h3>
                </SidebarInfo>
                <CreateIcon />
            </SidebarHeader>

            <SidebarOption Icon={InsertComment} title="Threads" />
            <SidebarOption Icon={Inbox} title="mentions & reactions" />
            <SidebarOption Icon={Drafts} title="saved items" />
            <SidebarOption Icon={BookmarkBorder} title="Channel browser" />
            <SidebarOption Icon={PeopleAlt} title="People & user groups" />
            <SidebarOption Icon={Apps} title="Apps" />
            <SidebarOption Icon={FileCopy} title="File browser" />
            <SidebarOption Icon={ExpandLess} title="Show less" />
            <hr />
            <SidebarOption Icon={ExpandMore} title="channels" />
            <hr />
            <SidebarOption Icon={Add} addchannels={true} title="Add channels" />
            {channels?.docs.map(doc=>(
            <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
            ))}
        </SidebarContainer>
    )
}

export default Sidebar;

const SidebarContainer=styled.div`
    color:white;
    flex:0.3;
    border-top:1px solid #49274b;
    max-width:260px;
    margin-top:60px;
    background-color: var(--slack-color);

    >hr{
        margin-top:10px;
        margin-bottom: 10px;
        border:1px solid #49274b;
    }
`;

const SidebarHeader=styled.div`
    display:flex;
    border-bottom:1px solid #49274b;
    padding:13px;

    >.MuiSvgIcon-root{
        padding: 8px;
        color:#49274b;
        font-size: 18px;
        background-color: white;
        border-radius:100%;
    }
`;
const SidebarInfo=styled.div`
flex:1;

> h2{
    font-size:15px;
    font-weight:900;
    margin-bottom:5px;
}

>h3{
    display:flex;
    font-size:13px;
    font-weight:400;
    align-items:center;
}

>h3 > MuiSvgIcon-root{
    font-size:14px;
    margin-top:1px;
    margin-right:2px;
    color:green;
}

`;
function userAuthState(auth: any): [any] {
    throw new Error('Function not implemented.');
}

