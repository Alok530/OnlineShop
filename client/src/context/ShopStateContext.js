import ShopContext from "./ShopContext";
import { useState } from "react";
import { useNavigate } from "react-router";
const host = "https://ecommerce-reactapp-alok.herokuapp.com";

const ShopStateContext = (props) => {
    const navigate = useNavigate();
    const [alertStatus, setalertStatus] = useState(0)
    const [alertMessage, setalertMessage] = useState('');
    const [items, setitems] = useState([])
    const [total, settotal] = useState(0)
    const [userInfo, setuserInfo] = useState({
        name: '',
        mobile: '',
        password: '******',
        gender: '',
    })

    const fetchUserInfo = async () => {
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
            password: "*******",
        })
    }

    const updateuserInfo = async (event) => {
        event.preventDefault();
        let url = `${host}/api/user/updateAccount`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ name: userInfo.name, mobile: userInfo.mobile, password: userInfo.password, gender: userInfo.gender })
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
            setalertMessage(json.message);
            alertShowfun();
            window.alert('update nhi huaa');
        }
    }

    const alertShowfun = () => {
        setalertStatus(1);
        setTimeout(() => {
            setalertStatus(0)
        }, 1500);
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
            console.log('getAllitems function error', error);
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

    return (
        <ShopContext.Provider value={{ updateuserInfo,fetchUserInfo, userInfo, setuserInfo, removeAllitemsfun, settotal, total, items, setitems, alertStatus, setalertStatus, alertMessage, setalertMessage, alertShowfun, logoutfun, getAllitems }}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopStateContext;