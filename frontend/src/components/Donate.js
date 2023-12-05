import React, {Component} from "react";
import {LinkContainer} from "react-router-bootstrap";
import DonateStatus from "./DonateStatus";
import donateStatus from "./DonateStatus";



class Donate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            donateStatus: false,
        }
    }

    makeDonation = (event) => {
        event.preventDefault();

        const amount = document.getElementById("amount").value;
        console.log(amount)

        fetch(`http://127.0.0.1:8000/donate/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount,
            }),
        })
            .then(response => {
                if (response.ok) {
                    // const filteredItems = this.state.todoList.filter(item => item.id !== id);
                    // this.setState({todoList: filteredItems});
                    console.log("test");
                    this.setState({donateStatus: true});
                    let inputs = document.getElementsByTagName('input');
                    for (let i = 0; i < inputs.length; ++i) {
                        inputs[i].setAttribute("value", "");
                    }

                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('There has been a problem with your donate operation:', error);
                document.getElementById("donateError").innerHTML = "Donation unsuccessful";

            });
    }


    render() {

        const {donateStatus} = this.state;
        return (
            // Donate page
            <div className="container p-5">

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <LinkContainer to={`/explore`}>
                            <li className="breadcrumb-item"><a href="#">Explore</a></li>
                        </LinkContainer>
                        <LinkContainer to={`/explore/animals`}>
                            <li className="breadcrumb-item"><a href="#">Animals</a></li>
                        </LinkContainer>
                        <li className="breadcrumb-item active" aria-current="page">Donate</li>
                    </ol>
                </nav>

                <div className="col-lg-6 col-md-12 mt-5">
                    <h5 className="mb-2">Your help means a lot!</h5>
                    <h2 className="mb-2">Donate to Polar Bears International</h2>

                    <form onSubmit={this.makeDonation}>
                        <div className="form-group mt-5">
                            <label>Amount</label>
                            <input type="number" className="form-control" name="amount" id="amount"
                                   min="0.5" max="100000" step="0.01" placeholder="20" required/>
                        </div>
                        <div className="form-group mt-3">
                            <label>Full Name</label>
                            <input type="text" className="form-control" name="name" required/>
                        </div>
                        <div className="form-group mt-3">
                            <label>Card Number</label>
                            <input type="text" className="form-control" name="card" placeholder="1212121212121212"
                                   maxLength="19" required/>
                        </div>
                        <div className="form-row d-flex flex-wrap">
                            <div className="form-group mt-3 me-2">
                                <label>Expiry Date</label>
                                <input type="text" className="form-control" name="expiry" placeholder="MMYY"
                                       maxLength="4" required/>
                            </div>
                            <div className="form-group mt-3">
                                <label>CVV/CVC</label>
                                <input type="text" className="form-control" name="cvv" placeholder="123" maxLength="3"
                                       required/>
                            </div>

                        </div>

                        <p id="donateError" className="text-danger mt-3 mb-0"></p>

                        <div className="mt-4">
                            <LinkContainer to={`/explore/animals/`}>
                                <button className="btn btn-outline-primary px-5 py-2 me-2">Back</button>
                            </LinkContainer>
                            <button type="submit" className="btn btn-primary px-5 py-2">Donate</button>
                        </div>

                    </form>

                </div>

                {donateStatus? <DonateStatus /> : null}


            </div>
        )
    }

}

export default Donate;
