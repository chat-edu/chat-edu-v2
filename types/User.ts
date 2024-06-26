// used on the client side to create a new user
export interface UserInput {
    id: string;
    name: string;
    email: string;
    username: string;
    profilePictureUrl: string;
    role: UserRoles;
}

// used on the client side to display a user
export interface User extends UserInput {
    verified: boolean;
    isOnboarded: boolean;
}

export enum UserRoles {
    STUDENT = "student",
    TEACHER = "teacher"
}