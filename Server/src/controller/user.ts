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
      const {refreshToken} = req.body;
      console.log(refreshToken)

      await ServiceUser.logout(refreshToken);
    } catch (err: any) {
      console.error(err);
      res.status(500).json(Error.Internal("Ошибка выхода", err.message));
    }
  }

  async editedImg(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;

      if (!req.file) {
        res
          .status(400)
          .json(
            Error.BadRequest(
              "Файл не загружен",
              "Необходимо отправить изображение"
            )
          );
      }

      const file: any = req.file;

      const avatarPath = `/imgs/${file.filename}`;
      const updatedUser = await ServiceUser.editedImg(avatarPath, userId);

      const fullImageUrl = `${req.protocol}://${req.get("host")}${avatarPath}`;

      res.status(200).json({
        success: true,
        avatar: fullImageUrl,
        user: updatedUser,
      });
    } catch (err: any) {
      console.error(err);
      res
        .status(500)
        .json(Error.Internal("Ошибка загрузки аватарки", err.message));
    }
  }

  async editedName(req: Request, res: Response): Promise<void> {
    try {
      const {name} = req.body;
      const userId = req.params.id;

      if (!name || !userId) {
        res
          .status(400)
          .json(
            Error.BadRequest(
              "Все поля должны быть заполнены",
              "Необходимо указать: name, email"
            )
          );
      }

      const newName = await ServiceUser.editedName(name, userId);

      res.status(201).json(newName)
    } catch (err: any) {
      console.error(err);
      res
        .status(500)
        .json(Error.Internal("Ошибка редактирования имени", err.message));
    }
  }
}

export default new ControllerUser();
