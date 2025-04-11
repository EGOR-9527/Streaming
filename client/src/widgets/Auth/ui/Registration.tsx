import React, { useState } from 'react';
import MoveRegistration from "../../../features/ButtonAuth/ButtonTransition/MoveRegistration";
import Exit from "../../../features/ButtonAuth/ButtonExit/Exit";
import API from '../../../shared/api';
import AuthStore from "../../../features/stores/AuthStore"

const Registration: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [password, setPassword] = useState('');

    const handleRegistration = async () => {
        await API.registration(name, email, password, birthday);

        if (API.error) {
            alert('Registration failed: ' + API.error.message);
        }

        AuthStore.checkToken(true)
        AuthStore.clickExit()
    };

    return (
        <div className='ponel-registration'>
            <header className='header-registration'>
                <h1 className='title-header-registration'>Зарегестрируйтесь в Zstream</h1>
                <Exit />
            </header>

            <input
                placeholder='Введите ник'
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                placeholder='Введите почту'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder='Введите дату рождения'
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
            />
            <input
                placeholder='Введите пароль'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleRegistration}>Зарегистрироваться</button>
            <footer className='footer-registration'>
                <MoveRegistration />
            </footer>
        </div>
    );
};

export default Registration;