import React from 'react';
import Profil from "../features/Auth/components/Profile"
import Auth from "../features/Auth/components/Auth"
import { observer } from 'mobx-react-lite';
import AuthStore from "./stores/AuthStore"


const Index: React.FC = observer(() => {
    const hookCheckToken = AuthStore.isToken

    return (
        <div className='profil'>

            {hookCheckToken ? <Profil/> : <Auth/>}
            
        </div>
    );
});

export default Index;