import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports:[
        PrismaModule,
        JwtModule.register({}),
        ConfigModule.forRoot({isGlobal: true})
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule{}