import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import Account from './components/Account'
import Explore from './components/Explore'
import NavBar from './components/NavBar'
import Login from './components/Login'
import {logout} from "./services/apiServices";
import Community from "./components/Community";
import Donate from "./components/Donate";


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        };
    }

    handleLoginSuccess = () => {
        this.setState({isAuthenticated: true});
    };

    handleLogout = () => {
        // Call API service to log out
        logout().then(() => {
            this.setState({isAuthenticated: false});
        });
        //this.setState({isAuthenticated: false});
    };

    render() {
        return (
            <Router>
                {this.state.isAuthenticated ? (
                    <NavBar onLogout={this.handleLogout}/>
                ) :
                    null
                }
                <Routes>
                    <Route path="/" element={<Navigate replace to="/login"/>}/>
                    <Route path="/login" element={<Login onLoginSuccess={this.handleLoginSuccess}/>}/>
                    <Route path="/explore" element={
                        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                            <Explore/>
                        </ProtectedRoute>}/>
                    <Route path="/account" element={
                        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                            <Account/>
                        </ProtectedRoute>}/>



                    <Route path="/explore/animals" element={
                        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                            <Community/>
                        </ProtectedRoute>}/>
                    <Route path="/explore/animals/donate" element={
                        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                            <Donate/>
                        </ProtectedRoute>}/>



                </Routes>
            </Router>
        );
    }

}


export default App;


