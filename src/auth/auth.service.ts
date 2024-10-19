import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async signup(dto: AuthDto) 
    {
        try {
            const hash = await argon.hash(dto.password);
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
                select: {
                    id: true,
                    email: true,
                    createdAt: true
                }
            });

            return user;
        } catch(error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code == 'p2002') {
                    throw new ForbiddenException('Credentials Taken');
                }
            }

            throw error;
        }
    }

    signin(dto: AuthDto)
    {

    }
}