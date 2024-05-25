import React, { useState } from 'react'
import axios from 'axios'

const Register = () => {
    const [formError, setFormError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [registerFormData, setRegisterFormData] = useState({
        "email": '',
        "name": '',
        "password": '',
    })
    const inputHandler = (event) => {
        setRegisterFormData({
            ...registerFormData,
            [event.target.name]: event.target.value,
        })
        // console.log(loginFormData)
    }
    const submitHandler = (event) => {
        const formdata = new FormData();
        formdata.append('email', registerFormData.email);
        formdata.append('name', registerFormData.name);
        formdata.append('password', registerFormData.password);
        // console.log(formdata);
        // for (let [key, value] of formdata.entries()) {
        //     console.log(`${key}: ${value}`);
        axios.post('http://127.0.0.1:8000/customer/register/', formdata)
            .then(function (response) {
                console.log(response)
                if (response.data.bool === false) {
                    setFormError(true)
                    setErrorMsg(response.data.msg)
                } else {
                    setRegisterFormData({
                        'email': '',
                        'name': '',
                        'password': ''
                    })
                    setFormError(false)
                    setErrorMsg(response.data.msg)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        console.log(formError)
    }
    // const chkcustomer = localStorage.getItem('customer_login')
    // if (chkcustomer) {
    //     window.location.href = '/dashboard'
    // }
    const buttonenable = (registerFormData.email != '') && (registerFormData.name != '') && (registerFormData.password != '')
    return (
        <div className='container mt-4'>
            <h2 className='text-center my-4'>Register</h2>
            <div className='row'>
                <div className='col-8 offset-2'>
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" name='email' onChange={inputHandler} value={registerFormData.email} aria-describedby="emailHelp" />
                        </div>
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" name='name' onChange={inputHandler} value={registerFormData.name} id="name" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" name='password' onChange={inputHandler} value={registerFormData.password} />
                        </div>
                        {/* <div class="mb-3">
                            <label for="exampleInputPassword2" class="form-label">Confirm Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword2" />
                        </div> */}
                        <button type="button" onClick={submitHandler} disabled={!buttonenable} class="btn btn-primary">Register</button>
                        {
                            !formError && <p className='text-success mt-4'>{errorMsg}</p>
                        }
                        {
                            formError && <p className='text-danger mt-4'>{errorMsg}</p>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register