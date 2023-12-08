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
            isAuthenticated: false,
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
    };



    render() {
        return (
            <Router>
                {this.state.isAuthenticated ? ( <NavBar onLogout={this.handleLogout}/> ) : null }

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
                            <Community id={1}/>
                        </ProtectedRoute>}/>
                    <Route path="/explore/animals/donate" element={
                        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                            <Donate id={1}/>
                        </ProtectedRoute>}/>

                    <Route path="/explore/arts&culture" element={
                        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                            <Community id={2}/>
                        </ProtectedRoute>}/>
                    <Route path="/explore/arts&culture/donate" element={
                        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                            <Donate id={2}/>
                        </ProtectedRoute>}/>

                    <Route path="/explore/education" element={
                        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                            <Community id={3}/>
                        </ProtectedRoute>}/>
                    <Route path="/explore/education/donate" element={
                        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                            <Donate id={3}/>
                        </ProtectedRoute>}/>

                    <Route path="/explore/environment" element={
                        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                            <Community id={4}/>
                        </ProtectedRoute>}/>
                    <Route path="/explore/environment/donate" element={
                        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                            <Donate id={4}/>
                        </ProtectedRoute>}/>

                    <Route path="/explore/health" element={
                        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                            <Community id={5}/>
                        </ProtectedRoute>}/>
                    <Route path="/explore/health/donate" element={
                        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                            <Donate id={5}/>
                        </ProtectedRoute>}/>

                    <Route path="/explore/indigenouspeoples" element={
                        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                            <Community id={6}/>
                        </ProtectedRoute>}/>
                    <Route path="/explore/indigenouspeoples/donate" element={
                        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                            <Donate id={6}/>
                        </ProtectedRoute>}/>

                    <Route path="/explore/publicbenefit" element={
                        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                            <Community id={7}/>
                        </ProtectedRoute>}/>
                    <Route path="/explore/publicbenefit/donate" element={
                        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                            <Donate id={7}/>
                        </ProtectedRoute>}/>

                    <Route path="/explore/socialservices" element={
                        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                            <Community id={8}/>
                        </ProtectedRoute>}/>
                    <Route path="/explore/socialservices/donate" element={
                        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                            <Donate id={8}/>
                        </ProtectedRoute>}/>
                </Routes>
            </Router>
        );
    }
}


export default App;

