import React from 'react'
import { useContext, useState } from 'react';
import ShopContext from '../context/ShopContext';

export default function Footer() {
    const context = useContext(ShopContext);
    const { setalertMessage, alertShowfun } = context;
    const [user, setuser] = useState({ name: '', message: '' });

    const onchangefun = (event) => {
        if(event.target.name==='name')
        event.target.value = event.target.value.toUpperCase();
        setuser({ ...user, [event.target.name]: event.target.value })
    }

    const onsubmitfun = async (event) => {
        try {
            event.preventDefault();
            let url = 'https://ecommerce-reactapp-alok.herokuapp.com/api/user/feedback';
            // const url = "http://localhost:5000/api/user/feedback";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: user.name, message: user.message })
            });
            const json = await response.json();

            setalertMessage(json.message);
            setuser({name:'',message:''});
            alertShowfun();
        } catch (error) {
            setuser({name:'',message:''});
            alertShowfun();
            console.log('feedback error in frontend', error);
        }
    }
    return (
        <>
            <div className="container-fluid footer mx-0">
                <div className="row mx-0">
                    <div className="col-md-3 mx-auto text-center mb-4">
                        <h3>Follow Me</h3>
                        <div className="mx-auto mb-2">
                            <samp><i onClick={() => { window.open('https://m.facebook.com/alok.alokroy.585', '_blank') }} className="bi bi-facebook mx-2" style={{ cursor: 'pointer', color: 'white', fontSize: '23px' }}></i></samp>
                            <samp><i onClick={() => { window.open('https://www.instagram.com/rajalok530/', '_blank') }} className="bi bi-instagram mx-2" style={{ cursor: 'pointer', color: 'white', fontSize: '23px' }}></i></samp>
                            <samp><i onClick={() => { window.open('https://www.linkedin.com/in/alok-kumar-rai-3261b21ba/', '_blank') }} className="bi bi-linkedin mx-2" style={{ cursor: 'pointer', color: 'white', fontSize: '23px' }}></i></samp>
                        </div>
                    </div>
                    <div className="col-md-3 mx-auto text-center mb-2">
                        <img style={{ width: '200px' }} src="images/logo.png" alt="" />
                        <p className="mt-2">Disclaimer: This website is not for commercial purpose, the material and information contained on this website is for general purposes only.</p>
                    </div>
                    <div className="col-md-3 mx-auto text-center mb-2">
                        <h3>FeedBack</h3>
                        <form onSubmit={onsubmitfun}>
                            <input onChange={onchangefun} required autoComplete="off" name="name"  value={user.name} type="text" placeholder="Name" style={{ textAlign: 'center', outline: 'none', marginBottom: '7px', borderRadius: '20px', padding: '2px',border:'none' }} /><br />
                            <input onChange={onchangefun} required autoComplete="off" name="message" value={user.message} type="text" placeholder="Message Me" style={{ textAlign: 'center', outline: 'none', borderRadius: '20px', padding: '2px',border:'none' }} /><br />
                            <button type="submit" className="BTN my-2">Submit</button>
                        </form>
                    </div>
                    <div className="col-md-3 mx-auto text-center mb-2">
                        <h3>Contact Me</h3>
                        <div>
                            <samp>Chapra, Bihar</samp><br />
                            <samp>Phone: 7321015099</samp><br />
                            <samp>Email: alokkumarrai2003@gmail.com</samp>
                        </div>
                    </div>
                    <hr />
                    <p className="copyright">@Copyright 2021 - Alok Kumar Rai</p>
                </div>
            </div>
        </>
    )
}
