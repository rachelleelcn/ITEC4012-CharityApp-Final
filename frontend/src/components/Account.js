import React, {Component} from "react";
import {LinkContainer} from "react-router-bootstrap";

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountCommunities: [],
            accountHistory: [],
        }
    }

    componentDidMount() {
        //fetch account communities
        fetch('http://127.0.0.1:8000/account_communities/', {
            credentials: 'include',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(accountCommunitiesJson => {
                this.setState({accountCommunities: accountCommunitiesJson});
                document.getElementById("userWelcome").innerHTML = "Hello, " + this.state.accountCommunities[0].user;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });

        //fetch account history
        fetch('http://127.0.0.1:8000/account_history/', {
            credentials: 'include',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(accountHistoryJson => {
                this.setState({accountHistory: accountHistoryJson});

            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });


    }

    renderUserCommunities = () => {
        const userCommunities = this.state.accountCommunities;
        const listItems = [];
        for (let i = 0; i < userCommunities.length; i++) {
            let item = userCommunities[i];
            listItems.push(
                <li className="list-group-item d-flex justify-content-between align-items-center py-3">
                    {item.community}
                    <LinkContainer to={`/explore/${(item.community).toLowerCase().split(" ").join("")}`}>
                        <div className="btn btn-outline-primary px-5">View</div>
                    </LinkContainer>
                </li>
            );
        }
        return listItems;
    }
    renderUserHistory = () => {
        const userHistory = this.state.accountHistory;
        const listItems = [];
        for (let i = 0; i < userHistory.length; i++) {
            let item = userHistory[i];
            listItems.push(
                // <li className="list-group-item d-flex flex-wrap justify-content-between align-items-center py-3">
                //     <div>{item.date}</div>
                //     <div><strong>{item.charityName}</strong></div>
                //     <div>{item.communityName}</div>
                //     <div>${item.amount}</div>
                // </li>
                <tr className="my-2">
                    <td>{item.date}</td>
                    <td><strong>{item.charityName}</strong></td>
                    <td>{item.communityName}</td>
                    <td>${item.amount}</td>
                </tr>
            );
        }
        return listItems;
    }

    render() {

        return (

            // Account page
            <div className="container p-5">
                <h2 className="mb-3" id="userWelcome"></h2>
                <h5>Joined Communities</h5>
                <ul className="list-group col-lg-6 col-sm-12 mt-3">
                    {this.renderUserCommunities()}
                </ul>
                <h5 className="mt-5">Donation History</h5>
                <div className="table-responsive-md mt-3 mb-5">
                    <table className="table">
                        <tbody>
                        {this.renderUserHistory()}
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }

}

export default Account;