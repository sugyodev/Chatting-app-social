import React, {useState} from 'react'
import signup from '../../../assets/img/signup.png'
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
import { hideLoader, showLoader } from '../../../store/loader/actions';
import axios from 'axios'
import alert from '../../../store/alert/actions';
import REACT_APP_API_URL from '../../../testurl'
import { useHistory } from 'react-router';

export default function Signup() {
    const [formData, setformData] = useState({
        email: '',
        password: '',
        re_password: '',
    })
    const dispatch = useDispatch()
    const {email, password, re_password} = formData
    const changeFormData = e => setformData({...formData, [e.target.name]: e.target.value})
    const history =  useHistory()
    const onSubmit = async (e) => {
        e.preventDefault()

        dispatch(showLoader())
        if(password===re_password){
            if(password.length < 8){
                dispatch(hideLoader())
                dispatch(alert('Password Sould Be Minimum 8 Charecters Long', 'danger'))
                return ''
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }; 
            const body = JSON.stringify({email, password, re_password}) 
            await axios.post(`${REACT_APP_API_URL}/auth/users/`, body, config)
            .then((response) => {
                if(response.status == 201){
                    dispatch(hideLoader())
                    dispatch(alert('Successfully Created An Account', 'success', 90000))
                    history.push('/login/')
                }
                
            }).catch((error) => {
                dispatch(hideLoader())
                for (let [key, value] of Object.entries(error.response.data)) {
                    dispatch(alert(`${value}`, 'danger'))
                }
            })
        } else{
            dispatch(hideLoader())
            dispatch(alert('Passwords does not match. Please make sure that both the passwords are same', 'danger'))
        }
    }
    
    return (
        <>
           <FormCont className='formContent'>
                <FormWrap className="loginForm">
                    <FormHeading className="colorGray">Create An Account</FormHeading>
                    <Form onSubmit={onSubmit}>
                        <InputDiv>
                            <Input onChange={changeFormData} name="email" type="email" placeholder="Email"/>
                        </InputDiv>
                        <InputDiv>
                            <Input  onChange={changeFormData}  name="password" type="password" placeholder="Password"/>
                        </InputDiv>
                        <InputDiv>
                            <Input  onChange={changeFormData}  name="re_password" type="password" placeholder="Confirm Password"/>
                        </InputDiv>
                        
                        <TextBox>
                            <Text className="fontsizeAdj">Already Created An Account? <NewLink to="/login/" className="colorRed">Login</NewLink> </Text>
                        </TextBox>
                        <div className='btn-submit'>
                            <SubmitBtn type="submit" className="customGrey">Signup</SubmitBtn>
                        </div>
                    </Form>
                </FormWrap>    
            </FormCont>


        </>
    )
}


