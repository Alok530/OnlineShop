import React from 'react'
import { Link } from 'react-router-dom'

export default function Error(props) {
    return (
        <>
            <div className="errorBox">
                <div className="errorImg">
                    <h1>Oops!</h1>
                    <h2 style={{fontWeight:'bold',color:'red'}}>{props.first}</h2>
                    <p>{props.second}<br/>Thankyou for visiting this Website</p>
                    <Link to="/login"><button style={{border:'none'}} className="BTN px-4 py-2">Login</button></Link>
                </div>
            </div>
        </>
    )
}