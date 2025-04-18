import { makeAutoObservable } from "mobx";

class AuthStore {
  isLogin: boolean = false;
  isRegistration: boolean = false;
  isToken: boolean = false;
  isProfileManagement: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  clickLogin() {
    this.isLogin = true;
    this.isRegistration = false;
  }

  clickRegistration() {
    this.isLogin = false;
    this.isRegistration = true;
  }

  clickExit() {
    this.isLogin = false;
    this.isRegistration = false;
  }

  checkToken() {
    this.isToken = !!localStorage.getItem('token');
  }

  clickProfileManagement() {
    this.isProfileManagement = !this.isProfileManagement;
  }
}

const authStore = new AuthStore();
export default authStore;
