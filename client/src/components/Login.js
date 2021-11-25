import React from 'react'
import { useState } from 'react'
import { NavLink,Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import Navbarfront from './Navbarfront'
import Footer from './Footer';
import { useContext } from 'react'
import Alert from './Alert'
import ScrollBtn from './ScrollBtn';
import ShopContext from '../context/ShopContext'   // importing context file 

const host = "http://localhost:5000/api/user/login";

export default function Login() {
    const context = useContext(ShopContext); // for using useContext states and functions 
    const { alertStatus, alertShowfun, alertMessage,setalertMessage } = context; // importing alertStatus (state) and alertShowfun (useContext function)

    const navigate = useNavigate();
    const [User, setUser] = useState({
        mobile: '',
        password: '',
    })
    const onchangefun = (event) => {
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
            body: JSON.stringify({ mobile: User.mobile, password: User.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            setalertMessage(json.message);
            alertShowfun();

            // storing jwtoken into localstroage
            localStorage.setItem('jwtoken', json.jwtoken);

            console.log('congratulation login ho gya');
            setTimeout(() => {
                navigate('/gallery');
            }, 1500);
        } else {
            setalertMessage(json.message);

            alertShowfun();
            setUser({ "mobile": '', "password": '' });
            console.log('login nhi huaa');
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
                    <div className="Title">Sign In</div>
                    <form className="row g-3" onSubmit={onsubmitfun}>
                        <div className="col-md-12">
                            <span className="Details">Mobile</span>
                            <input onChange={onchangefun} value={User.mobile} type="tel" pattern="[0-9]{10}" minLength="10" maxLength="10" className="form-control" id="inputEmail4" name="mobile" placeholder="Enter Your Mobile No" autoComplete="off" required="true" />
                        </div>
                        <div className="col-md-12">
                            <span className="Details">Password</span>
                            <input onChange={onchangefun} value={User.password} minLength="4" maxLength="8" type="password" className="form-control" name="password" id="inputPassword4" placeholder="Enter Your Password" autoComplete="off" required="true" />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn">Sing In</button>
                        </div>
                    </form>
                    <div class="row">
                        <NavLink to="/regester" className="links col">Create an Account</NavLink>
                        <NavLink to="/gallery" className="links col-2">Skip</NavLink>
                    </div>
                </div>
            </div> :
                <div className="Reg" style={{ height: '50vh' }}>
                    <h1 style={{ color: 'white', fontWeight: 'bolder',padding: '12px' }}>You are already login</h1>
                    <br/><Link to="/gallery"><button className="BTN">Shop Now</button></Link>
                </div>}
            <Footer />
        </>
    )
}
