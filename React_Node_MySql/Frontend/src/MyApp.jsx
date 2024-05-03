import React from 'react';
import ContactForm from "./components/ContactForm";
import NotFoundPage from './Pages/NotFoundPage';
import Footer from "./components/Footer";
import './assets/css/style.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage';
import ProfilePage from './Pages/ProfilePage';
import Layout from "./Components/Layout";
import Tutorial from './Pages/Tutorial';
import CoursesPage from './Pages/CoursesPage';
import "react-horizontal-scrolling-menu/dist/styles.css";


const MyApp = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element = {<HomePage/>}/>
                        <Route path = "/product/:id/:name" element = {<ProductPage/>}/>
                        <Route path = "/profile/:ID" element = {<ProfilePage/>}/>
                        <Route path = "/courses" element = {<CoursesPage/>}/>
                        <Route path = "/tutorial/:name" element = {<Tutorial/>}/>
                        <Route path = "*" element = {<NotFoundPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
  
            <ContactForm/>
            <Footer/>
        </div>
    );
};

export default MyApp;