import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react'
const host = "http://localhost:5000/api/regester";

export default function Login() {
    const navigate = useNavigate();

    const [user, setuser] = useState({
        name: "",
        email: "",
        mobile: "",
    })

    const onchangefun = (event) => {
        setuser({ ...user, [event.target.name]: event.target.value })
    }

    const onsubmitfun = async (event) => {
        event.preventDefault();
        let url = `${host}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: user.name, email: user.email, mobile: user.mobile })
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            console.log('congratulation regester ho gya');
            navigate('/');
        }else{
            console.log('nhi huaa');
        }
    }

    return (
        <>
            <div className="Reg">
                <div className=" p-4 mt-4 mb-4 regestration Login">
                    <div className="Title">Sign Up</div>
                    <div className="row g-3">
                        <form onSubmit={onsubmitfun}>
                            <div className="col-md-12">
                                <span className="Details">Name</span>
                                <input onChange={onchangefun} type="text" className="form-control" id="inputEmail4" name="name" placeholder="Enter Birthday Boy Name" autoComplete="off" required="true" />
                            </div>
                            <div className="col-md-12">
                                <span className="Details">Email</span>
                                <input onChange={onchangefun} type="email" className="form-control" id="inputEmail4" name="email" placeholder="Enter Your Email" autoComplete="off" required="true" />
                            </div>
                            <div className="col-md-12">
                                <span className="Details">Mobile No</span>
                                <input onChange={onchangefun} type="tel" className="form-control" id="inputEmail4" name="mobile" placeholder="Enter Your Mobile No" autoComplete="off" required="true" />
                            </div>
                            <div className="col-md-12">
                                <button type="submit" className="btn formBtn">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
