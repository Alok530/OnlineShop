import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar';
import { useEffect } from 'react'
import Footer from './Footer';
import Alert from './Alert';
import { useContext } from 'react';
import ShopContext from '../context/ShopContext';
import ScrollBtn from './ScrollBtn';
import Error from './Error';

const Account = () => {
    const context = useContext(ShopContext);
    const { userInfo, alertMessage, alertStatus, fetchUserInfo } = context;

    useEffect(() => {
        fetchUserInfo();
    }, [])
    return (
        <>
            <Navbar />
            <ScrollBtn />
            {alertStatus ? <div style={{ 'height': '60px', 'position': 'sticky', 'top': '0', 'zIndex': '2' }}>
                <Alert alertMessage={alertMessage} alertType='danger' />
            </div> : ''}
            {localStorage.getItem('jwtoken') ? <div className="Reg">
                <div className=" p-4 mt-4 mb-4 regestration Login" style={{ background: 'wheat' }}>
                    <div className="Title">My Account</div>
                    <div className="card" style={{ background: '#ff523b' }}>
                        {userInfo.gender==='Male'?<img src="images/boyface.jpg" className="card-img-top mx-auto mt-2 mb-0" style={{ width: '100px', height: '100px', borderRadius: '65px', border: '2px solid white' }} alt="..." />:<img src="images/girlface.png" className="card-img-top mx-auto mt-2 mb-0" style={{ width: '100px', height: '100px', borderRadius: '65px', border: '2px solid white' }} alt="..." />}
                        <div className="card-body">
                            <h5 className="card-title text-center" style={{ color: 'white', fontWeight: 'bolder' }}>{userInfo.name}</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <spam style={{fontWeight:'bold'}}>Name: </spam>
                                {userInfo.name}
                            </li>
                            <li className="list-group-item"><spam style={{fontWeight:'bold'}}>Mobile: </spam>+91-{userInfo.mobile}</li>
                            <li className="list-group-item"><spam style={{fontWeight:'bold'}}>Gender: </spam>{userInfo.gender}</li>
                            <li className="list-group-item"><spam style={{fontWeight:'bold'}}>Password: </spam>*****</li>
                        </ul>
                    </div>
                    <div className="row mt-3">
                        <NavLink to="/updateAcc" className="links col">Update Account</NavLink>
                    </div>
                </div>
            </div> : <Error first={'401-Unauthorized'} second={'Authorization Required-Access is allowed only for registered users'} />}
            <Footer />
        </>
    )
}

export default Account;