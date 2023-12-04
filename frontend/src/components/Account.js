import React from "react";

function Account() {
    return (

        // Account page
        <div className="container p-5">
            <h2 className="mb-3">Hello, Username123</h2>
            <h5>Joined Communities</h5>
            <ul className="list-group col-lg-6 col-sm-12 mt-3">
                <li className="list-group-item d-flex justify-content-between align-items-center py-3">
                    Lorem ipsum
                    <button className="btn btn-outline-primary px-5" href="#">View</button>
                </li>
            </ul>
            <h5 className="mt-5">Donation History</h5>
            <ul className="list-group col-lg-12 mt-3">
                <li className="list-group-item d-flex flex-wrap justify-content-between align-items-center py-3">
                    <div>Date</div>
                    <div><strong>Charity name</strong></div>
                    <div>Community name</div>
                    <div>$1234.56</div>
                </li>
            </ul>
        </div>
    )
}

export default Account;