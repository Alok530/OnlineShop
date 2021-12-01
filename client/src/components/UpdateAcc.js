import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer';
import Alert from './Alert';
import { useEffect,useState } from 'react';
import { useContext } from 'react';
import ShopContext from '../context/ShopContext';
import ScrollBtn from './ScrollBtn';


const UpdateAcc = () => {
    const context = useContext(ShopContext);
    const { alertStatus,alertMessage,userInfo,setuserInfo,updateuserInfo} = context;

    const [user, setuser] = useState({name:'',mobile:'',gender:'',password:''});
    
    const Onchangefun = (event) => {
        if (event.target.name !== 'password')
            event.target.value = event.target.value.toUpperCase();
        setuser({ ...user, [event.target.name]: event.target.value })
    }

    const onsubmitfun=(event)=>{
        event.preventDefault();
        setuserInfo(user);
        updateuserInfo();        
    }

    useEffect(() => {
        setuser(userInfo);
    }, [])    
   
    return (
        <>
            <Navbar />
            <ScrollBtn />
            {alertStatus ? <div style={{ 'height': '60px', 'position': 'sticky', 'top': '0', 'zIndex': '2' }}>
                <Alert alertMessage={alertMessage} alertType='danger' />
            </div> : ''}
            {localStorage.getItem('jwtoken') ? <div className="Reg">
                <div className=" p-4 mt-4 mb-4 regestration Login">
                    <div className="Title">Update</div>
                    <form onSubmit={onsubmitfun} className="row g-3">
                        <div className="col-md-12">
                            <span className="Details">Username</span>
                            <input onChange={Onchangefun} value={user.name} type="text" className="form-control" minLength="3" maxLength="16" name="name" autoComplete="off" required="true" />
                        </div>
                        <div className="col-md-12">
                            <span className="Details">Phone</span>
                            <input onChange={Onchangefun} value={user.mobile} type="tel" pattern="[0-9]{10}" className="form-control" minLength="10" maxLength="10" placeholder="Enter Your Phone Number" name="mobile" autoComplete="off" required="true" />
                        </div>
                        <div className="col-md-6">
                            <span className="Details">Gender</span>
                            <input onChange={Onchangefun} value={user.gender} type="text" className="form-control" placeholder="Enter Your Gender" name="gender" autoComplete="off" required="true" />
                        </div>
                        <div className="col-md-6">
                            <span className="Details">Password</span>
                            <input onChange={Onchangefun} value={user.password} type="password" className="form-control" minLength="4" maxLength="8" name="password" id="inputPassword4" placeholder="Enter Your Password" autoComplete="off" required="true" />
                        </div>
                        <div className="col-12">
                            <button type="submit" name="signup" value="regester" className="btn">Update</button>
                        </div>
                    </form>
                    <div class="row">
                        <NavLink to="/account" className="links col">Skip</NavLink>
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

export default UpdateAcc;