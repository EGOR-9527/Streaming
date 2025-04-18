import React from 'react';
import user from "../../../svg/user.svg"
import { observer } from 'mobx-react-lite';
import AuthStore from "../../../features/stores/AuthStore"

const Profil: React.FC = observer(() => {
    return (
        <img onClick={() => AuthStore.clickProfileManagement()} className='logoUser' src={user} alt="user"/>
    );
});

export default Profil;