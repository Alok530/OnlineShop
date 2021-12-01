import React from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import ShopContext from '../context/ShopContext';

const host = "https://ecommerce-reactapp-alok.herokuapp.com";

export default function Product(props) {
    const navigate = useNavigate();

    const context = useContext(ShopContext);
    const { alertShowfun,setalertMessage } = context;

    const addToCartfun = async (ID, name, ratting, image, price) => {
        try {
            if (!localStorage.getItem('jwtoken'))
                navigate('/error');            
            else {
                const url = `${host}/api/cart/addToCart`;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('jwtoken')
                    },
                    body: JSON.stringify({ ID: ID, name: name, image: image, ratting: ratting, price: price })
                });
                const json = await response.json();
                
                setalertMessage(json.message);

                // for set alert-signal
                // setalertStatus(1);
                alertShowfun();
            }
        } catch (error) {
            console.log('add to cart error ', error)
        }
    }

    return (
        <>
            <div className="col-md-3 my-3" key={props.itm.ID}>
                <div className="card mx-auto" style={{ "border": "2px solid black", "borderRadius": "5px", "width": "13rem" }}>
                    <img src={props.itm.image} style={{ "borderRadius": "5px 5px 0 0", "width": "100%", "height": "100%" }} className="card-img-top" alt="INA" />
                    <div className="card-body" style={{ 'background': 'whiteSmoke', 'borderRadius': '0 0 5px 5px' }}>
                        <h5 className="card-title">{props.itm.name}</h5>
                        <p className="card-text" style={{ 'fontWeight': 'bolder' }}><i className="fas fa-rupee-sign"></i> {props.itm.price}</p>
                        <div className="row">
                            <p style={{ width:'5rem',"background": "green", 'textAlign': 'center', "borderRadius": '12px', "color": 'white', 'cursor': 'pointer' }} className="card-text mx-auto col-md-4 my-auto">{props.itm.ratting}<i style={{ "color": 'white' }} className="bi bi-star-fill"></i></p>
                            <i className="bi bi-bag-check-fill mx-auto my-auto" style={{ width:'3rem','textAlign': 'center', "background": "#ff523b", "borderRadius": '12px', "color": 'white', 'cursor': 'pointer' }} onClick={() => { addToCartfun(props.itm.ID, props.itm.name, props.itm.ratting, props.itm.image, props.itm.price) }}></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
