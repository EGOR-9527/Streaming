import React from 'react';
import Header from "../widgets/Header"
import ScrollStreamers from "../widgets/ScrollStreamers"
import AuthPonel from "../widgets/Auth/AuthPonel"


const Home: React.FC = () => {
    return (
        <div>
            <Header/>
            <ScrollStreamers/>
            <AuthPonel/>
        </div>
    );
};

export default Home;