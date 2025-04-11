import React from 'react';
import Profil from "../features/Auth/components/Profile"
import Auth from "../features/Auth/components/Auth"
import CheckToken from "../features/Auth/hooks/CheckToken"



const Index: React.FC = () => {
    const hookCheckToken = CheckToken()

    return (
        <div className='profil'>

            {hookCheckToken ? <Profil/> : <Auth/>}
            
        </div>
    );
};

export default Index;