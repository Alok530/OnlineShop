import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Navbar from './Navbar'
import { useState,useEffect } from 'react'
import Footer from './Footer';
import { useNavigate } from 'react-router'
import Error from './Error';
import Alert from './Alert';
import ScrollBtn from './ScrollBtn';
import ShopContext from '../context/ShopContext';
const host = "https://ecommerce-reactapp-alok.herokuapp.com/api/placeorder/order";

const Regester = () => {
    const navigate = useNavigate();
    const context = useContext(ShopContext);
    const {items, alertStatus, alertShowfun, alertMessage, setalertMessage,getAllitems, removeAllitemsfun} = context;
    
    useEffect(() => {
      getAllitems();
    },[])

    const [User, setUser] = useState({
        name: '',
        mobile: '',
        pincode: '',
        state: '',
        address: '',
    })

    const Onchangefun = (event) => {
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
            body: JSON.stringify({ name: User.name, mobile: User.mobile, pincode: User.pincode, state: User.state, address: User.address,items:items })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            setalertMessage(json.message);
            alertShowfun();
            removeAllitemsfun();
            setTimeout(() => {
                navigate('/afterOrder')
            }, 1000);
            console.log('congratulation order placed ho gya');
            setUser({ name: '', mobile: '', pincode: '', state: '', address: '' });
        } else {
            setUser({ "name": '', "mobile": '', "pincode": '', "address": '', "state": '' });
            console.log('register nhi huaa');
        }
    }

    return (
        <>
            <Navbar />
            <ScrollBtn />
            {alertStatus ? <div style={{ 'height': '60px', 'position': 'sticky', 'top': '0', 'zIndex': '2' }}>
                <Alert alertMessage={alertMessage} alertType='danger' />
            </div> : ''}
            {items == 0 && localStorage.getItem('jwtoken') ?

                <div className="row py-3 mx-auto Reg" style={{ textAlign: 'center',height:'50vh',color:'white' }}>
                    <h1>Your cart is empty!</h1>
                    <p>Add items to it now</p>
                    <Link style={{width:'9.2rem',borderRadius:'64px'}} to="/gallery"><button className="BTN">Shop now</button></Link>
                </div>
                :                
                    localStorage.getItem('jwtoken') && items !== 0 ? <div className="Reg">
                        <div className=" p-4 mt-4 mb-4 regestration order">
                            <div className="Title">Add delivery address</div>
                            <form onSubmit={onsubmitfun} className="row g-3">
                                <div className="col-md-6">
                                    <span className="Details">Username</span>
                                    <input onChange={Onchangefun} value={User.name} type="text" className="form-control" placeholder="Enter Your Username" name="name" autoComplete="off" required="true" />
                                </div>
                                <div className="col-md-6">
                                    <span className="Details">Phone</span>
                                    <input onChange={Onchangefun} value={User.mobile} type="tel" pattern="[0-9]{10}" minLength="10" maxLength="10" className="form-control" placeholder="Enter Your Phone Number" name="mobile" autoComplete="off" required="true" />
                                </div>
                                <div className="col-md-6">
                                    <span className="Details">Pincode</span>
                                    <input onChange={Onchangefun} value={User.pincode} pattern="[0-9]{6}" minLength="6" maxLength="6" type="tel" className="form-control" name="pincode" id="inputPassword4" placeholder="Pincode" autoComplete="off" required="true" />
                                </div>
                                <div className="col-md-6">
                                    <span className="Details">State</span>
                                    <input onChange={Onchangefun} value={User.state} type="text" className="form-control" name="state" id="inputPassword4" placeholder="State" autoComplete="off" required="true" />
                                </div>
                                <div className="col-md-12">
                                    <span className="Details">House No</span>
                                    <input onChange={Onchangefun} value={User.address} type="text" className="form-control" name="address" id="inputPassword4" placeholder="Area, Colony, Road name" autoComplete="off" required="true" />
                                </div>
                                <div className="col-md-12">
                                    <button type="submit" name="signup" value="regester" className="btn">CONFORM ORDER</button>
                                </div>
                                <div className="row">
                                    <NavLink to="/addToCart" style={{ textDecoration: 'none', fontWeight: 'bold', textAlign: 'center' }}>Return to cart</NavLink>
                                </div>
                            </form>
                        </div>
                    </div> : <Error first={'401-Unauthorized'} second={'Authorization Required-Access is allowed only for registered users'} />
                }
                < Footer />
        </>
    )
}

export default Regester;