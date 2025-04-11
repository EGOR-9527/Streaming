import React from 'react';
import { observer } from 'mobx-react-lite';
import Login from "./ui/Login";
import Registration from "./ui/Registration";
import authStore from "../../features/stores/AuthStore";
const AuthPonel: React.FC = observer(() => {
    return (
        <div className={authStore.isLogin == true || authStore.isRegistration == true ? 'background' : ''}>
            {authStore.isLogin ? <Login /> : null}
            {authStore.isRegistration ? <Registration /> : null}
        </div>
    );
});

export default AuthPonel;