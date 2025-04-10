
import React from 'react';
import '../style/home.css';
import logo from "../svg/logo.svg"
import Profil from "../features/Profil"

const Header: React.FC = () => {
    return (
        <header>

            <img className='logo' src={logo} alt="Логотип не загрузился" />

            <div className="search">
                <input placeholder='Поиск...' type="text" />
                <button>Найти</button>
            </div>

            <Profil/>

        </header>
    );
};

export default Header;