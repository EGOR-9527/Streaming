import { makeAutoObservable } from "mobx";

class ControllerAccountOptionsStore {

    Subscriptions: boolean = false
    Wallet: boolean = false
    Channel: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    clickWallet() {
        this.Wallet = true
        this.Subscriptions = false
        this.Channel = false
    }

    clickSubscriptions() {
        this.Wallet = false
        this.Subscriptions = true
        this.Channel = false
    }

    clickChannel() {
        this.Wallet = false
        this.Subscriptions = false
        this.Channel = true
    }

    clickController(name: string) {
        if (name === 'Канал') {
            this.clickChannel()
        } else if (name === 'Подписки') {
            this.clickSubscriptions()
        } else if (name === 'Кошелек') {
            this.clickWallet()
        } 
    }

}

const controllerAccountOptionsStore = new ControllerAccountOptionsStore()
export default controllerAccountOptionsStore;