export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    token?: string; // Optional token for authenticated users
}