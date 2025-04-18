import React from 'react';
import Profil from "./Auth/components/Profile"
import Auth from "./Auth/components/Auth"
import { observer } from 'mobx-react-lite';
import AuthStore from "./stores/AuthStore"


const RenderAuthComponents: React.FC = observer(() => {
    AuthStore.checkToken()
    
    const hookCheckToken = AuthStore.isToken

    return (
        <div className='profil'>

            {hookCheckToken ? <Profil/> : <Auth/>}
            
        </div>
    );
});

export default RenderAuthComponents;