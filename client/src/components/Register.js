import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Navbarfront from './Navbarfront'
import { useState } from 'react'
import Footer from './Footer';
import Alert from './Alert';
import { useNavigate } from 'react-router'
import { useContext } from 'react';
import ShopContext from '../context/ShopContext';
import ScrollBtn from './ScrollBtn';
const host = "http://localhost:5000/api/user/regester";

const Regester = () => {
    const context = useContext(ShopContext);
    const {alertMessage,setalertMessage,alertStatus,alertShowfun} = context;

    const navigate = useNavigate();
    const [User, setUser] = useState({
        name: '',
        mobile: '',
        password: '',
    })

    const Onchangefun = (event) => {
        if(event.target.name!=='password')
        event.target.value = event.target.value.toUpperCase();
        setUser({ ...User, [event.target.name]: event.target.value })
    }

    const onsubmitfun = async (event) => {
        event.preventDefault();
        let url = `${host}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: User.name, mobile: User.mobile, password: User.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {

            // storing jwtoken into localstroage
            localStorage.setItem('jwtoken', json.jwtoken);

            setalertMessage(json.message);
            alertShowfun();

            console.log('congratulation register ho gya');
            setTimeout(() => {
                navigate('/gallery');
            }, 1500);
        } else {
            setalertMessage(json.message);
            alertShowfun();
            setUser({ "name": '', "mobile": '', "password": '' });
            console.log('register nhi huaa');
        }
    }

    return (
        <>
            <Navbarfront />
            <ScrollBtn />
            {alertStatus ? <div style={{ 'height': '60px', 'position': 'sticky', 'top': '0', 'zIndex': '2' }}>
                <Alert alertMessage={alertMessage} alertType='danger' />
            </div> : ''}
            {!localStorage.getItem('jwtoken') ? <div className="Reg">
                <div className=" p-4 mt-4 mb-4 regestration Login">
                    <div className="Title">Sign Up</div>
                    <form onSubmit={onsubmitfun} className="row g-3">
                        <div className="col-md-12">
                            <span className="Details">Username</span>
                            <input onChange={Onchangefun} value={User.name} type="text" className="form-control" minLength="3" maxLength="16" placeholder="Enter Your Username" name="name" autoComplete="off" required="true" />
                        </div>
                        <div className="col-md-12">
                            <span className="Details">Phone</span>
                            <input onChange={Onchangefun} value={User.mobile} type="tel" pattern="[0-9]{10}" className="form-control" minLength="10" maxLength="10" placeholder="Enter Your Phone Number" name="mobile" autoComplete="off" required="true" />
                        </div>
                        <div className="col-md-12">
                            <span className="Details">Password</span>
                            <input onChange={Onchangefun} value={User.password} type="password" className="form-control" minLength="4" maxLength="8"  name="password" id="inputPassword4" placeholder="Enter Your Password" autoComplete="off" required="true" />
                        </div>
                        <div className="col-12">
                            <button type="submit" name="signup" value="regester" className="btn">Regester</button>
                        </div>
                    </form>
                    <div class="row">
                        <NavLink to="/login" className="links col">I am already register</NavLink>
                        <NavLink to="/gallery" className="links col-2">Skip</NavLink>
                    </div>
                </div>
            </div> : <div className="Reg" style={{ height: '50vh' }}>
                <h1 style={{ color: 'white', fontWeight: 'bolder',padding: '12px' }}>You are already login</h1>
                <br /><Link to="/gallery"><button className="BTN">Shop Now</button></Link>
            </div>}
            <Footer />
        </>
    )
}

export default Regester;