import React, {Component} from "react";
import {LinkContainer} from 'react-router-bootstrap';

class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exploreDetails: [],
        }
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/explore/', {
            credentials: 'include',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(exploreJson => {
                this.setState({exploreDetails: exploreJson});
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }


    renderCommunities = (featured) => {
        const exploreDetails = this.state.exploreDetails;
        const featuredCommunities = [];
        const nonFeaturedCommunities = [];

        for (let i = 0; i < exploreDetails.length; i++) {
            let exploreDetail = exploreDetails[i];

            if (exploreDetail.featured) {
                featuredCommunities.push(
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="card p-3 my-3 mx-1">
                            <div className="card-body">
                                <h5 className="card-title"><strong>{exploreDetail.name}</strong></h5>
                                <p className="card-text text-muted"><small>{exploreDetail.member} members</small></p>
                                <hr/>
                                <p className="card-text mb-2"><small>Charity of the Month</small></p>
                                <h6 className="card-text  text-truncate"><strong>{exploreDetail.charityName}</strong></h6>
                                <p className="card-text card-description">{exploreDetail.charityDes}</p>
                                <img className="img-fluid mb-4" src={require("../placeholder-image.jpg")}
                                     alt="Community image"/>
                                <LinkContainer to={`/explore/${(exploreDetail.name).toLowerCase().split(" ").join("")}`}>
                                    <div className="btn btn-outline-primary w-100">View</div>
                                </LinkContainer>
                            </div>
                        </div>
                    </div>
                );
            } else {
                nonFeaturedCommunities.push(
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="card p-3 my-3 mx-1">
                            <div className="card-body">
                                <h5 className="card-title"><strong>{exploreDetail.name}</strong></h5>
                                <p className="card-text text-muted"><small>{exploreDetail.member} members</small></p>
                                <hr/>
                                <p className="card-text mb-2"><small>Charity of the Month</small></p>
                                <h6 className="card-text mb-4 text-truncate"><strong>{exploreDetail.charityName}</strong></h6>
                                <LinkContainer to={`/explore/${(exploreDetail.name).toLowerCase().split(" ").join("")}`}>
                                    <div className="btn btn-outline-primary w-100">View</div>
                                </LinkContainer>
                            </div>
                        </div>
                    </div>
                );
            }
        }

        if (featured) {
            return featuredCommunities;
        } else {
            return nonFeaturedCommunities;
        }

    };

    render() {

        return (
            // Explore page
            <div className="container p-5">
                <h2 className="mb-3">Explore</h2>
                <h5>Featured Communities</h5>
                <div className="card-deck">
                    <div className="row">
                        {this.renderCommunities(true)}
                    </div>
                </div>
                <h5 className="mt-5">Our Communities</h5>
                <div className="card-deck">
                    <div className="row">
                        {this.renderCommunities(false)}
                    </div>
                </div>
            </div>

        );
    }
}

export default Explore;