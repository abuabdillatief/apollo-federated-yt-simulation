import { User } from "apps/users/src/models/user.model";

export class AuthHeader {
    user:User
    authorization:string
}