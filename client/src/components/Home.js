import React from 'react'
import Footer from './Footer'
import ScrollBtn from './ScrollBtn';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <ScrollBtn />
            <div className="contact Home">
                <div className="content">
                    <h1>Fashion Collections</h1>
                    <h3>FASHION IS WHAT YOU BUY</h3>
                    <h5> Style is what you do with it</h5>
                </div>
                <Link className="temp mx-2" style={{ textDecoration: 'none', textAlign: 'center' }} to="/login" role="button">Shop Now</Link>
            </div>
            <Footer />
        </>
    )
}

export default Home;
