import styled from 'styled-components'
import logo from '../assets/popLogo.jpg'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../utils/APIRoutes'
import meme from '../assets/popmeme.gif'
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
    const [values, setValues] = useState({ username: "", password: "" });
    const [memeState, setMemeState] = useState(false);

    const changeHandler = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const changeMeme = () => {
        if (memeState) return;
        setMemeState(true);
    }

    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate("/");
        }
    }, [navigate]);

    const handleValidation = () => {
        const { username, password } = values;
        if (!username || !password) {
            toast.error('All fields are required!', toasterCustom);
            return false;
        }
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { username, password } = values;
            const { data } = await axios.post(login, { username, password });

            if (!data.status) {
                toast.error(data.msg, toasterCustom);
            } else {
                localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.user));
                toast.success("Successfully logged in");
            }
        }
    }

    return (
        <>
            <LoginWrapper>
                <div className='wholeWrapper'>
                    <MemeWrapper memeState={memeState}>
                        {memeState ? <img src={meme} alt='Meme1' /> : null}
                        {memeState ? <img src={meme} alt='Meme2' /> : <img src={logo} alt='Logo' />}
                        {memeState ? <img src={meme} alt='Meme3' /> : null}
                    </MemeWrapper>
                    <div className='top'>
                        <form onSubmit={handleSubmit}>
                            <input
                                name='username'
                                type='text'
                                placeholder='Username'
                                onChange={changeHandler}
                                onFocus={changeMeme}
                            />
                            <input
                                name="password"
                                type='password'
                                placeholder='Password'
                                maxLength="13"
                                onChange={changeHandler}
                                onFocus={changeMeme}
                            />
                            <button type='submit'>Login</button>
                            <span><Link to='/register'>Register now</Link></span>
                        </form>
                    </div>
                </div>
            </LoginWrapper>
            <ToastContainer />
        </>
    );
}

// Styled-component with dynamic justify-content
const MemeWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: ${props => (props.memeState ? 'space-between' : 'center')};
    img {
        height: 200px;
        width: 200px;
    }
`;

const LoginWrapper = styled.div`
    .wholeWrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        width: 100vw;
    }

    .top {
        form {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            gap: 1rem;
        }
    }
`;

export default Login;
