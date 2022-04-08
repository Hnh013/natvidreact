import React, { useState } from 'react';
import '../../styles/pages/auth.css';
import signupFormInputs from '../forms/SignupInputArray';
import { useNavigate, Link } from 'react-router-dom';
import { signupAction, toastError, toastSuccess } from '../../services';

export const Signup = () => {

    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleUserDetailsChange = (e) => {
        const { name, value } = e.target;
        const currentUserDetails = { ...userDetails, [name]: value }
        setUserDetails(currentUserDetails);
    }

    const Signup = async (e) => {
        e.preventDefault();
        let response;
        try {
            response = await signupAction(userDetails);
            if (response.actionSuccess) {
                toastSuccess('You have Succesfully Signed In!');
                navigate('/login');
            } else {
                if (response.actionResponse.response.status === 422) {
                    toastError(response.actionResponse.response.data.errors[0].split('.')[1]);
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
        <main className='main bg-rainy'>
            <div className="px-md txt-over mx-auto w-75 py-sm d-flex fd-col gap-1 jc-c">
                <div className='f-w-800 f-2x ta-c'> SIGNUP</div>
                <form onSubmit={(e) => Signup(e)} >
                    {signupFormInputs.map(x =>
                        <div className='d-flex fd-col px-md' key={x.id}>
                            <label className='f-w-700 py-xs' htmlFor={x.name}>{x.placeholder}</label>
                            <input {...x} onChange={(e) => handleUserDetailsChange(e)} value={userDetails[x.name]} className='px-xs py-xs bdr-rad-sm' />
                            {(userDetails[x.name].length > 0) && <span className='err-msg txt-fire f-w-600'>{x.errormessage}</span>}
                        </div>)}
                    <div className='d-flex px-lg py-sm'>
                        <button type='submit' className='btn btn-calm d-flex jc-c w-100 f-w-600 bdr-rad-md'>Signup</button>
                    </div>
                </form>
                <div className='px-lg f-w-500 ta-c'>Already have an Account ? <Link to='/login'><span className='txt-over f-w-800'>Login Here</span></Link></div>
            </div>
        </main>
    );
}