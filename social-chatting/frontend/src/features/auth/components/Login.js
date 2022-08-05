import React, {useState} from 'react'
import LoginImg from '../../../assets/img/login.svg'
import Switch from "react-switch";
import {
    FormWrap, 
    FormPictureWrap, 
    FromImg, 
    FormHeading,
    Form,
    InputDiv,
    Input,
    Label,
    SubmitBtn,
    FormCont,
    NewLink,
    Text,
    TextBox,
} from './Account.styles'

import { useDispatch } from 'react-redux';
import { hideLoader, showLoader, login } from '../../../store';
import axios from 'axios'
import alert from '../../../store/alert/actions';
import REACT_APP_API_URL from '../../../testurl'


export default function Login() {
    const [formData, setformData] = useState({
        email: '',
        password: '',
    })
    const [checked, setchecked] = useState(false)
    const dispatch = useDispatch()
    const {email, password} = formData
    const changeFormData = e => setformData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async (e) => {
        e.preventDefault()
        dispatch(login(email, password, checked))
    }
    
    return (
        <>
            <FormCont className='formContent'>
                <FormWrap className="loginForm">
                    <FormHeading className="colorGray">LogIn To Your Account</FormHeading>
                    <Form onSubmit={onSubmit}>
                        <InputDiv>
                            <Input name="email" onChange={changeFormData} type="email" placeholder="Email"/>
                        </InputDiv>
                        <InputDiv>
                            <Input name="password" onChange={changeFormData} type="password" placeholder="Password"/>
                        </InputDiv>
                        <div className='btn-submit'>
                            <SubmitBtn type="submit" className="customGrey">Login</SubmitBtn>
                            <TextBox className='para-acc'>
                                <Text className="fontsizeAdj">Don't have Account? <NewLink to="/signup/" className="colorRed">Create Account</NewLink> </Text>
                            </TextBox>
                        </div>

                    </Form>
                </FormWrap>
                    
            </FormCont>

        </>
    )
}
