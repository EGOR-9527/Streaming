import dotenv from "dotenv";
import Erorr from "../../Error/Error";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../../model/model";

dotenv.config({ path: ".env" });

interface TokenPayload {
  userId: string;
  email: string;
}

class TokenService {
  async generateTokens(payload: TokenPayload): Promise<{ accessToken: string; }> {
    try {
      if (!process.env.JWT_ACCESS_KEY || !process.env.JWT_REFRESH_KEY) {
        throw Erorr.BadRequest("неверные ключи jwt", "Проверьте .env");
      }

      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
        expiresIn: "15m",
      });
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
        expiresIn: "7d",
      });

      await this.saveToken(refreshToken, payload.userId);
      return {accessToken};
    } catch (err: any) {
      console.error(err);
      throw Erorr.Internal("Ошибка генерации токенов", err.message);
    }
  }

  validateAccessToken(token: string) {
    try {
      const tokenData = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
      return jwt.verify(tokenData, process.env.JWT_ACCESS_KEY!);
    } catch (err: any) {
      throw Erorr.Internal("Ошибка валидации AccessToken", err.message);
    }
  }

  validateRefreshToken(token: string){
    try {
      const tokenData = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
      return jwt.verify(tokenData, process.env.JWT_REFRESH_KEY!);
    } catch (err: any) {
      throw Erorr.Internal("Ошибка валидации RefreshToken", err.message);
    }
  }

  async saveToken(refreshToken: string, userId: string) {
    try {
      const userRecord = await User.findOne({ where: { id: userId } }); // Предполагается, что поле идентификатора - это 'id'

      if (!userRecord) {
        throw Erorr.NotFound(
          "Пользователь не найден",
          "Возможно неверный userId или такого пользователя нет"
        );
      }

      userRecord.token = refreshToken;
      await userRecord.save();
      return userRecord;
    } catch (err: any) {
      console.error(err);
      throw Erorr.BadRequest(err.message, "Проверьте userId и token");
    }
  }

  async findToken(refreshToken: string) {
    return await User.findOne({ where: { token: refreshToken } });
  }

  async removeToken(refreshToken: string){
    const userRecord: any = await User.findOne({ where: { token: refreshToken } });
    if (userRecord) {
      userRecord.token = null;
      await userRecord.save();
    }
    return userRecord;
  }
}

export default new TokenService();