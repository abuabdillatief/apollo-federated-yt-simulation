import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "apps/users/src/models/user.model";
import { IncomingMessage } from "http";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }


    async authenticate(token: string) {
        if (!token) {
            throw new UnauthorizedException();
        }

        const payload = await this.jwtService.verifyAsync(token, { secret: this.configService.get<string>('SECRET') })
        return payload
    }

    async generateToken(user: User): Promise<string> {
        return await this.jwtService.signAsync(user)
    }

    static getSecretKey(): string {
        return
    }
}