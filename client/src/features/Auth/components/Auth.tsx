import React from 'react';
import { observer } from 'mobx-react-lite';
import authStore from '../../stores/AuthStore';

const Auth: React.FC = observer(() => {
    return (
        <div className='container-login-registration'>
            <button className='buttnLogo' onClick={() => authStore.clickLogin()}>Вход</button>
            <button className='buttonRegistration' onClick={() => authStore.clickRegistration()}>Регистрация</button>
        </div>
    );
});

export default Auth;