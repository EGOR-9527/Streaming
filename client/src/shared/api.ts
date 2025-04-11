import {makeAutoObservable } from "mobx"
import axios from "axios"

const API_URL = 'http://localhost:7000/api/';

class RestApi {
    user: any = null;
    error: any = null;
    isLoading: any = false;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: any) {
        this.user = user;
    }
    setError(error: any) {
        this.error = error;
    }
    setIsLoading(isLoading: any) {
        this.isLoading = isLoading;
    }

    saveToken(token: any) {
        localStorage.setItem('token', token);
    }

    getToken(){
        return localStorage.getItem('token');
    }

    removeToken() {
        localStorage.removeItem('token');
    }

    async registration(name: string, email: string, password: string, birthday: string) {
        this.isLoading(true);
        this.setError(null);
        try {

            const data: any = await axios.post(`${API_URL}registration`, {
                name, 
                email,
                password,
                birthday
            })

            this.saveToken(data.token)

            this.setUser(data.user)

        } catch(err: any) {
            this.setError(err);
        } finally {
            this.isLoading(false);
        }
    }

    async login(email: string, password: string) {
        this.isLoading(true);
        this.setError(null);
        try{

            const data: any = await axios.post(`${API_URL}login`, {
                email,
                password
            })

            this.saveToken(data.token)

            this.setUser(data.user)

        } catch(err: any){
            this.setError(err);
        } finally {
            this.isLoading(false);
        }
    }

}

const API = new RestApi();
export default API;