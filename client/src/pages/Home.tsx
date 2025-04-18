import React from 'react';
import Header from "../widgets/Header"
import ScrollStreamers from "../widgets/ScrollStreamers"
import AuthPonel from "../widgets/Auth/AuthPonel"
import ProfileManagement from "../widgets/UserDashboard/ProfileManagement"
import ControllerAccountOptions from "../widgets/AccountOptions/ControllerAccountOptions"
import ErrorComponent from "../widgets/Error/Error"

const Home: React.FC = () => {
    return (
        <div>
            <Header />
            <ScrollStreamers />

            <ErrorComponent/>

            <AuthPonel />
            <ProfileManagement />
            <ControllerAccountOptions />
        </div>
    );
};

export default Home;