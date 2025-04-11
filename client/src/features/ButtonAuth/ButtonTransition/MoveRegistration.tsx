import React from 'react';
import { observer } from 'mobx-react-lite';
import authStore from "../../../features/stores/AuthStore";

const MoveRegistration: React.FC = observer(() => {
    return (
        <button onClick={() => authStore.clickLogin()} className='button-move-registration'>Я зарегестрирован!</button>
    );
});

export default MoveRegistration;