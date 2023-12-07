import React, {Component} from "react";
import {LinkContainer} from "react-router-bootstrap";
import DonateStatus from "./DonateStatus";
import {communityDetails, donate} from "../services/apiServices";


class Donate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            donateStatus: false,
            community: {},
            communityNav: "",
        }
    }


    componentDidMount() {
        //fetch community details
        communityDetails(this.state.id)
            .then(communityJson => {
                this.setState({community: communityJson});
                this.setState({communityNav: (this.state.community.name).toLowerCase().split(" ").join("")});
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }




    makeDonation = (event) => {
        event.preventDefault();
        const amount = document.getElementById("amount").value;

        donate(amount, this.state.id)
            .then(response => {
                if (response.ok) {
                    document.getElementById("donateError").innerHTML = "";
                    this.setState({donateStatus: true});
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

        const {donateStatus, community, communityNav} = this.state;
        return (
            // Donate page
            <div className="container p-5">

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <LinkContainer to={`/explore`}>
                            <li className="breadcrumb-item"><a href="#">Explore</a></li>
                        </LinkContainer>
                        <LinkContainer to={`/explore/${communityNav}`}>
                            <li className="breadcrumb-item"><a href="#">{community.name}</a></li>
                        </LinkContainer>
                        <li className="breadcrumb-item active" aria-current="page">Donate</li>
                    </ol>
                </nav>

                <div className="col-lg-6 col-md-12 mt-5">
                    <h5 className="mb-2">Your help means a lot!</h5>
                    <h2 className="mb-2">Donate to {community.cotmName}</h2>

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
                                   minLength="8" maxLength="19" pattern="\d*" required/>
                        </div>
                        <div className="form-row d-flex flex-wrap">
                            <div className="form-group mt-3 me-2">
                                <label>Expiry Date</label>
                                <input type="text" className="form-control" name="expiry" placeholder="MMYY"
                                       minLength="4" maxLength="4" pattern="\d*" required/>
                            </div>
                            <div className="form-group mt-3">
                                <label>CVV/CVC</label>
                                <input type="text" className="form-control" name="cvv/cvc" placeholder="123"
                                       minLength="3" maxLength="3" pattern="\d*"
                                       required/>
                            </div>

                        </div>

                        <p id="donateError" className="text-danger mt-3 mb-0"></p>

                        <div className="mt-4">
                            <LinkContainer to={`/explore/${communityNav}`}>
                                <button className="btn btn-outline-primary px-5 py-2 me-2">Back</button>
                            </LinkContainer>
                            <button type="submit" className="btn btn-primary px-5 py-2">Donate</button>
                        </div>
                    </form>
                </div>
                {donateStatus ? <DonateStatus community={community.name}/> : null}

            </div>
        )
    }

}

export default Donate;
