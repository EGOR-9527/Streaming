import { makeAutoObservable } from "mobx";
import api from "../../shared/api";

enum ActionNames {
    Channel = 'Канал',
    Subscriptions = 'Подписки',
    Wallet = 'Кошелек',
    Logout = 'Выход'
}

class ControllerAccountOptionsStore {
    api: typeof api;

    subscriptions: boolean = false;
    wallet: boolean = false;
    channel: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.api = api;
    }

    clickWallet() {
        this.wallet = true;
        this.subscriptions = false;
        this.channel = false;
    }

    clickSubscriptions() {
        this.wallet = false;
        this.subscriptions = true;
        this.channel = false;
    }

    clickChannel() {
        this.wallet = false;
        this.subscriptions = false;
        this.channel = true;
    }

    async clickLogout() {
        try {
            const token = localStorage.getItem('token');
            localStorage.removeItem("token");
    
            if (!token) {
                console.warn("Токен не найден. Пользователь уже вышел или токен не установлен.");
                return;
            }
    
            await this.api.logout(token);
            console.log("Пользователь успешно вышел.");
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        }
    }

    clickController(name: string) {
        const actions: { [key in ActionNames]: () => void } = {
            [ActionNames.Channel]: () => this.clickChannel(),
            [ActionNames.Subscriptions]: () => this.clickSubscriptions(),
            [ActionNames.Wallet]: () => this.clickWallet(),
            [ActionNames.Logout]: () => this.clickLogout(),
        };

        const action = actions[name as ActionNames];
        if (action) {
            action();
        } else {
            console.warn(`Действие "${name}" не найдено.`);
        }
    }
}

const controllerAccountOptionsStore = new ControllerAccountOptionsStore();
export default controllerAccountOptionsStore;