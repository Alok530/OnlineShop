import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Navbar from './Navbar';
import { useState } from 'react'
import Footer from './Footer';
import Alert from './Alert';
import { useNavigate } from 'react-router'
import { useContext } from 'react';
import ShopContext from '../context/ShopContext';
import ScrollBtn from './ScrollBtn';

const host = "https://ecommerce-reactapp-alok.herokuapp.com/api/user/regester";

const Regester = () => {
    const context = useContext(ShopContext);
    const { userInfo, alertMessage, alertShowfun, alertStatus, setalertMessage } = context;

    const navigate = useNavigate();        
    

    return (
        <>
            <Navbar />
            <ScrollBtn />
            {alertStatus ? <div style={{ 'height': '60px', 'position': 'sticky', 'top': '0', 'zIndex': '2' }}>
                <Alert alertMessage={alertMessage} alertType='danger' />
            </div> : ''}
            {localStorage.getItem('jwtoken') ? <div className="Reg">
                <div className=" p-4 mt-4 mb-4 regestration Login" style={{ background:'wheat' }}>
                    <div className="Title">My Account</div>
                    <div className="card" style={{ background:'#ff523b' }}>
                        <img src="images/img1.jpg" className="card-img-top mx-auto mt-2 mb-0" style={{ width: '100px', height: '100px', borderRadius: '65px', border: '2px solid white' }} alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-center" style={{ color: 'white', fontWeight: 'bolder' }}>{userInfo.name}</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{userInfo.name}</li>
                            <li className="list-group-item">+91-{userInfo.mobile}</li>
                            <li className="list-group-item">{userInfo.gender}</li>
                            <li className="list-group-item">{userInfo.password}</li>
                        </ul>
                    </div>
                    <div className="row mt-3">
                        <NavLink to="/updateAcc" className="links col">Update Account</NavLink>
                    </div>
                </div>
            </div> : <div className="Reg" style={{ height: '50vh' }}>
                <h1 style={{ color: 'white', fontWeight: 'bolder', padding: '12px' }}>You are not login</h1>
                <br /><Link to="/login"><button className="BTN">Login Now</button></Link>
            </div>}
            <Footer />
        </>
    )
}

export default Regester;