// let exploreDetails = [
//     {id: 1, name: "Community name", member: 10, charityName: "Charity name", charityDes: "xxx", featured: true},
// ];
//
//
// class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             exploreDetails: exploreDetails,
//         }
//     }
//
//     componentDidMount() {
//     fetch('http://127.0.0.1:8000/explore/')
//         .then(response => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })
//         .then(exploreJson => {
//           this.setState({ exploreDetails: exploreJson });
//         })
//         .catch(error => {
//           console.error('There has been a problem with your fetch operation:', error);
//         });
//   }
//
//
//     renderCommunities = (featured) => {
//         const exploreDetails = this.state.exploreDetails;
//         const featuredCommunities = [];
//         const nonFeaturedCommunities = [];
//
//         for (let i = 0; i < exploreDetails.length; i++) {
//             let exploreDetail = exploreDetails[i];
//
//             if (exploreDetail.featured) {
//                 featuredCommunities.push(
//                     <div className="col-lg-4 col-md-6 col-sm-12">
//                         <div className="card p-3 my-3 mx-1">
//                             <div className="card-body">
//                                 <h5 className="card-title"><strong>{exploreDetail.name}</strong></h5>
//                                 <p className="card-text text-muted"><small>{exploreDetail.member} members</small></p>
//                                 <hr/>
//                                 <p className="card-text mb-2"><small>Charity of the Month</small></p>
//                                 <h6 className="card-text"><strong>{exploreDetail.charityName}</strong></h6>
//                                 <p className="card-text">{exploreDetail.charityDes}</p>
//                                 <img className="img-fluid mb-4" src={require("./placeholder-image.jpg")}
//                                      alt="Community image"/>
//                                 <a href="#" className="btn btn-outline-primary w-100">View</a>
//                             </div>
//                         </div>
//                     </div>
//                 );
//             } else {
//                 nonFeaturedCommunities.push(
//                     <div className="col-lg-4 col-md-6 col-sm-12">
//                         <div className="card p-3 my-3 mx-1">
//                             <div className="card-body">
//                                 <h5 className="card-title"><strong>{exploreDetail.name}</strong></h5>
//                                 <p className="card-text text-muted"><small>{exploreDetail.member} members</small></p>
//                                 <hr/>
//                                 <p className="card-text mb-2"><small>Charity of the Month</small></p>
//                                 <h6 className="card-text mb-4"><strong>{exploreDetail.charityName}</strong></h6>
//                                 <a href="#" className="btn btn-outline-primary w-100">View</a>
//                             </div>
//                         </div>
//                     </div>
//                 );
//             }
//         }
//
//         if (featured) {
//             return featuredCommunities;
//         } else {
//             return nonFeaturedCommunities;
//         }
//
//     };
//
//
//     render() {
//         // This is the same as:
//         // const newItemText = this.state.newItemText;
//         // const todoList = this.state.todoList;
//         //const { showAddItemInput, newItemText } = this.state;
//
//         return (
//             <main className="container-fluid m-0 p-0 mb-5">
//
//                 <nav className="navbar navbar-light py-3 px-5">
//                     <a className="navbar-brand" href="#"><HouseHeartFill className="mx-1 mb-1"/>MyCharityApp</a>
//                     <div className="navbar-nav flex-row">
//                         <a className="nav-item nav-link active" href="#"><SearchHeartFill className="mx-1 mb-1"/>Explore</a>
//                         <a className="nav-item nav-link ms-3" href="#"><PersonFill className="mx-1 mb-1"/>Account</a>
//                         <a className="btn btn-outline-primary px-4 ms-4" href="#">Logout</a>
//                     </div>
//                 </nav>
//
//                 <div className="container p-5">
//
//                     {/*Explore page*/}
//                     <h2 className="mb-3">Explore</h2>
//                     <h5>Featured Communities</h5>
//                     <div className="card-deck">
//                         <div className="row">
//                             {this.renderCommunities(true)}
//                         </div>
//                     </div>
//                     <h5 className="mt-5">Our Communities</h5>
//                     <div className="card-deck">
//                         <div className="row">
//                             {this.renderCommunities(false)}
//                         </div>
//                     </div>
//
//                     {/*Account page*/}
//                     {/*<h2 className="mb-3">Hello, Username123</h2>*/}
//                     {/*<h5>Joined Communities</h5>*/}
//                     {/*<ul className="list-group col-lg-6 col-sm-12 mt-3">*/}
//                     {/*    <li className="list-group-item d-flex justify-content-between align-items-center py-3">*/}
//                     {/*        Lorem ipsum*/}
//                     {/*        <button className="btn btn-outline-primary px-5" href="#">View</button>*/}
//                     {/*    </li>*/}
//                     {/*</ul>*/}
//                     {/*<h5 className="mt-5">Donation History</h5>*/}
//                     {/*<ul className="list-group col-lg-12 mt-3">*/}
//                     {/*    <li className="list-group-item d-flex flex-wrap justify-content-between align-items-center py-3">*/}
//                     {/*        <div>Date</div>*/}
//                     {/*        <div><strong>Charity name</strong></div>*/}
//                     {/*        <div>Community name</div>*/}
//                     {/*        <div>$1234.56</div>*/}
//                     {/*    </li>*/}
//                     {/*</ul>*/}
//
//                     {/*Community page*/}
//                     {/*<div className="d-flex justify-content-between">*/}
//                     {/*    <div>*/}
//                     {/*        <h2 className="mb-3">Animal Charities</h2>*/}
//                     {/*        <p>xxx Members</p>*/}
//                     {/*        <button className="btn btn-outline-primary px-5" href="#">Leave</button>*/}
//                     {/*    </div>*/}
//                     {/*    <div className="card py-3 px-4">*/}
//                     {/*        <p className="my-1">Last month’s result (Month)</p>*/}
//                     {/*        <p className="my-1"><strong>Therapeutic Paws of Canada</strong></p>*/}
//                     {/*        <p className="my-1">Donated $1234.56 in total</p>*/}
//                     {/*    </div>*/}
//                     {/*</div>*/}
//                     {/*<div className="row my-5">*/}
//                     {/*    <div className="col-lg-6 pb-5">*/}
//                     {/*        <h6 className="">Charity of the Month</h6>*/}
//                     {/*        <h4 className=""><strong>Dogs with Wings Assistance Dog Society</strong></h4>*/}
//                     {/*        <p className="">Location</p>*/}
//                     {/*        <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod*/}
//                     {/*            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis*/}
//                     {/*            nostrud exercitation ullamco.</p>*/}
//                     {/*        <h6 className="mt-4"><strong>Donation Progress</strong></h6>*/}
//                     {/*        <h1 className=""><strong>$1234.56</strong></h1>*/}
//                     {/*        <div className="mt-4 ">*/}
//                     {/*            <button className="btn btn-outline-primary px-5 py-2 me-2" href="#">Visit Website*/}
//                     {/*            </button>*/}
//                     {/*            <button className="btn btn-primary px-5 py-2" href="#">Donate Now</button>*/}
//                     {/*        </div>*/}
//                     {/*    </div>*/}
//                     {/*    <div className="col-lg-6">*/}
//                     {/*        <img className="img-fluid" src={require("./placeholder-image.jpg")} alt="Community image"/>*/}
//                     {/*    </div>*/}
//                     {/*</div>*/}
//                     {/*<h5 className="">Words of Support</h5>*/}
//                     {/*<ul className="list-group list-group-flush col-lg-12 mt-3">*/}
//                     {/*    /!*loooooop*!/*/}
//                     {/*    <li className="list-group-item ps-0 mt-2">*/}
//                     {/*        <h6><strong>Username</strong></h6>*/}
//                     {/*        <p className="mb-1 text-muted"><small>Date</small></p>*/}
//                     {/*        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do*/}
//                     {/*            eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>*/}
//                     {/*    </li>*/}
//                     {/*    /!*loooooop*!/*/}
//                     {/*</ul>*/}
//                     {/*<textarea className="form-control mt-4" rows="3" placeholder="Show your support."></textarea>*/}
//                     {/*<button type="submit" className="btn btn-outline-primary px-5 py-2 my-3" href="#">Share</button>*/}
//                     {/*<h5 className="mt-5">Our Charities</h5>*/}
//                     {/*<div className="card-deck">*/}
//                     {/*    <div className="row">*/}
//                     {/*        /!*loooooop*!/*/}
//                     {/*        <div className="col-lg-4 col-md-6 col-sm-12">*/}
//                     {/*            <div className="card p-3 my-3 mx-1">*/}
//                     {/*                <div className="card-body">*/}
//                     {/*                    <h5 className="card-title"><strong>Charity name</strong></h5>*/}
//                     {/*                    <p className="card-text text-muted mb-2"><small>location</small></p>*/}
//                     {/*                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>*/}
//                     {/*                    <img className="img-fluid mb-4" src={require("./placeholder-image.jpg")} alt="Charity image"/>*/}
//                     {/*                    <a href="#" className="btn btn-outline-primary w-100">Visit Website</a>*/}
//                     {/*                </div>*/}
//                     {/*            </div>*/}
//                     {/*        </div>*/}
//                     {/*        /!*loooooop*!/*/}
//                     {/*    </div>*/}
//                     {/*</div>*/}
//
//
// {/*Login page*/
// }
// {/*<div className="col-lg-6 col-md-12 mt-5">*/
// }
// {/*    <div className="d-flex align-items-center">*/
// }
// {/*        <div className="me-4"><HouseHeartFill size={56}/></div>*/
// }
// {/*        <h1 className="mt-2">Welcome to MyCharityHub</h1>*/
// }
// {/*    </div>*/
// }
// {/*    <h4 className="mt-5">Login</h4>*/
// }
// {/*    <form>*/
// }
// {/*        <div className="form-group mt-4">*/
// }
// {/*            <label htmlFor="login_username">Username</label>*/
// }
// {/*            <input type="text" className="form-control" id="login_username"/>*/
// }
// {/*        </div>*/
// }
// {/*        <div className="form-group mt-3">*/
// }
// {/*            <label htmlFor="login_password">Password</label>*/
// }
// {/*            <input type="password" className="form-control" id="login_password"/>*/
// }
// {/*        </div>*/
// }
// {/*        <button type="submit" className="btn btn-primary px-5 mt-4">Login</button>*/
// }
// {/*    </form>*/
// }
// {/*    <div className="mt-4">*/
// }
// {/*        <small className="text-muted">Don’t have an account? <a href="#">Sign up</a></small>*/
// }
// {/*    </div>*/
// }
// {/*</div>*/
// }
//
//
//                     {/*Sign up page*/}
//                     {/*<div className="col-lg-6 col-md-12 mt-5">*/}
//                     {/*    <div className="d-flex align-items-center">*/}
//                     {/*        <div className="me-4"><HouseHeartFill size={56}/></div>*/}
//                     {/*        <h1 className="mt-2">Welcome to MyCharityHub</h1>*/}
//                     {/*    </div>*/}
//                     {/*    <h4 className="mt-5">Sign up</h4>*/}
//                     {/*    <form>*/}
//                     {/*        <div className="form-group mt-4">*/}
//                     {/*            <label htmlFor="signup_username">Username</label>*/}
//                     {/*            <input type="text" className="form-control" id="signup_username"/>*/}
//                     {/*        </div>*/}
//                     {/*        <div className="form-group mt-3">*/}
//                     {/*            <label htmlFor="signup_password">Password</label>*/}
//                     {/*            <input type="password" className="form-control" id="signup_password"/>*/}
//                     {/*        </div>*/}
//                     {/*        <div className="form-group mt-3">*/}
//                     {/*            <label htmlFor="signup_password2">Re-enter Password</label>*/}
//                     {/*            <input type="password" className="form-control" id="signup_password2"/>*/}
//                     {/*        </div>*/}
//                     {/*        <button type="submit" className="btn btn-primary px-5 mt-4">Sign up</button>*/}
//                     {/*    </form>*/}
//                     {/*    <div className="mt-4">*/}
//                     {/*        <small className="text-muted">Already have an account? <a href="#">Login</a></small>*/}
//                     {/*    </div>*/}
//                     {/*</div>*/}
//
//                     {/*Logout page*/}
//                     {/*<div className="col-lg-6 col-md-12 mt-5">*/}
//                     {/*    <div className="d-flex align-items-center">*/}
//                     {/*        <div className="me-4"><HouseHeartFill size={56}/></div>*/}
//                     {/*        <h1 className="mt-2">Thank you for visiting MyCharityHub</h1>*/}
//                     {/*    </div>*/}
//                     {/*    <h4 className="mt-5">Logout</h4>*/}
//                     {/*    <p className="">You have successfully logged out of the application.</p>*/}
//                     {/*    <button className="btn btn-primary px-5 mt-4">Login</button>*/}
//                     {/*</div>*/}
//
//
//                 </div>
//
//             </main>
//         );
//     }
// }



