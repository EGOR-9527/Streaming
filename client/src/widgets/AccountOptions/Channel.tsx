import React from 'react';

const Channel: React.FC = () => {
    return (
        <div className='container-channel'>

            <header className='header-channel'>

            </header>

            <div className='body-channel'>

                <div className="header-body-channel">

                    <div className="profil-img-name">
                        <img src="https://i.pravatar.cc/100" alt="profil" />
                        <p>name</p>
                    </div>

                    <button className='button-start-strimm'>Начать стрим</button>

                </div>
                
            </div>
            
        </div>
    );
};

export default Channel;