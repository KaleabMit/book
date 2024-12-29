export interface User{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password?: string;
    passwordConfirm?: string;
    photo: string;
    roles: string;
}