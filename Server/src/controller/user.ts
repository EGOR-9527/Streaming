import { Request, Response } from "express";
import Error from "../Error/Error";
import ServiceUser from "../service/user";

class ControllerUser {
  async registration(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, birthday } = req.body;

      if (!name || !email || !password || !birthday) {
        res
          .status(400)
          .json(
            Error.BadRequest(
              "Все поля должны быть заполнены",
              "Необходимо указать: name, email, password и birthday"
            )
          );
      }

      const data = await ServiceUser.registration(
        name,
        email,
        password,
        birthday
      );

      res.status(201).json(data);
    } catch (err: any) {
      console.error(err);
      res.status(500).json(Error.Internal("Ошибка регистрации", err.message));
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res
          .status(400)
          .json(
            Error.BadRequest(
              "Все поля должны быть заполнены",
              "Необходимо указать: email, password"
            )
          );
      }

      const data = await ServiceUser.login(email, password);

      res.status(201).json(data);
    } catch (err: any) {
      console.error(err);
      res.status(500).json(Error.Internal("Ошибка авторизации", err.message));
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {

      const refreshToken: any = req.headers.authorization;

      await ServiceUser.logout(refreshToken);

    } catch(err: any) {
      console.error(err);
      res.status(500).json(Error.Internal("Ошибка выхода", err.message));
    }
  }
}

export default new ControllerUser();
