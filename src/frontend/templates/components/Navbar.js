import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className='navbar d-flex ai-c jc-sb py-sm px-sm bg-over txt-smoke'>
            <Link to='/'> 
            <div className='d-flex ai-c jc-sb home-logo'>
            <span className='material-icons txt-bee f-3x'>terrain</span>
                <span className='f-15x txt-bee'>NatVid</span>
            </div>
            </Link>
            <div className='d-flex ai-c jc-sa'>
                <div className='px-xs'>
                    <span className='material-icons'> trending_up </span>
                </div>
                <div className='px-xs'>
                    <span className='material-icons'> thumb_up </span>
                </div>
                <div className='px-xs'><span className='material-icons'> watch_later </span></div>
                <div className='alternative-home-icon px-xs'>
                    <span className='material-icons f-2x txt-bee'> home </span>
                </div> 
                <div className='px-xs'>
                   
                    <span className='material-icons'> playlist_play </span>

                </div>
                <div className='px-xs'><span className='material-icons'> history </span></div>
                <div className='px-xs'>
                    <span className='material-icons'> login</span>
                </div>
            </div>
        </nav>
    );
};

