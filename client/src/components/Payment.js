import React from 'react'

export default function Payment() {
    return (
        <>
            <div className="container" style={{border:'2px solid red',background:'bisque'}}>
                <h1 style={{textAlign:'center'}}>Payment</h1>
                <form method="post">
                    <h3 style={{"text-align": "center"}}>Conform Your Payment</h3>
                    <div className="row my-4">
                        <div className="col">
                            <label>Card Holder Name</label> <br />
                            <input style={{"width": "100%"}} onkeyup="myFunction()" id="name" required type="text" />
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col">
                            <label>Card Number</label>
                            <br />
                            <input style={{"width": "100%"}} minlength="12" maxlength="12" required type="tel" />
                        </div>
                        <div className="col-3">
                            <label>CVV</label>
                            <br />
                            <input style={{"width": "100%"}} minlength="3" maxlength="3" required type="password" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md">
                            <label>Expiration Date</label> <br />
                            <select name="month">
                                <option value="1">Jan</option>
                                <option value="2">Feb</option>
                                <option value="3">Mar</option>
                                <option value="4">Apr</option>
                                <option value="5">May</option>
                                <option value="6">Jun</option>
                                <option value="7">Jul</option>
                                <option value="8">Aug</option>
                                <option value="9">Sep</option>
                                <option value="10">Oct</option>
                                <option value="1">Nov</option>
                                <option value="1">Dec</option>
                            </select>
                            <select name="year">
                                <option value="1">2021</option>
                                <option value="2">2022</option>
                                <option value="3">2023</option>
                                <option value="4">2024</option>
                                <option value="5">2025</option>
                            </select>
                        </div>
                        <div className="col-md" style={{textAlign:'right'}}>
                            <img style={{height:'50px',width:'100px'}} src="images/mc.png" alt="" />
                            <img style={{height:'50px',width:'100px'}} src="images/vi.png" alt="" />
                            <img style={{height:'50px',width:'100px'}} src="images/pp.png" alt="" />
                        </div>
                    </div>
                    <button type="submit" style={{width:'100%'}} className="BTN my-4">Conform</button>
                </form>
            </div>
        </>
    )
}
