import React from 'react';
import exit from "../../../svg/exit.svg"
import { observer } from 'mobx-react-lite';
import authStore from "../../stores/AuthStore";


const Exit: React.FC = observer(() => {
    return (
        <div className='button-exit'>
            <img onClick={() => authStore.clickExit()} className='exit' src={exit} alt="exit не загрузился" />
        </div>
    );
});

export default Exit;