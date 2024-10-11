import { UserService } from './../user/user.service';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestWithUser } from './jwt.strategy';
import { CreateUserDto } from './dto/create-user.dto';
import { LogUserDto } from './dto/login-user.dto';


// 1. Envoie un mdp et un email
// 2. L'API renvoie un token sécurisé "token123" 
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}
    @Post('login')
    async login(@Body() authBody: LogUserDto) {
        return await this.authService.login({
            authBody,
        })
    }


    @Post('register')
    async register(@Body() registerBody: CreateUserDto) {
        console.log({registerBody});
        return await this.authService.register({
            registerBody,
        })
    }

// 3. On renvoie notre token sécurisé "token123"
// Pour utiliser JWTStrategy
// On utilise un guard via JWT pour contrôler l'accès aux routes
@UseGuards(JwtAuthGuard)
    @Get()
    async authenticateUser( @Request() request: RequestWithUser ){    // Le paramètre request sert ici à injecter l'objet de requête HTTP dans le contrôleur (c-à-d accéder aux information)
        // token123 => test@gmail.com
        return await this.userService.getUser({
            userId: request.user.userId,
        }) ;
    }
}
