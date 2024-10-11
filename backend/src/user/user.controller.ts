import { UserService } from './user.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UserController {
    constructor (private userService: UserService) {}
    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Get(':userId')
    getUser(@Param('userId') userId: string) {
        return this.userService.getUser({
            userId
        });
    }
}
