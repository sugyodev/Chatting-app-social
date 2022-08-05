import axios from 'axios'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {hideLoader, showLoader} from '../../../../store';
import alert from '../../../../store/alert/actions'
import REACT_APP_API_URL from '../../../../testurl'
import {Link} from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

export default function ChatTable({tableData, table = ''}) {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const moveToTrash = id => {
        dispatch(showLoader())
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };
        axios.post(`${REACT_APP_API_URL}/api/chats/${id}/trash/`, '{}', config)
            .then((response) => {
                if (response.status == 200) {
                    dispatch({type: 'RELOAD'})
                    dispatch(alert('Successfully Moved To Trash', 'success'))
                }
                dispatch(hideLoader())
            }).catch(() => {
            dispatch(hideLoader())
            dispatch(alert('Failed To Move In Trash', 'danger'))
        })
    }
    const restoreFromTrash = id => {
        dispatch(showLoader());

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };
        axios.post(`${REACT_APP_API_URL}/api/chats/${id}/rmtrash/`, '{}', config)
            .then((response) => {
                if (response.status == 200) {
                    dispatch({type: 'RELOAD'})
                    dispatch(alert('Successfully Restored from Trash', 'success'))
                }
                dispatch(hideLoader())
            }).catch(() => {
            dispatch(hideLoader())
            dispatch(alert('Failed To Restored from Trash', 'danger'))
        })
    }
    const deleteChatR = id => {
        dispatch(showLoader())

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };
        axios.delete(`${REACT_APP_API_URL}/api/chats/${id}/`, config)
            .then((response) => {
                dispatch({type: 'RELOAD'})
                dispatch(alert('Message Unsent Successfull', 'success'))

                dispatch(hideLoader())
            }).catch(() => {
            dispatch(hideLoader())
            dispatch(alert('Message Unsent Failed', 'danger'))
        })
    }
    return (
        <TableContainer component={Paper} variant="outlined" className="chat-table">
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>$</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        tableData.map((data, i) => {
                            const {title, id, user, recipient} = data;
                            return (
                                <TableRow key={id}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{title}</TableCell>
                                    <TableCell>{user}</TableCell>
                                    <TableCell>{recipient}</TableCell>
                                    <TableCell>
                                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                                            <Button
                                                onClick={() => table == 'trash' ? restoreFromTrash(id) : moveToTrash(id)}>
                                                {table == 'trash' ? 'Restore' : 'Move To Trash'}
                                            </Button>
                                           
                                            <Button component={Link} to={`/chats/${id}/`}>
                                                View
                                            </Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )

};


