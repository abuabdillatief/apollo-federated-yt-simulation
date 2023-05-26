import { DynamicModule, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ClientsModule } from "@nestjs/microservices";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {
    static register(): DynamicModule {
        return {
            module: AuthModule,
            imports: [
                JwtModule.registerAsync({
                    imports: [ConfigModule],
                    useFactory: async (configService: ConfigService) => ({
                        secret: configService.get<string>('SECRET'),
                    }),
                    inject: [ConfigService],
                })
            ]
        }
    }
}