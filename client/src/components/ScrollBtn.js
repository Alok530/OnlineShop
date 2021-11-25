import React from 'react'
import { useState } from 'react';

export default function ScrollBtn() {
    const [scrollmessage, setscrollmessage] = useState(<i class="bi bi-arrow-down"></i>);

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            setscrollmessage(<i class="bi bi-arrow-up"></i>);
        } else {
            setscrollmessage(<i class="bi bi-arrow-down"></i>);
        }
    }

    window.onscroll = function () { scrollFunction() };

    const scrollToTopfun = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        } else {
            document.body.scrollTop = 20000;
            document.documentElement.scrollTop = 20000;
        }
    }
    return (
        <>
            <div style={{ 'zIndex': '2', position: 'fixed', bottom: '20px', right: '15px' }}>
                <button style={{border:'none',background:'#ff523b',color:'white',fontSize:'20px'}} className="align-items-end" onClick={() => { scrollToTopfun() }}>{scrollmessage}</button>
            </div>
        </>
    )
}
