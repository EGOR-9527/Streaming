import Error from "../Error/Error";
import token from "../service/tokenService/toke";
import { Request, Response, NextFunction } from "express";
import { User } from "../model/model";
import ServiceUser from "../service/user";

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    const userId = req.headers.userid as string;

    if (!accessToken || !userId) {
      throw Error.Unauthorized("Не предоставлены учетные данные", "accessToken и userId должны быть заполненными");
    }

    const isValid = await token.validateAccessToken(accessToken);
    if (isValid) {
      return next();
    }

    const user: any = await User.findOne({ 
      where: { id: userId },
    });

    if (!user) {
        throw Error.NotFound("Пользователь не найден", "Ошибка аунтификации");
    }

    const newTokens = await ServiceUser.refreshToken(user.token);
    
    res.status(200).json({
      success: true,
      tokens: newTokens,
      message: "Токены обновлены"
    });

  } catch (err: any) {
    console.error('Auth middleware error:', err);
    res.status(500).json(Error.Internal("Ошибка обналеия токенов", err));
  }
};

export default authMiddleware;