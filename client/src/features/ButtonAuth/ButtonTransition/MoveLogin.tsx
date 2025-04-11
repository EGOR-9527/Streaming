import React from 'react';
import { observer } from 'mobx-react-lite';
import authStore from "../../../features/stores/AuthStore";

const MoveLogin: React.FC = observer(() => {
    return (
<button onClick={() => authStore.clickRegistration()} className='button-move-login'>Я не зарегестрирован!</button>
    );
});

export default MoveLogin;