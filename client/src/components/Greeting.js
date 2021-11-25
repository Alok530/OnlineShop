import React from 'react'
import allProducts from '../menu'
import Product from "./Product";
import Navbar from './Navbar';
import Footer from './Footer';
import { useState } from 'react';
import { useContext } from 'react';
import Alert from './Alert';
import ShopContext from '../context/ShopContext';
import { Link } from 'react-router-dom';
import ScrollBtn from './ScrollBtn';


const Greeting = () => {
    const [items, setitems] = useState(allProducts);

    const context = useContext(ShopContext);
    const { alertStatus, alertMessage } = context;
    const [sortStatus, setsortStatus] = useState(0)
    const sortfun = (sortCriteria) => {
        setsortStatus(1);
        items.sort(function (a, b) {
            if (sortCriteria === 'price')
                return a.price - b.price;
            else
                if (sortCriteria === 'ratting')
                    return b.ratting - a.ratting;
                else
                    return a.ID - b.ID;
        });
        const temp = items;
        setitems(temp);
    }

    const fillterfun = (price) => {
        if (price === 0)
            setitems(allProducts);
        else {
            const newITEMS = allProducts.filter((itm) => { return itm.price < price })
            setitems(newITEMS);
        }
    }

    return (
        <div className="alok">
            <Navbar />
            <ScrollBtn />
            <div style={{ 'height': '60px', 'position': 'sticky', 'top': '0', 'zIndex': '2' }}>
                {alertStatus ? <Alert alertMessage={alertMessage} alertType='danger' /> : ''}
            </div>
            <div className="container">
                <div className="row mt-3">
                    <div className="col mx-auto" style={{ textAlign: 'center' }}>
                        <Link to='/gallery'><button style={{ width: '10rem', borderRadius: '5px', textAlign: 'center' }} className="temp">SHOP</button></Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col dropdown mt-4">
                        <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Filters
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <button className="btn" onClick={() => { fillterfun(0) }}>All</button> <br />
                            <button className="btn" onClick={() => { fillterfun(100) }}>Below 100</button> <br />
                            <button className="btn" onClick={() => { fillterfun(200) }}>Below 200</button> <br />
                        </ul>
                    </div>
                    <div className="col dropdown mt-4 text-end">
                        <button onClick={() => { setsortStatus(0) }} className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Sort
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <button className="btn" onClick={() => { sortfun('price') }}>Price--Low to High</button> <br />
                            <button className="btn" onClick={() => { sortfun('ratting') }}>Popularity</button> <br />
                            <button className="btn" onClick={() => { sortfun('ID') }}>Newest First</button> <br />
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container p-4 mb-4">
                <div className="row">
                    {items.map((temp) => {
                        return (<Product key={temp.ID} itm={temp} />)
                        if (sortStatus)
                            return (<Product key={temp.ID} itm={temp} />)
                    })}
                </div>
            </div>            
            <Footer />
        </div>
    )
}

export default Greeting;