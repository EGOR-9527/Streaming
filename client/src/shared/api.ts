import { makeAutoObservable } from "mobx";
import axios from "axios";

const API_URL = "http://localhost:7000/api/";

class RestApi {
  user: any = null;
  error: any = null;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: any) {
    this.user = user;
  }

  setError(error: any) {
    this.error = error;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  saveToken(token: any) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  removeToken() {
    localStorage.removeItem("token");
  }

  async registration(
    name: string,
    email: string,
    password: string,
    birthday: string
  ) {
    this.setIsLoading(true);
    this.setError(null);
    try {

      const response: any = await axios.post(
        `http://localhost:7000/api/registration`,
        {
          name,
          email,
          password,
          birthday,
        }
      );

      console.log(response.data.token.accessToken)

      this.saveToken(response.data.token.accessToken);
      this.setUser(response.data.user);
    } catch (err: any) {
      this.setError(err);
    } finally {
      this.setIsLoading(false);
    }
  }

  async login(email: string, password: string) {
    this.setIsLoading(true);
    this.setError(null);
    try {
      const response: any = await axios.post(`${API_URL}login`, {
        email,
        password,
      });

      this.saveToken(response.data.token);
      this.setUser(response.data.user);
    } catch (err: any) {
      this.setError(err);
    } finally {
      this.setIsLoading(false);
    }
  }
}

const API = new RestApi();
export default API;
