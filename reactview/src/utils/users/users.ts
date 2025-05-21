import ky from "ky";
interface User {
  surname: string;
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
}

interface APIResponse {
  statusCode: number;
  isSuccess: boolean;
  result: User | null;
  errorMessages?: string[];
}

export const fetchUsers = async () => {
  try {
    const response = await ky.get("https://localhost:7116/api/UserAPI").json<{
      statusCode: number;
      isSuccess: boolean;
      result: User[];
    }>();
    return response;
  } catch (e: any) {
    console.log(e);
  }
};

export const fetchUser = async (email: string): Promise<APIResponse> => {
  if (!email.trim()) {
    return {
      statusCode: 404,
      isSuccess: false,
      result: null,
      errorMessages: ["Email не может быть пустым"],
    };
  }

  try {
    const encodedEmail = encodeURIComponent(email); //перекодировка email в формат для запроса
    const url = `https://localhost:7116/api/UserAPI/${encodedEmail}`;

    const response = await ky.get(url);

    const data: APIResponse = await response.json();

    return data;
  } catch (error) {
    console.error("Ошибка при запросе пользователя:", error);

    // Неизвестная ошибка
    return {
      statusCode: 500,
      isSuccess: false,
      result: null,
      errorMessages: ["Неизвестная ошибка"],
    };
  }
};

export const fetchHashPassword = async (password: string) => {
  try {
    const encodedPassword = encodeURIComponent(password); //перекодировка email в формат для запроса
    const url = `https://localhost:7116/api/ServiceAPI/${encodedPassword}`;
    const response = await ky.get(url).json<{
      result: string;
    }>();
    return response.result;
  } catch (e: any) {
    console.log(e);
  }
};

export const createUser = async (userData: User): Promise<APIResponse> => {
  try {
    const response = await ky
      .post("https://localhost:7116/api/UserAPI", {
        json: userData,
      })
      .json<APIResponse>();

    return response;
  } catch (error: any) {
    return {
      statusCode: error.response?.status || 500,
      isSuccess: false,
      errorMessages: error,
      result: null,
    };
  }
};
