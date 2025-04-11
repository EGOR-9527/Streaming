import { useEffect, useState } from "react";

const CheckToken = (): boolean => {
    const [isToken, setToken] = useState<boolean>(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        setToken(!!token)
    }, [])

    return isToken
}

export default CheckToken