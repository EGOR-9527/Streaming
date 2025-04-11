import { useEffect } from "react";
import { observer } from 'mobx-react-lite';
import AuthStore from "../../stores/AuthStore"

const CheckToken = observer(() => {

    const checkToken = () => {
        const token = localStorage.getItem('token');

        AuthStore.checkToken(!!token)
    };

    useEffect(() => {
        checkToken();

        window.addEventListener('storage', checkToken);

        return () => {
            window.removeEventListener('storage', checkToken);
        };
    }, []);

    return null

})

export default CheckToken;