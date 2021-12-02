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

const host = "https://ecommerce-reactapp-alok.herokuapp.com/api/user/regester";
// const host = "http://localhost:5000/api/user/regester";

const Regester = () => {
    const context = useContext(ShopContext);
    const { alertMessage, setalertMessage, alertStatus, alertShowfun, fetchUserInfo } = context;

    const navigate = useNavigate();
    const [gender, setgender] = useState('Male')
    const [User, setUser] = useState({
        name: '',
        mobile: '',
        password: '',
    })

    const Onchangefun = (event) => {
        if (event.target.name !== 'password')
            event.target.value = event.target.value.toUpperCase();
        setUser({ ...User, [event.target.name]: event.target.value })        
    }

    const onsubmitfun = async (event) => {
        event.preventDefault();
        console.log(User,gender)        
        let url = `${host}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: User.name, mobile: User.mobile, password: User.password, gender: gender })
        });
        const json = await response.json();

        if (json.success) {

            // storing jwtoken into localstroage
            localStorage.setItem('jwtoken', json.jwtoken);
            // for set userInfo in contex
            fetchUserInfo();

            setalertMessage(json.message);
            alertShowfun();

            setTimeout(() => {
                navigate('/gallery');
            }, 1500);
        } else {
            setalertMessage(json.message);
            alertShowfun();
            setUser({ "name": '', "mobile": '', "password": ''});
            setgender('');
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
                        <div className="col-md-6">
                            <span className="Details">Gender</span>
                            {/*<input onChange={Onchangefun} value={User.gender} type="text" className="form-control" placeholder="Gender" name="gender" autoComplete="off" required="true" />*/}
                            <select onChange={(e)=>{const temp = e.target.value;
                                setgender(temp)}} value={gender} className="form-select" required="true" name="gender">                                                                
                                <option required="true">Choose Gender</option>
                                <option required="true" value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <span className="Details">Password</span>
                            <input onChange={Onchangefun} value={User.password} type="password" className="form-control" minLength="4" maxLength="8" name="password" id="inputPassword4" placeholder="Password" autoComplete="off" required="true" />
                        </div>
                        <div className="col-12">
                            <button type="submit" name="signup" value="regester" className="btn">Register</button>
                        </div>
                    </form>
                    <div className="row">
                        <NavLink to="/login" className="links col">I am already register</NavLink>
                        <NavLink to="/gallery" className="links col-2">Skip</NavLink>
                    </div>
                </div>
            </div> : <div className="Reg" style={{ height: '50vh' }}>
                <h1 style={{ color: 'white', fontWeight: 'bolder', padding: '12px' }}>You are already login</h1>
                <br /><Link to="/gallery"><button className="BTN">Shop Now</button></Link>
            </div>}
            <Footer />
        </>
    )
}

export default Regester;