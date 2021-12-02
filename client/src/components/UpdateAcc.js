import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer';
import Alert from './Alert';
import { useEffect,useState } from 'react';
import { useContext } from 'react';
import ShopContext from '../context/ShopContext';
import ScrollBtn from './ScrollBtn';
import Error from './Error';

const UpdateAcc = () => {
    const context = useContext(ShopContext);
    const { alertStatus,alertMessage,userInfo,updateuserInfo} = context;

    const [user, setuser] = useState({name:'',mobile:''});
    const [gender, setgender] = useState('Male')
    
    const Onchangefun = (event) => {
        if (event.target.name !== 'password')
            event.target.value = event.target.value.toUpperCase();
        setuser({ ...user, [event.target.name]: event.target.value })
    }

    const onsubmitfun=(event)=>{
        event.preventDefault();        
        updateuserInfo(user.name,user.mobile,gender);        
    }

    useEffect(() => {
        setuser({name:userInfo.name,mobile:userInfo.mobile,password:userInfo.password});
        setgender(userInfo.gender);
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
                            <input onChange={Onchangefun} value={user.name} type="text" className="form-control" minLength="3" maxLength="22" name="name" autoComplete="off" required="true" />
                        </div>
                        <div className="col-md-12">
                            <span className="Details">Phone</span>
                            <input onChange={Onchangefun} value={user.mobile} type="tel" pattern="[0-9]{10}" className="form-control" minLength="10" maxLength="10" placeholder="Enter Your Phone Number" name="mobile" autoComplete="off" required="true" />
                        </div>
                        <div className="col-md-12">
                            <span className="Details">Gender</span>
                            <select onChange={(e)=>{const temp = e.target.value;
                                setgender(temp)}} value={gender} className="form-select" required="true" name="gender">                                                                
                                <option required="true">Choose Gender</option>
                                <option required="true" value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>                        
                        <div className="col-12">
                            <button type="submit" name="signup" value="regester" className="btn">Update</button>
                        </div>
                    </form>
                    <div className="row">
                        <NavLink to="/account" className="links col">Skip</NavLink>
                    </div>
                </div>
            </div> : <Error first={'401-Unauthorized'} second={'Authorization Required-Access is allowed only for registered users'} />}
            <Footer />
        </>
    )
}

export default UpdateAcc;