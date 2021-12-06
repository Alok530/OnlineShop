import ShopContext from "./ShopContext";
import { useState } from "react";
import { useNavigate } from "react-router";
const host = "https://ecommerce-reactapp-alok.herokuapp.com";
// const host = "http://localhost:5000";

const ShopStateContext = (props) => {
    const navigate = useNavigate();
    const [alertStatus, setalertStatus] = useState(0)
    const [alertMessage, setalertMessage] = useState('');
    const [items, setitems] = useState([])
    const [total, settotal] = useState(0)
    const [orderHistory, setorderHistory] = useState([])
    const [userInfo, setuserInfo] = useState({
        name: '',
        mobile: '',
        gender: '',
    })

    const alertShowfun = () => {
        setalertStatus(1);
        setTimeout(() => {
            setalertStatus(0)
        }, 1500);
    }

    const fetchUserInfo = async () => {
        if (localStorage.getItem('jwtoken')) {
            let url = `${host}/api/user/fetchUser`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('jwtoken'),
                },
            });
            const json = await response.json();
            setuserInfo({
                name: json.name,
                mobile: json.mobile,
                gender: json.gender,
            })
        } else {
            setalertMessage('You are not login');
            alertShowfun();
        }
    }

    const updateuserInfo = async (name, mobile, gender) => {
        if (localStorage.getItem('jwtoken')) {
            let url = `${host}/api/user/updateAccount`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('jwtoken'),
                },
                body: JSON.stringify({ name: name, mobile: mobile, gender: gender })
            });
            const json = await response.json();
            if (json.success) {
                fetchUserInfo();
                setalertMessage(json.message);
                alertShowfun();
                setTimeout(() => {
                    navigate('/account');
                }, 1500);
            } else {
                setalertStatus(1);
                setalertMessage(json.message);
                alertShowfun();
            }
        } else {
            setalertMessage('You are not login');
            alertShowfun();
        }
    }

    const logoutfun = () => {
        let Respons = window.confirm('Do you want to logout');
        if (Respons) {
            localStorage.removeItem('jwtoken');
            navigate('/');
        }
    }

    // get all items
    const getAllitems = async () => {
        try {
            if (!localStorage.getItem('jwtoken'))
                navigate('/error');
            else {
                const url = `${host}/api/cart/fetchAllItems`;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('jwtoken'),
                    },
                });

                const json = await response.json();
                let p = 0;
                setitems(json);
                for (let i = 0; i < json.length; i++) {
                    p += json[i].price;
                }
                settotal(p);
            }
        } catch (error) {
            console.log('Some internal error occur');
        }
    }

    // for delete a item
    const removeAllitemsfun = async () => {
        let url = `${host}/api/cart/removeAllitems`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('jwtoken'),
            },
        });
        const json = await response.json();
        console.log(json);

        // for user site or frontend        
        setitems([]);
        settotal(0);
    }

    // fetch all order history of user
    const fetchUserOrderhistory = async () => {
        try {
            if (!localStorage.getItem('jwtoken'))
                navigate('/error');
            else {
                let url = `${host}/api/placeorder/fetchallorder`;
                const response = await fetch(url, {
                    method:'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('jwtoken'),
                    },
                })
                if (response.success)
                setorderHistory(response.myorder);
            }
        } catch (error) {
            console.log("Server problem");
        }
    }


    return (
        <ShopContext.Provider value={{fetchUserOrderhistory,setorderHistory,orderHistory,updateuserInfo, fetchUserInfo, userInfo, setuserInfo, removeAllitemsfun, settotal, total, items, setitems, alertStatus, setalertStatus, alertMessage, setalertMessage, alertShowfun, logoutfun, getAllitems }}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopStateContext;