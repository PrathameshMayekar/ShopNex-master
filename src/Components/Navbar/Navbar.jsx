import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import cart_icon_dark from '../Assets/cart_icon_dark.png';
import moonIcon from '../Assets/dark_mode.png';
import sunIcon from '../Assets/light_mode.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import Chatbot from '../Chatbot/Chatbot';

const Navbar = () => {
    const [icon, setIcon] = useState(cart_icon);
    const [menu, setMenu] = useState("shop");
    const [showChatbot, setShowChatbot] = useState(false); // State to toggle chatbot
    const { getTotalCartItems, theme, setTheme } = useContext(ShopContext);

    const toggle = () => {
        if (theme === "dark") {
            setTheme("light");
            setIcon(cart_icon_dark); // Set light mode cart icon
        } else {
            setTheme("dark");
            setIcon(cart_icon); // Set dark mode cart icon
        }
    };

    return (
        <div className={`navbar ${theme === 'dark' ? 'navbar-dark' : ''}`} id="nav">
            <div className="nav-logo">
                <Link className="nav-logo-link" to="/">
                    <img src={logo} alt="ShopNex Logo" style={{ marginRight: '10px' }} />
                    <p className={`pnav_${theme}`}>ShopNex</p>
                </Link>
            </div>
            <ul className="nav-menu">
                <li className={menu === "shop" ? "active" : ""} onClick={() => { setMenu("shop") }}>
                    <Link to='/'>Shop</Link>
                    {menu === "shop" ? <hr /> : null}
                </li>
                <li className={menu === "men" ? "active" : ""} onClick={() => { setMenu("men") }}>
                    <Link to='/men'>Men</Link>
                    {menu === "men" ? <hr /> : null}
                </li>
                <li className={menu === "women" ? "active" : ""} onClick={() => { setMenu("women") }}>
                    <Link to='/women'>Women</Link>
                    {menu === "women" ? <hr /> : null}
                </li>
                <li className={menu === "kids" ? "active" : ""} onClick={() => { setMenu("kids") }}>
                    <Link to='/kids'>Kids</Link>
                    {menu === "kids" ? <hr /> : null}
                </li>
            </ul>
            <div className="nav-login-cart">
                <Link to='/login'>
                    <button className={`log_btn ${theme === 'dark' ? 'log_btn-dark' : ''}`}>
                        Login
                    </button>
                </Link>
                <Link to='/cart'>
                    <img src={icon} alt="Cart Icon" className={`cart ${theme === 'dark' ? 'cart-dark' : 'cart-light'}`} />
                </Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
                <div className='dark_btn'>
                    <button onClick={toggle} className={`toggle_${theme} change`}>
                        {theme === 'light' ? <img src={sunIcon} alt="Sun Icon" /> : <img src={moonIcon} alt="Moon Icon" />}
                    </button>
                </div>
                {/* Add Chatbot toggle button */}
                <button className='chatbot-toggle' onClick={() => setShowChatbot(!showChatbot)}>
                    {showChatbot ? 'Close Chatbot' : 'Open Chatbot'}
                </button>
            </div>
            {/* Display Chatbot */}
            {showChatbot && <Chatbot setShowChatbot={setShowChatbot} />}
        </div>
    );
}

export default Navbar;
