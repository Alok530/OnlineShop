import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from './Footer';
import Alert from "./Alert";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useContext } from "react";
import ShopContext from "../context/ShopContext";
import ScrollBtn from './ScrollBtn';
const host = "http://localhost:5000";

const AddToCart = () => {
    const context = useContext(ShopContext);
    const { items, setitems, getAllitems, settotal, total, removeAllitemsfun } = context;

    const navigate = useNavigate();

    const [alertSignal, setalertSignal] = useState(0);

    useEffect(() => {
        getAllitems();
    }, [])

    // for delete a item
    const removeItemfun = async (ID) => {
        let url = `${host}/api/cart/removeItemfun`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('jwtoken'),
            },
            body: JSON.stringify({ ID: ID })
        });
        const json = await response.json();
        console.log(json);

        // for set alert-signal
        setalertSignal(1);
        setTimeout(() => {
            setalertSignal(0)
        }, 2000);

        // for user site or frontend
        const newITEMS = items.filter((itm) => { return itm.ID !== ID })
        setitems(newITEMS);

        let p = 0;
        for (let i = 0; i < newITEMS.length; i++) {
            p += newITEMS[i].price;
        }
        settotal(p);
    }

    return (
        <div className="alok">
            <Navbar />
            <ScrollBtn />
            <div style={{ 'height': '70px', 'position': 'sticky', 'top': '0', 'zIndex': '2' }}>
                {alertSignal ? <Alert alertMessage='Item Removed from Cart' alertType='danger' /> : ''}
            </div>
            <div className="container pb-4 text-center">
                <button className="temp">My Cart</button>

                {items == 0 ? <div className="row my-4 py-3 mx-auto" style={{ textAlign: 'center', color: 'white' }}>
                    <h1>Your cart is empty!</h1>
                    <p>Add items to it now</p>
                    <Link to="/gallery"><button className="BTN">Shop now</button></Link>
                </div> : ''}

                {
                    items.map((cartItem) => {
                        let { ID, name, image, price, ratting } = cartItem;
                        return (
                            <div className="row my-2" style={{ background: 'bisque' }} key={ID}>
                                <div className="col-4 px-0">
                                    <div style={{ width: '80px' }}>
                                        <img src={image} style={{ "borderRadius": "2px 2px 2px 2px", "width": "100%", "height": "100%" }} className="card-img-top" alt="INA" />
                                    </div>
                                </div>
                                <div className="col-4 d-flex flex-column justify-content-center smallAddtoCart">
                                    <p style={{ fontWeight: 'bold' }} className="my-auto">{name}</p>
                                    <p className="card-text my-auto" style={{ 'fontWeight': 'bolder' }}><i className="fas fa-rupee-sign"></i> {price}</p>
                                    <p style={{ width: '3.5rem', "background": "green", 'textAlign': 'center', "borderRadius": '7px', "color": 'white', 'cursor': 'pointer' }} className="card-text mx-auto col-md-4 my-auto">{ratting}<i style={{ "color": 'white' }} className="bi bi-star-fill"></i></p>
                                </div>
                                <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                                    <i className="bi bi-trash-fill mx-auto my-auto p-1" style={{ fontWeight: 'bolder', 'textAlign': 'center', "background": "#ff523b", "color": 'white', 'cursor': 'pointer', 'borderRadius': '5px' }} onClick={() => { removeItemfun(ID) }}></i>
                                </div>
                            </div>
                        )
                    })
                }
                {items != 0 ? <div className="row my-4 py-3 mx-auto" style={{width:'65%',textAlign: 'center',color:'white'}}>
                    <h4 className="card-text my-auto" style={{ 'fontWeight': 'bolder',color:'white' }}>Total<i className="fas fa-rupee-sign" style={{ marginLeft: '25px' }}></i>{total}</h4>
                    <hr />
                    <div className="col-md-4"><button className="BTN"><Link style={{ "color": "white", "fontWeight": "800", textDecoration: 'none' }} to={`/order`}>Order Now</Link></button></div>
                    <div className="col-md-4 hhh"><button className="BTN" style={{ "color": "white", "fontWeight": "800", textDecoration: 'none' }} onClick={() => { removeAllitemsfun() }}>Clear Cart</button></div>
                    <div className="col-md-4 hhh"><button className="BTN" style={{ "color": "white", "fontWeight": "800", textDecoration: 'none' }} onClick={() => { navigate('/gallery') }}>Shop</button></div>
                </div> : ''}
            </div>
            <Footer />
        </div>
    )
}

export default AddToCart;