import React from 'react';
import Header from "../widgets/Header"
import ScrollStreamers from "../widgets/ScrollStreamers"


const Home: React.FC = () => {
    return (
        <div>
            <Header/>
            <ScrollStreamers/>
        </div>
    );
};

export default Home;