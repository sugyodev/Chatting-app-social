import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import TrashIcon from '@mui/icons-material/DeleteOutlined';
import ComposeIcon from '@mui/icons-material/RateReviewOutlined';
import SentIcon from '@mui/icons-material/SendOutlined';
import {RiUserReceivedLine} from 'react-icons/ri'
import {NavLink} from "react-router-dom";


export default function MainMenu() {


    const dashLinks = [
        {to: "/", name: 'Inbox', icon: InboxIcon},
        {to: "/sent/", name: 'Sent', icon: SentIcon},
        {to: "/compose/", name: 'Compose', icon: ComposeIcon},
        {to: "/trash/", name: 'Trash', icon: TrashIcon},
    ];


    return (
        <>
            <List>
                {dashLinks.map((link) => (
                    <ListItem button key={link.name} component={NavLink}
                              to={link.to} exact>
                        <ListItemIcon>
                            <link.icon/>
                        </ListItemIcon>
                        <ListItemText primary={link.name}/>
                    </ListItem>
                ))}
            </List>

        </>
    );
}
