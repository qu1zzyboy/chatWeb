import styled from 'styled-components'
import logo from '../assets/loginLogo.jpg'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../utils/APIRoutes'
import meme from '../assets/buyinmeme.gif'
import axios from 'axios'
const Login = () => {
    const navigate = useNavigate();
    const toasterCustom = {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
    }
    const [values, setValues] = useState({
        username: "",
        password: "",
    })

    const [memeState, setMemeState] = useState(false)
    const changeHandler = (event) => {

        setValues({ ...values, [event.target.name]: event.target.value })

    }
    const changeMeme = () => {
        if (memeState) return;
        setMemeState(true);
    }
    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            console.log(process.env.REACT_APP_LOCALHOST_KEY)
            navigate("/");
        }
    }, [])
    const handleValidation = () => {

        const { username, password } = values
        if (!username) {
            toast.error('Username is required!', toasterCustom);
            return false;
        } else if (!password) {
            toast.error('Password is required!', toasterCustom);
            return false;
        }

        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { username, password } = values;
            const { data } = await axios.post(login, {
                username,
                password,
            })
            console.log(data)
            if (data.status === false) {
                toast.error(data.msg, toasterCustom)
            }
            if (data.status === true) {

                localStorage.setItem(
                    process.env.REACT_APP_LOCALHOST_KEY,
                    JSON.stringify(data.user)
                )
                toast.success("Successfully Login")
            }
        }
    }

    return (
        <>
            <LoginWrapper>
                <div className='wholeWrapper'>
                    <MemeWrapper memeState={memeState}>

                        {memeState ? <img src={meme} alt='Daoli' /> : null}
                        {memeState ? <img src={meme} alt='Daoli' /> : <img src={logo} alt='Logo' />}
                        {memeState ? <img src={meme} alt='Daoli' /> : null}

                    </MemeWrapper>
                    <div className='top'>
                        {memeState ? <img src={meme} alt='Daoli' /> : null}
                        <form onSubmit={(event) => handleSubmit(event)}>
                            <input
                                name='username'
                                type='text'
                                placeholder='Username'
                                onChange={(event) => changeHandler(event)}
                                onFocus={(event) => changeMeme()}
                            />
                            <input
                                name="password"
                                type='password'
                                placeholder='Password'
                                maxLength="13"
                                onChange={(event) => changeHandler(event)}
                                onFocus={(event) => changeMeme()}
                            />
                            <button type='submit'>
                                Login
                            </button>
                            <span><Link to="/register">Register now</Link></span>
                        </form>
                        {memeState ? <img src={meme} alt='Daoli' /> : null}
                    </div>
                    <div className='gradient_text'>
                        {memeState ? <h1>
                            Sell your real estate and all in crypto,NOW!
                        </h1> : null}

                    </div>
                </div>
            </LoginWrapper>
            <ToastContainer />
        </>
    )

}
const LoginWrapper = styled.div`

.wholeWrapper{
    display:flex;
    flex-direction:column;
    
    align-items: center;
    height: 100vh;
    width: 100vw;

}
.top{
    display:flex;
    img {
        height: 200px;
        width: 200px;
        margin: 20px 20px;
    }
    form{
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: space-around;
    gap:1rem;
    border-radius:2rem;
    padding:3rem 5rem;
    background-color: brown;
    border:solid;
    input{
        background-color: transparent;
        padding:1rem;
        font-size: large;
        border-radius: 0.5rem;
        outline: none;
        width:100%;
        &:focus{
        border:0.1rem solid;
        outline:none;
        }
    }
    button{
        padding:1rem 3rem;
        border-radius: 1rem;
        background-color: grey;
        border:none;
        outline:none;
        cursor:pointer;
        font-size:1rem;
    &:hover{
        background-color: blue;
    }
   
    }
    span{
        color:white;
        text-transform: uppercase;
        a{
           color:black;
           font-weight: bold;
           text-decoration: none;
        }
    }
     
}

}

.gradient_text{
    h1{
        width:100%;
    }
}

    `;
const MemeWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: ${props => (props.memeState ? 'space-between' : 'center')};
    img {
        height: 200px;
        width: 200px;
        margin: 20px 0px;
    }
`;
export default Login