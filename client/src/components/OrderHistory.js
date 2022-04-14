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
                    <h1>This page is under construction!</h1>
                    <Link to="/gallery"><button className="BTN">Shop now</button></Link>
                </div> : ''}

                <div className="container">
                    {
                        orderHistory.map((orderItem) => {
                            let items = orderItem.items;
                            items.map((orderNth) => {
                                return (
                                    <div id={orderNth.ID}>
                                        {console.log(orderNth.name)}
                                        <h1>{orderNth.name}</h1>
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