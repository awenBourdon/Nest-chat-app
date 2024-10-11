import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './jwt.strategy';
import { CreateUserDto } from './dto/create-user.dto';
import { LogUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

    async login({ authBody }: { authBody: LogUserDto }) {
        const { email, password } = authBody;
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!existingUser) {
            throw new Error("L'utilisateur n'existe pas.");
        }

        const isPasswordValid = await this.isPasswordValid({
            password,
            hashedPassword: existingUser.password,
        });

        if (!isPasswordValid) {
            throw new Error("Mot de passe invalide.");
        }

        return await this.authenticateUser({
            userId: existingUser.id,
        });
    }

    async register({ registerBody }: { registerBody: CreateUserDto }) {
        try {
            const { email, name, password } = registerBody;

            const existingUser = await this.prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                throw new Error('Un compte existe déjà à cette adresse email.');
            }

            const hashedPassword = await this.hashPassword({ password });

            const createdUser = await this.prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                },
            });

            return this.authenticateUser({
                userId: createdUser.id,
            });
        } catch (error) {
            throw new Error('Erreur lors de l\'inscription.');
        }
    }

    private async hashPassword({ password }: { password: string }) {
        return await hash(password, 10);
    }

    private async isPasswordValid({
        password,
        hashedPassword,
    }: {
        password: string;
        hashedPassword: string;
    }) {
        return await compare(password, hashedPassword);
    }

    private authenticateUser({ userId }: UserPayload) {
        const payload: UserPayload = { userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
