import React from 'react';
import ButtonProfileManagement from "../../entities/button-profile-management.json";
import { observer } from 'mobx-react-lite';
import ControllerAccountOptionsStore from "../../features/stores/ControllerAccountOptionsStore";
import AuthStore from "../../features/stores/AuthStore";


const ProfileManagement: React.FC = observer(() => {

    if (!AuthStore.isProfileManagement) {
        return null;
    }

    return (
        <div className='profile-management'>
            {ButtonProfileManagement.map((icon) => (
                <div
                    onClick={() => ControllerAccountOptionsStore.clickController(icon.name)}
                    className='block-management'
                    key={icon.name}
                >
                    <div
                        dangerouslySetInnerHTML={{ __html: icon.svg }}
                        className='svg-button-management'
                    />
                    <h3>{icon.name}</h3>
                </div>
            ))}
        </div>
    );
});

export default ProfileManagement;