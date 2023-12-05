import React, {Component} from "react";
import {LinkContainer} from "react-router-bootstrap";

class Animals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            community: {},
            charities: [],
            comments: [],
            newCommentText: ""
        }
    }

    componentDidMount() {
        //fetch community details
        fetch('http://127.0.0.1:8000/community_details/', {
            credentials: 'include',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(communityJson => {
                this.setState({community: communityJson});
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });

        //fetch community charities
        fetch('http://127.0.0.1:8000/community_charities/', {
            credentials: 'include',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(charitiesJson => {
                this.setState({charities: charitiesJson});
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });

        //fetch community comments
        fetch('http://127.0.0.1:8000/community_comments/', {
            credentials: 'include',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(commentsJson => {
                this.setState({comments: commentsJson});
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }


    leaveCommunity() {
        fetch(`http://127.0.0.1:8000/community_join/`, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    const newState = {...this.state.community, joined: false, member: this.state.community.member - 1};
                    this.setState({community: newState});
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('There has been a problem with your leave operation:', error);
            });
    }

    joinCommunity() {
        fetch(`http://127.0.0.1:8000/community_join/`, {
            method: 'POST',
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    const newState = {...this.state.community, joined: true, member: this.state.community.member + 1};
                    this.setState({community: newState});
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('There has been a problem with your join operation:', error);
            });
    }

    handleInputChange = (e) => {
        this.setState({newCommentText: e.target.value});
    }

    addComment = (event) => {
        event.preventDefault();

        const {newCommentText} = this.state;
        fetch(`http://127.0.0.1:8000/community_comments/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment: newCommentText,
            }),
        })
            .then(response => response.json())
            .then(newComment => {
                const newState = [...this.state.comments, newComment];
                this.setState({
                    comments: newState,
                    newCommentText: ''
                });
            })
            .catch(error => {
                console.error('There has been a problem with your share operation:', error);
            });
    }

    renderCharities = () => {
        const charities = this.state.charities;
        const listItems = [];
        for (let i = 0; i < charities.length; i++) {
            let item = charities[i];
            listItems.push(
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="card p-3 my-3 mx-1">
                        <div className="card-body">
                            <h5 className="card-title text-truncate"><strong>{item.name}</strong></h5>
                            <p className="card-text text-muted mb-2"><small>{item.location}</small></p>
                            <p className="card-text card-description">{item.description}</p>
                            <img className="img-fluid mb-4" src={require("../placeholder-image.jpg")}
                                 alt="Charity image"/>
                            <a href={item.website} className="btn btn-outline-primary w-100" target="_blank">Visit
                                Website</a>
                        </div>
                    </div>
                </div>
            );
        }
        return listItems;
    }

    renderComments = () => {
        const comments = this.state.comments;
        const listItems = [];
        for (let i = 0; i < comments.length; i++) {
            let item = comments[i];
            listItems.push(
                <li className="list-group-item ps-0 mt-2">
                    <h6><strong>{item.user}</strong></h6>
                    <p className="mb-1 text-muted"><small>{item.date}</small></p>
                    <p>{item.comment}</p>
                </li>
            );
        }
        return listItems;
    }


    render() {

        const {community, newCommentText} = this.state;

        return (

            // Account page
            <div className="container p-5">

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <LinkContainer to={`/explore`}>
                            <li className="breadcrumb-item"><a href="#">Explore</a></li>
                        </LinkContainer>
                        <li className="breadcrumb-item active" aria-current="page">Animals</li>
                    </ol>
                </nav>

                <div className="d-flex justify-content-between flex-wrap align-items-end">
                    <div>
                        <h2 className="mb-3">{community.name}</h2>
                        <p>{community.member} Members</p>

                        {community.joined ?
                            (<button className="btn btn-outline-primary px-5"
                                     onClick={() => this.leaveCommunity()}>Leave</button>) :
                            (<button className="btn btn-primary px-5"
                                     onClick={() => this.joinCommunity()}>Join</button>)
                        }


                    </div>
                    <div className="card py-3 px-4 mt-4">
                        <p className="my-1">Last month’s result ({community.lastMonth})</p>
                        <p className="my-1"><strong>{community.lastCharity}</strong></p>
                        <p className="my-1">Donated ${community.lastAmount} in total</p>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col-lg-6 pb-5">
                        <h6 className="">Charity of the Month</h6>
                        <h4 className=""><strong>{community.cotmName}</strong></h4>
                        <p className="">{community.cotmLocation}</p>
                        <p className="">{community.cotmDes}</p>
                        <h6 className="mt-4"><strong>Donation Progress</strong></h6>
                        <h1 className=""><strong>${community.progress}</strong></h1>
                        <div className="mt-4">
                            <a className="btn btn-outline-primary px-5 py-2 me-2" href={community.cotmWebsite}
                               target="_blank">Visit Website</a>

                            <LinkContainer to={`/explore/animals/donate`}>
                                <button className="btn btn-primary px-5 py-2">Donate Now</button>
                            </LinkContainer>

                        </div>
                    </div>
                    <div className="col-lg-6">
                        <img className="img-fluid" src={require("../placeholder-image.jpg")} alt="Community image"/>
                    </div>
                </div>
                <h5 className="">Words of Support</h5>
                <ul className="list-group list-group-flush col-lg-12 mt-3">
                    {this.renderComments()}
                </ul>
                <form onSubmit={this.addComment}>
                    <textarea className="form-control mt-4" rows="3" placeholder="Show your support."
                              onChange={this.handleInputChange} required value={newCommentText}/>
                    <button type="submit" className="btn btn-outline-primary px-5 py-2 my-3">Share</button>
                </form>

                <h5 className="mt-5">Our Charities</h5>
                <div className="card-columns">
                    <div className="row">
                        {this.renderCharities()}
                    </div>
                </div>

            </div>
        )
    }

}

export default Animals;