import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';
import { toastSuccess } from '../../services/toastService';

export const Navbar = () => {

    const { userState , userDispatcher } = useUser();

    const navigate = useNavigate();
    
    const logoutUser = () => {
        toastSuccess('You have Logged Out!');  
        userDispatcher({ type: 'LOGOUT'});
        navigate('/login');
    }

    return (
        <nav className='navbar d-flex ai-c jc-sb py-sm px-sm bg-over txt-smoke'>
            <Link to='/'> 
            <div className='d-flex ai-c jc-sb home-logo'>
            <span className='material-icons txt-bee f-3x'>terrain</span>
                <span className='f-15x txt-bee'>NatVid</span>
            </div>
            </Link>
            <div className='d-flex ai-c jc-sa'>
                <Link to='/videos'> 
                <div className='px-xs'>
                    <span className='material-icons'> video_library </span>
                </div>
                </Link>
                <Link to={ userState.foundUser ? '/likes' : '/login' }> 
                <div className='px-xs'>
                    <span className='material-icons'> thumb_up </span>
                </div>
                </Link>
                <Link to={ userState.foundUser ? '/watchlater' : '/login' }> 
                <div className='px-xs'>
                    <span className='material-icons'> watch_later </span>
                </div>
                </Link>
                <Link to='/'> 
                <div className='alternative-home-icon px-xs'>
                    <span className='material-icons f-2x txt-bee'> home </span>
                </div> 
                </Link>
                <div className='px-xs'>
                   
                    <span className='material-icons'> playlist_play </span>

                </div>
                <Link to={ userState.foundUser ? '/history' : '/login' }> 
                <div className='px-xs'>
                    <span className='material-icons'> history </span>
                </div>
                </Link>
                { 
                userState.foundUser ? 
                (<span onClick={logoutUser}><span className="material-icons">logout</span></span>) 
                : 
                (<Link to='/login'><span className="material-icons">login</span></Link> )
                }
            </div>
        </nav>
    );
};

