class HttpError {
  // 400: Неверный запрос
  static BadRequest(message: string, details: string) {
    return {
      status: 400,
      message: message,
      details: details,
    };
  }

  // 401: Неверный логин или пароль
  static Unauthorized(message: string, details: string) {
    return {
      status: 401,
      message: message,
      details: details,
    };
  }

  // 403: Доступ запрещен
  static Forbidden(message: string, details: string) {
    return {
      status: 403,
      message: message,
      details: details,
    };
  }

  // 404: Ресурс не найден
  static NotFound(message: string, details: string) {
    return {
      status: 404,
      message: message,
      details: details,
    };
  }

  // 500: Внутренняя ошибка сервера
  static Internal(message: string, details: string) {
    return {
      status: 500,
      message: message,
      details: details,
    };
  }
}

export default HttpError;