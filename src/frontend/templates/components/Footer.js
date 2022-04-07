import React from 'react';

export const Footer = () => {
    return (
        <footer className='footer d-flex fd-col ai-c jc-c bg-over px-sm py-sm'>
            <div className='d-flex ai-c jc-sb'>
                <span className='material-icons txt-bee f-2x'>terrain</span>
                <span className='txt-bee'>&copy; National VideoGraphic</span> 
            </div>
            <div className='d-flex ai-c jc-sa txt-bee' >
            <div className="px-xs"><span className='f-15x '><i className="fa fa-envelope-o"></i></span></div>
                <div className="px-xs"><span className='f-15x '><i className="fa fa-facebook-square"></i></span></div>
        <div className="px-xs"><span className='f-15x '><i className="fa fa-instagram"></i></span></div>
        <div className="px-xs"><span className='f-15x'><i className="fa fa-twitter-square"></i></span></div>

            </div>

        </footer>
    );
};
