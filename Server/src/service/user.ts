import { where } from "sequelize";
import token from "./tokenService/toke";
import Error from "../Error/Error";
import { User, Channel, StreamRecording } from "../model/model";
import * as crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";

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

      await User.create({
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

      return accessToken;
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

      if(!bcrypt.compareSync(password, dataUser.password)){
        throw Error.BadRequest("Неправильный пароль", "Ошибка аунтификации");
      }

      await token.generateTokens({ email, userId: dataUser.id });

      return dataUser

    } catch (err: any) {
      console.error("Ошибка регистрации:", err);

      throw Error.Internal(err.message, "Ошибка аунтификации");
    }
  }
  
  async logout(refreshToken: string) {
    try{

      if(!refreshToken) {
        throw Error.BadRequest("Нет токена", "Ошибка аунтификации");
      }

      await token.removeToken(refreshToken);
      
    } catch(err: any){
      console.error(err);
      throw Error.Internal(err.message, "Ошибка выхода");
    }
  }

  async refreshToken(refreshToken: string) {
    try {

      const user = await User.findOne({ where: { token: refreshToken } });

      if(!user) {
        throw Error.NotFound("Пользователь не найден", "Ошибка аунтификации");
      }

      const isValid = await token.validateRefreshToken(refreshToken);
      if (isValid) {
        return true
      }

      const newTokens = await token.generateTokens({ email: user.email, userId: user.id });

      return newTokens

    } catch(err: any) {
      console.error(err);
      throw Error.Internal(err.message, "Ошибка обновления токена:");
    }
  }

}

export default new ServiceUser();
