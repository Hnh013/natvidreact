import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/banner.css';

export const Banner = () => {
    return (
        <section className="banner-container">
        <div className="banner-image-div">
            <img className="banner-image" src="https://source.unsplash.com/random/?education,knowledge" alt="hero-section-banner" />
        </div>
        <div className="banner-overlay-div"></div>
        <div className="banner-text-div d-flex ai-c jc-c">       
            <button
            className='btn btn-over bdr-rad-sm'>
                <Link to='/videos'>
                <span className='txt-bee'>Explore Videos</span>
                </Link>
            </button>
        </div>
    </section> 
    );
}
