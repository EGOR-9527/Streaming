import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styled, { keyframes } from 'styled-components';
import api from '../../shared/api';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(20px); }
`;

const ErrorNotification = styled.div<{ hiding: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px;
  background-color: #ff4444;
  color: white;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: ${props => (props.hiding ? fadeOut : fadeIn)} 0.3s ease forwards;
`;

const ErrorComponent: React.FC = observer(() => {
    const [hiding, setHiding] = useState(false);

    useEffect(() => {
        if (api.error != null) {
            const timer = setTimeout(() => {
                setHiding(true);
                setTimeout(() => {
                    api.setError(null);
                    setHiding(false);
                }, 300); // время, равное длительности анимации fadeOut
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [api.error]);

    if (!api.error) return null;

    return (
        <ErrorNotification hiding={hiding}>
            {api.error.details ? <p>{api.error.details}</p> : <p>Произошла ошибка</p>}
        </ErrorNotification>
    );
});

export default ErrorComponent;