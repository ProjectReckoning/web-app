export interface User {
    id: string;
    name: string;
    phoneNumber?: string;
}

export interface GetMeResponse {
    ok: boolean;
    data: User;
    message?: string;
}