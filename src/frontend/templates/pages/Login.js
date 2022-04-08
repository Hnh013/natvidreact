import React, { useState } from 'react';
import loginFormInputs from '../forms/LoginInputArray';
import '../../styles/pages/auth.css';
import { useUser } from '../../contexts/userContext';
import { useNavigate, Link } from 'react-router-dom';
import { loginAction, toastError, toastSuccess } from '../../services';


export const Login = () => {

    const navigate = useNavigate();

    const { userDispatcher } = useUser();

    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleCredentialsChange = (e) => {
        const { name, value } = e.target;
        const currentCredentials = { ...credentials, [name]: value }
        setCredentials(currentCredentials);
    }

    const testLogin = () => {
        setCredentials({ email: "adarshbalika@gmail.com", password: "Adarshbalika@123" });
    }

    const Login = async (e) => {
        e.preventDefault();
        let response;
        try {
            response = await loginAction(credentials);
            if (response.actionSuccess) {
                toastSuccess('You have Succesfully Logged In!');
                let { foundUser, encodedToken } = response.actionResponse.data;
                userDispatcher({ type: 'LOG_IN', payload: { foundUser, encodedToken } });
                navigate('/');
            } else {
                if (response.actionResponse.response.status === 404 || response.actionResponse.response.status === 401) {
                    toastError(response.actionResponse.response.data.errors[0].split('.')[0]);
                } else {
                    toastError('Oops, an error has occured!');
                }
            }
        } catch (error) {
            response = error;
            console.log(response);
        }
    }

    return (
        <main className='main auth bg-rainy'>
            <div className="w-75 mx-auto px-md py-sm d-flex fd-col gap-1 jc-c txt-over">
                <div className='f-w-800 f-2x ta-c'> LOGIN</div>
                <form onSubmit={(e) => Login(e)} >
                    {loginFormInputs.map(x =>
                        <div className='d-flex fd-col px-md' key={x.id}>
                            <label className='f-w-700 py-xs' htmlFor={x.name}>{x.placeholder}</label>
                            <input {...x} onChange={(e) => handleCredentialsChange(e)} value={credentials[x.name]} className='px-xs py-xs bdr-rad-sm' />
                            {(credentials[x.name].length > 0) && <span className='err-msg txt-fire f-w-600'>{x.errormessage}</span>}
                        </div>)}
                    <div className='d-flex px-lg pt-lg'>
                        <button type='submit' className='btn btn-calm d-flex jc-c w-100 f-w-600 bdr-rad-md'>Login</button>
                    </div>
                </form>
                <div className=' w-75 mx-auto'>
                    <div className='d-flex px-lg py-xs'>
                        <button onClick={() => testLogin()}
                            className='btn btn-over txt-bee d-flex jc-c w-100 f-w-600 bdr-rad-md'>
                            <span className='txt-bee'>Enter Test credentials</span>
                        </button>
                    </div>
                </div>
                <div className='px-lg f-w-500 ta-c'>Don't have an Account ? <Link to='/signup'><span className='txt-over f-w-800'>Signup Here</span></Link></div>
            </div>
        </main>
    );
}
