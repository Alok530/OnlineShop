import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import ShopContext from '../context/ShopContext';

export default function Navbar() {
    
    const context = useContext(ShopContext);    
    const {logoutfun} = context;

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img style={{ width: '120px' }} src="images/logo.png" alt="not found" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-lg-0">
                            <li className="nav-item">
                                <Link className="btn hhh btn-info mx-2" to="/gallery" role="button">Shop</Link>
                                <Link className="btn hhh btn-warning mx-2" to="/addToCart" role="button">Cart</Link>
                                {localStorage.getItem('jwtoken')?<button onClick={logoutfun} className="btn hhh btn-danger mx-2"  role="button">Logout</button>:<Link className="btn btn-danger mx-2 hhh" to="/login" role="button">Login</Link>}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
