import { makeAutoObservable } from "mobx";

class AuthStore {
  isLogin: boolean = false;
  isRegistration: boolean = false;
  isToken: boolean = false;

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

  checkToken(answer: boolean) {
    this.isToken = answer;
  }
}

const authStore = new AuthStore();
export default authStore;
