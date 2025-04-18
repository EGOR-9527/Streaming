import React from 'react';

const Subscriptions: React.FC = () => {
    return (
        <div className='container-subscriptions'>
            <header className='header-subscriptions'>
                <h1>Мои Подписки</h1>
            </header>

            <div className='body-subscriptions'>
                <div className="subscriptions-list">
                    {Array(10).fill(null).map((_, index) => (
                        <div className="subscription" key={index}>
                            <img src="https://i.pravatar.cc/100" alt="strimmer" />
                            Подписка {index + 1}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Subscriptions;