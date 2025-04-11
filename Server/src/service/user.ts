import { where } from "sequelize";
import token from "./tokenService/toke";
import Error from "../Error/Error";
import { User, Channel, StreamRecording } from "../model/model";
import * as crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import fs from "fs";
import toke from "./tokenService/toke";

class ServiceUser {
  async registration(
    name: string,
    email: string,
    password: string,
    birthday: string
  ) {
    try {
      const dataUser = await User.findOne({ where: { email } });

      if (dataUser) {
        throw Error.BadRequest("email уже существует", "введите другой email");
      }

      const userId = uuidv4();

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        id: userId,
        name: name,
        email: email,
        birthday: birthday,
        password: hashedPassword,
      });

      const accessToken: any = await token.generateTokens({
        email,
        userId,
      });

      return {token:accessToken, user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        birthday: newUser.birthday,
      }};
    } catch (err: any) {
      console.error("Ошибка регистрации:", err);

      throw Error.Internal(err.message, "Ошибка регистрации");
    }
  }

  async login(email: string, password: string) {
    try {
      const dataUser: any = await User.findOne({ where: { email } });

      if (!dataUser) {
        throw Error.NotFound("Пользователь не найден", "Ошибка аунтификации");
      }

      if (!bcrypt.compareSync(password, dataUser.password)) {
        throw Error.BadRequest("Неправильный пароль", "Ошибка аунтификации");
      }

      const newToken = await token.generateTokens({ email, userId: dataUser.id });

      return {token:newToken, user: {
        id: dataUser.id,
        name: dataUser.name,
        email: dataUser.email,
        birthday: dataUser.birthday,
      }};
    } catch (err: any) {
      console.error("Ошибка регистрации:", err);

      throw Error.Internal(err.message, "Ошибка аунтификации");
    }
  }

  async logout(refreshToken: string) {
    try {
      if (!refreshToken) {
        throw Error.BadRequest("Нет токена", "Ошибка аунтификации");
      }

      await token.removeToken(refreshToken);
    } catch (err: any) {
      console.error(err);
      throw Error.Internal(err.message, "Ошибка выхода");
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const user = await User.findOne({ where: { token: refreshToken } });

      if (!user) {
        throw Error.NotFound("Пользователь не найден", "Ошибка аунтификации");
      }

      const isValid = await token.validateRefreshToken(refreshToken);
      if (isValid) {
        return true;
      }

      const newTokens = await token.generateTokens({
        email: user.email,
        userId: user.id,
      });

      return newTokens;
    } catch (err: any) {
      console.error(err);
      throw Error.Internal(err.message, "Ошибка обновления токена:");
    }
  }

  async editedImg(avatarPath: string, userId: string) {
    try {
      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        throw Error.NotFound("Пользователь не найден", "Ошибка аунтификации");
      }

      const oldAvatarPath = user.img;

      if (oldAvatarPath) {
        const oldAvatarFullPath = path.join(__dirname, "../../", oldAvatarPath);
        if (fs.existsSync(oldAvatarFullPath)) {
          fs.unlinkSync(oldAvatarFullPath);
        }
      }

      const [updatedCount, [updatedUser]] = await User.update(
        { img: avatarPath },
        {
          where: { id: userId },
          returning: true,
        }
      );

      if (updatedCount === 0) {
        throw Error.NotFound(
          "Пользователь не найден",
          "Ошибка обновления аватарки"
        );
      }

      return updatedUser.get();
    } catch (err: any) {
      console.error(err);
      throw Error.Internal(err.message, "Ошибка обновления изображения");
    }
  }

  async editedName(name: string, userId: string) {
    try {

      const [updatedCount, [updatedUser]] = await User.update(
        { name: name },
        {
          where: { id: userId },
          returning: true,
        }
      );

      if (updatedCount === 0) {
        throw Error.NotFound(
          "Пользователь не найден",
          "Ошибка обновления имени"
        );
      }

      return updatedUser.get();
    } catch (err: any) {
      console.error(err);
      throw Error.Internal(err.message, "Ошибка обновления имени");
    }
  }
}

export default new ServiceUser();
