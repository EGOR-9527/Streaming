import React from 'react';
import Header from "../widgets/Header"
import ScrollStreamers from "../widgets/ScrollStreamers"
import AuthPonel from "../widgets/Auth/AuthPonel"
import ProfileManagement from "../widgets/UserDashboard/ProfileManagement"
import ControllerAccountOptions from "../widgets/AccountOptions/ControllerAccountOptions"


const Home: React.FC = () => {
    return (
        <div>
            <Header />
            <ScrollStreamers />

            <AuthPonel />
            <ProfileManagement />
            <ControllerAccountOptions />
        </div>
    );
};

export default Home;