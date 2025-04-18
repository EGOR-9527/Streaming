import React, { useState } from 'react';
import MoveLogin from "../../../features/ButtonAuth/ButtonTransition/MoveLogin";
import Exit from "../../../features/ButtonAuth/ButtonExit/Exit";
import API from '../../../shared/api';
import AuthStore from "../../../features/stores/AuthStore"

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        await API.login(email, password);

        AuthStore.checkToken()
        AuthStore.clickExit()

    };

    return (
        <div className='ponel-login'>
            <header className='header-login'>
                <h1 className='title-header-login'>Войти в Zstream</h1>
                <Exit />
            </header>

            <input
                placeholder='Введите почту'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder='Введите пароль'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>Войти</button>
            <footer className='footer-Login'>
                <MoveLogin />
            </footer>
        </div>
    );
};

export default Login;