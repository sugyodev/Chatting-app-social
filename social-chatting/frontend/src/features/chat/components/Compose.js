import axios from 'axios'
import React, {useState} from 'react'
import styled from 'styled-components'
import REACT_APP_API_URL from '../../../testurl'
import {useDispatch, useSelector} from 'react-redux'
import {hideLoader, showLoader} from '../../../store'
import alert from '../../../store/alert/actions'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";


export default function Compose() {
    const [formData, setFormData] = useState({
        email: '',
        recipient: '',
        title: '',
        body: '',
    })
    const dispatch = useDispatch()

    const {recipient, title, body} = formData

    const changeFormData = e => setFormData({...formData, [e.target.name]: e.target.value})

    const auth = useSelector(state => state.auth)
    const sendMessage = e => {
        e.preventDefault();
        dispatch(showLoader());

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };
        const user = auth.user.email;
        const data = JSON.stringify({user, recipient, title, body});
        axios.post(`${REACT_APP_API_URL}/api/chats/`, data, config)
            .then((response) => {
                dispatch(hideLoader())
                dispatch(alert('Message Sent', 'success'));
                setFormData({
                    email: '',
                    recipient: '',
                    title: '',
                    body: '',
                })
            }).catch(() => {
            dispatch(hideLoader());
            dispatch(alert('Failed to Send Message', 'danger'));
        })
    }

    return (
        <>
            <ComposeFormWrap>
                <ComposeForm onSubmit={sendMessage} className="compose-form">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField label="Title" placeholder="Title" name="title" variant="outlined"
                                       onChange={changeFormData}
                                       value={title}
                                       fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Email" placeholder="Email" name="recipient" variant="outlined"
                                       onChange={changeFormData}
                                       value={recipient}
                                       fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Your Body"
                                multiline
                                minRows={6}
                                fullWidth
                                onChange={changeFormData} value={body} name="body"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" sx={{float: 'right'}}>Send</Button>
                        </Grid>
                    </Grid>
                </ComposeForm>
            </ComposeFormWrap>
        </>
    )
}


const ComposeFormWrap = styled.div`
    width: 95%;
    margin: 30px 0px;
`

const ComposeForm = styled.form`
`
