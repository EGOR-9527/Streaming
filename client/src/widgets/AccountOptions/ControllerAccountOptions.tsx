import React from 'react';
import Subscriptions from "./Subscriptions";
import { observer } from 'mobx-react-lite';
import Wallet from "./Wallet";
import Channel from "./Channel";
import ControllerAccountOptionsStore from "../../features/stores/ControllerAccountOptionsStore";

const ControllerAccountOptions: React.FC = observer(() => {

    let componentToRender;

    if (ControllerAccountOptionsStore.channel) {
        componentToRender = <Channel />;
    } else if (ControllerAccountOptionsStore.wallet) {
        componentToRender = <Wallet />;
    } else if (ControllerAccountOptionsStore.subscriptions) {
        componentToRender = <Subscriptions />;
    } else {
        componentToRender = null;
    }

    return (
        <div className="wrapper-account-options">
            {componentToRender}
        </div>
    );
});

export default ControllerAccountOptions;