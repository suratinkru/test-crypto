import axios, { AxiosResponse } from "axios";

const BASE_URL = process.env.BASE_URL  || "http://localhost:4000";
const BASE_URL_AUTH = process.env.BASE_URL || "http://localhost:4000";

interface User {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface Login {
    username: string;
    password: string;
}

interface Response {
    message: string;
    respCode: number;
    data: [];
}

interface LoginResponse {
    message: string;
    respCode: number;
    data: [
        {
            asccessToken: string;
            user?: any;
        }
    ];
}

export const createUser = async (
    data: User
): Promise<AxiosResponse<Response>> => {
    try {
        const response: AxiosResponse<Response> = await axios.post(BASE_URL+'/api/users', {
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
        });

        return response;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
};

const login = async (data: Login): Promise<AxiosResponse<LoginResponse>> => {
    try {
        const response: AxiosResponse<LoginResponse> = await axios.post(
            BASE_URL_AUTH + "/api/auth/login",
            {
                username: data.username,
                password: data.password,
            }
        );

        return response;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
};
export { login };
