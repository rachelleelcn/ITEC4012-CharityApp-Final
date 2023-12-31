import React, {Component} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {accountCommunities, accountHistory} from "../services/apiServices";

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountCommunities: [],
            accountHistory: [],
        }
    }

    componentDidMount() {
        //fetch user joined communities
        accountCommunities()
            .then(accountCommunitiesJson => {
                this.setState({accountCommunities: accountCommunitiesJson});
                document.getElementById("userWelcome").innerHTML = "Hello, " + this.state.accountCommunities[0].user;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });

        //fetch user donation history
        accountHistory()
            .then(accountHistoryJson => {
                this.setState({accountHistory: accountHistoryJson});
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }

    // render user joined communities
    renderUserCommunities = () => {
        const userCommunities = this.state.accountCommunities;
        const listItems = [];

        if (userCommunities.length) {
            for (let i = 0; i < userCommunities.length; i++) {
                let item = userCommunities[i];
                listItems.push(
                    <li className="list-group-item d-flex justify-content-between align-items-center py-3 flex-wrap">
                        {item.community}
                        <LinkContainer to={`/explore/${(item.community).toLowerCase().split(" ").join("")}`}>
                            <div className="btn btn-outline-primary px-5">View</div>
                        </LinkContainer>
                    </li>
                );
            }
        } else {
            listItems.push(
                <p>You have not joined any communities yet.</p>
            )
        }


        return listItems;
    }

    // render user donation history
    renderUserHistory = () => {
        const userHistory = this.state.accountHistory;
        const listItems = [];

        if (userHistory.length) {
            for (let i = 0; i < userHistory.length; i++) {
                let item = userHistory[i];
                listItems.push(
                    <tr className="my-2">
                        <td>{item.date}</td>
                        <td><strong>{item.charityName}</strong></td>
                        <td>{item.communityName}</td>
                        <td>${item.amount}</td>
                    </tr>
                );
            }
        } else {
            listItems.push(
                <p>You have not made any donations yet.</p>
            )
        }

        return listItems;
    }

    render() {

        return (
            // account page
            <div className="container p-5">
                <h2 className="mb-3" id="userWelcome"></h2>

                {/* joined communities */}
                <h5>Joined Communities</h5>
                <ul className="list-group col-lg-6 col-sm-12 mt-3">
                    {this.renderUserCommunities()}
                </ul>

                {/* donation history */}
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