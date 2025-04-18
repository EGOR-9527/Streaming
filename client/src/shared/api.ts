import { makeAutoObservable, runInAction } from "mobx";
import axios, { AxiosError } from "axios";

const API_URL = "http://localhost:7000/api/";

interface User {
  id: string;
  name: string;
  email: string;
  birthday?: string;
}

interface ServerError {
  status: number;
  message: string;
  details?: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

class RestApi {
  user: User | null = null;
  error: ServerError | null = null;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: User | null) {
    this.user = user;
  }

  setError(error: unknown) {
    let errorData: ServerError | null = null;

    if (axios.isAxiosError(error)) {
      if (error.response) {
        const responseData = error.response.data;

        if (responseData && typeof responseData === "object") {
          errorData = {
            status: error.response.status,
            message: responseData.message || "Ошибка сервера",
            details: responseData.details || JSON.stringify(responseData),
          };
        } else {
          errorData = {
            status: error.response.status,
            message: this.getDefaultErrorMessage(error.response.status),
            details:
              typeof responseData === "string"
                ? responseData
                : "Неизвестная ошибка",
          };
        }
      } else {
        errorData = {
          status: 0,
          message: "Ошибка сети",
          details: error.message || "Не удалось подключиться к серверу",
        };
      }
    } else if (error instanceof Error) {
      errorData = {
        status: 0,
        message: "Ошибка приложения",
        details: error.message,
      };
    }

    runInAction(() => {
      this.error = errorData;
      console.error("API Error:", errorData);
    });
  }

  private getDefaultErrorMessage(status: number): string {
    const messages: Record<number, string> = {
      400: "Некорректный запрос",
      401: "Не авторизован",
      403: "Доступ запрещен",
      404: "Ресурс не найден",
      409: "Конфликт данных",
      422: "Ошибка валидации",
      500: "Ошибка сервера",
      503: "Сервис недоступен",
    };

    return messages[status] || `Произошла ошибка (код ${status})`;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  saveToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken(): string | null {
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
  ): Promise<void> {
    this.setIsLoading(true);
    this.setError(null);

    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}registration`,
        { name, email, password, birthday }
      );

      this.saveToken(response.data.token);
      this.setUser(response.data.user);
    } catch (error) {
      this.setError(error);
    } finally {
      this.setIsLoading(false);
    }
  }

  async login(email: string, password: string): Promise<void> {
    this.setIsLoading(true);
    this.setError(null);

    try {
      const response = await axios.post<AuthResponse>(`${API_URL}login`, {
        email,
        password,
      });

      this.saveToken(response.data.token);
      this.setUser(response.data.user);
    } catch (error) {
      this.setError(error);
      // Пример ошибки, которую будет обрабатывать код:
      // {
      //   status: 400,
      //   message: 'Неправильный пароль',
      //   details: 'Ошибка аунтификации'
      // }
    } finally {
      this.setIsLoading(false);
    }
  }

  async logout(refreshToken: string): Promise<void> {
    this.setIsLoading(true);
    this.setError(null);

    try {
      await axios.post(`${API_URL}logout`, { refreshToken });
      this.removeToken();
      this.setUser(null);
    } catch (error) {
      this.setError(error);
    } finally {
      this.setIsLoading(false);
    }
  }
}

const api = new RestApi();
export default api;
