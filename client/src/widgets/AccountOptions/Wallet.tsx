import React from 'react';

const Wallet: React.FC = () => {
    return (
        <div className='container-wallet'>
            <header className='header-wallet'>
                <h1>Мой Кошелек</h1>
            </header>

            <div className='body-wallet'>
                <div className="balance-section">
                    <div className="balance-info">
                        <h2>Текущий баланс</h2>
                        <p className="balance-amount">1000 ₽</p>
                    </div>

                    <div className="wallet-actions">
                        <button className='button-deposit'>Пополнить</button>
                        <button className='button-withdraw'>Вывести</button>
                    </div>
                </div>

                <div className="transaction-history">
                    <h2>История операций</h2>
                    <div className="transactions-list">
                        {Array(5).fill(null).map((_, index) => (
                            <div className="transaction" key={index}>
                                <div className="transaction-details">
                                    <span className="transaction-type">Пополнение</span>
                                    <span className="transaction-date">01.01.2023</span>
                                </div>
                                <span className="transaction-amount">+500 ₽</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;