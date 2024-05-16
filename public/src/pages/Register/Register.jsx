import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import logo from '../../assets/logo.svg'

import { register } from "../../utils/APIRoutes"

const Register = () => {
    const navigate = useNavigate();
    const toasterCustom = {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
    }
    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            console.log(process.env.REACT_APP_LOCALHOST_KEY)
            navigate("/");
        }
    }, [])
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { email, username, password } = values;
            const { data } = await axios.post(register, {
                username,
                email,
                password,
            })

            if (data.status === false) {
                toast.error(data.msg, toasterCustom)
            }
            if (data.status === true) {
                localStorage.setItem(
                    process.env.REACT_APP_LOCALHOST_KEY,
                    JSON.stringify(data.user)
                )
                toast.success("Successfully registered")

            }
        }
    }
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const handleValidation = () => {
        const { username, password, confirmPassword, email } = values;
        if (username.length < 5) {
            toast.warn("User should be longer than 5 digits", toasterCustom)
            return false;
        }
        else if (password.length < 8) {
            toast.error("Password should be greater than 8 digits", toasterCustom)
            return false;
        } else if (password.search(/[A-Z]/) < 0) {
            toast.error("Password at least includes one capital", toasterCustom)
            return false;
        }
        else if (password.search(new RegExp(username, "gi")) >= 0) {
            toast.error("Your username cannot be included in password")
            return false
        }
        else if (password !== confirmPassword) {
            toast.error("password and confirmed password are not same", toasterCustom)
            return false
        } else if (email === "") {
            toast.error("Email cannot be null", toasterCustom)
            return false;
        }

        return true;
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className='brand'>
                        <img src={logo} alt='logo' />
                        <h1 className='gradient_text header_class'> snappy</h1>

                    </div>
                    <input
                        type='text'
                        placeholder='Username'
                        name="username"
                        onChange={(e) => handleChange(e)}
                    />

                    <input
                        type='email'
                        placeholder='Email'
                        name="email"
                        onChange={(e) => handleChange(e)} />

                    <input
                        type='password'
                        placeholder='Password'
                        name="password"
                        maxLength="13"
                        onChange={(e) => handleChange(e)} />
                    <input
                        type='password'
                        placeholder='Confirm you Password'
                        name="confirmPassword"
                        maxLength="13"
                        onChange={(e) => handleChange(e)} />
                    <button type='submit'>Register now</button>
                    <span>Already have an account?
                        <Link to="/login">Login</Link>
                    </span>
                </form >

            </FormContainer >
            <ToastContainer />
        </>


    )
}
const FormContainer = styled.div`

height: 100vh;
width: 100vw;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:1rem;

.brand{
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
    
    img{
        height:5rem;
    }
    h1{
        text-transform:uppercase
    }
}
form{
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color: #00000076;
    border-radius:2rem;
    padding:3rem 5rem;
    input{
        background-color:transparent;
        padding:1rem;
        border:0.1rem solid orange;
        border-radius:0.4rem;
        color:white;
        width:100%;
        font-size:1rem;
        outline:none;
    &:focus {
     border:0.1rem solid red;
     outline:none;
     
    }
    }
    button{
        background-color: cyan;
        padding: 1rem;
        border:none;
        font-family: var(--font-family);
        color:red;
        font-size:26px;
        font-weight:bold;
        cursor:pointer;
        text-transform:upper-case;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color:blue;

        }
    }
    span{
        color:white;
        text-transform: uppercase;
        a{
            color:red;
            font-weight:bold;
            text-decoration: none;

        }
    }


   
}

   

`;
export default Register