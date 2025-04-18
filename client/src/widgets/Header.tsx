
import React from 'react';
import '../style/home.css';
import logo from "../svg/logo.svg"
import RenderAuthComponents from "../features/RenderAuthComponents"

const Header: React.FC = () => {
    return (
        <header className='main-header'>

            <img className='logo' src={logo} alt="Логотип не загрузился" />

            <div className="search">
                <input placeholder='Поиск...' type="text" />
                <button>Найти</button>
            </div>

            <RenderAuthComponents/>

        </header>
    );
};

export default Header;