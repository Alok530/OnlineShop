import React from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from './Footer';
import { Link } from "react-router-dom";
import { useContext } from "react";
import ShopContext from "../context/ShopContext";
import ScrollBtn from './ScrollBtn';
// const host = "http://localhost:5000";

const AddToCart = () => {
    const context = useContext(ShopContext);
    const { orderHistory, fetchUserOrderhistory } = context;

    useEffect(() => {
        fetchUserOrderhistory();
    }, [])

    return (
        <div className="alok">
            <Navbar />
            <ScrollBtn />
            <div className="container pb-4 my-4 text-center">
                <button className="temp">My Orders</button>

                {orderHistory == 0 ? <div className="row my-4 py-3 mx-auto" style={{ textAlign: 'center', color: 'white' }}>
                    <h1>Your order history is empty!</h1>
                    <Link to="/gallery"><button className="BTN">Shop now</button></Link>
                </div> : ''}

                <div className="container">
                    {
                        orderHistory.map((orderItem) => {
                            let items = orderItem.items;
                            items.map((orderNth) => {
                                let { ID, name, image, price, ratting } = orderNth;
                                return (
                                    <div className="row my-2" style={{ background: 'bisque' }} key={ID}>
                                        <div className="col-4 px-0">
                                            <div style={{ width: '100px' }}>
                                                <img src={image} style={{ "borderRadius": "2px 2px 2px 2px", "width": "100%", "height": "100%" }} className="card-img-top" alt="INA" />
                                            </div>
                                        </div>
                                        <div className="col-4 d-flex flex-column justify-content-center smallAddtoCart">
                                            <p style={{ fontWeight: 'bold' }} className="my-auto">{name}</p>
                                            <p className="card-text my-auto" style={{ 'fontWeight': 'bolder' }}><i className="fas fa-rupee-sign"></i> {price}</p>
                                        </div>
                                        <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                                            <p style={{ width: '3.5rem', "background": "green", 'textAlign': 'center', "borderRadius": '7px', "color": 'white', 'cursor': 'pointer' }} className="card-text mx-auto col-md-4 my-auto">{ratting}<i style={{ "color": 'white' }} className="bi bi-star-fill"></i></p>
                                        </div>
                                    </div>
                                )
                            })
                        })
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AddToCart;