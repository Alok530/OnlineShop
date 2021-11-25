import React from 'react'
import { Link } from 'react-router-dom'

export default function PlacedOrder() {
    return (
        <>
            <div className="errorBox">
                <div className="errorImg">
                    <h1>Sorry!</h1>
                    <h2 style={{fontWeight:'bold',color:'red'}}>This website is not for commercial purpose</h2>
                    <p>I am not taking any <strong>payment</strong> and <strong>order</strong>,the material and information contained on this website is for general purposes only.<br/>Thankyou for visiting this Website</p>                    
                    <Link to="/gallery"><button style={{border:'none'}} className="BTN px-4 py-2">Shop More</button></Link>
                </div>
            </div>
        </>
    )
}
