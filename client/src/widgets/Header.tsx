
import React from 'react';
import '../style/home.css';
import logo from "../svg/logo.svg"
import Index from "../features/Index"

const Header: React.FC = () => {
    return (
        <header>

            <img className='logo' src={logo} alt="Логотип не загрузился" />

            <div className="search">
                <input placeholder='Поиск...' type="text" />
                <button>Найти</button>
            </div>

            <Index/>

        </header>
    );
};

export default Header;