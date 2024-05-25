import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [formError, setFormError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [loginFormData, setLoginFormData] = useState({
        "email": '',
        "password": '',
    })
    const inputHandler = (event) => {
        setLoginFormData({
            ...loginFormData,
            [event.target.name]: event.target.value,
        })
        // console.log(loginFormData)
    }
    const submitHandler = (event) => {
        const formdata = new FormData();
        formdata.append('email', loginFormData.email);
        formdata.append('password', loginFormData.password);
        // console.log(formdata);
        // for (let [key, value] of formdata.entries()) {
        //     console.log(`${key}: ${value}`);
        axios.post('http://127.0.0.1:8000/customer/login/', formdata)
            .then(function (response) {
                console.log(response)
                if (response.data.bool === false) {
                    setFormError(true)
                    setErrorMsg(response.data.msg)
                } else {
                    localStorage.setItem('customer_login', true)
                    localStorage.setItem('customer_email', response.data.user)
                    setFormError(false)
                    setErrorMsg('')
                }
            })
            .catch(function (error) {
                console.log(error)
            })
            console.log(formError)
    }
    const chkcustomer = localStorage.getItem('customer_login')
    if(chkcustomer){
        window.location.href = '/dashboard'
    }
    const buttonenable = (loginFormData.email != '') && (loginFormData.password != '')
    return (
        <div className='container mt-4'>
            <h2 className='text-center my-4'>Login</h2>
            <div className='row'>
                <div className='col-8 offset-2'>
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" onChange={inputHandler} name='email' value={loginFormData.email} aria-describedby="emailHelp" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" name='password' onChange={inputHandler} value={loginFormData.password} class="form-control" id="exampleInputPassword1" />
                        </div>
                        <button type="button" disabled={!buttonenable} onClick={submitHandler} class="btn btn-primary">Login</button>
                        {
                            formError && <p className='text-danger'>{errorMsg}</p>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login