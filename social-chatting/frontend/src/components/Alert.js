import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {removeAlert} from '../store/alert/actions'
import styled from 'styled-components'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Flex} from "../globalStyles";

export const AlertContainer = styled.div`
    position: fixed;    
     ${Flex}
    top: 30px;
    left: 0;
    right: 0;
    min-width: 55vw;
    margin: auto;
    max-width: fit-content;
    flex-direction: column;
    z-index: 1000000;
`

export default function Alerts() {
    const alerts = useSelector(state => state.alerts);
    const dispatch = useDispatch();
    return (
        <>
            <AlertContainer>
                {
                    alerts.map(({message, alertType, id}) => {
                        return (
                            <Alert
                                key={id}
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => dispatch(removeAlert(id))}
                                    >
                                        <CloseIcon fontSize="inherit"/>
                                    </IconButton>
                                }
                                severity={alertType === 'danger' ? 'error' : alertType}
                                sx={{mb: 2}}
                            >
                                {message}
                            </Alert>
                        )
                    })
                }


            </AlertContainer>

        </>
    )
}
