import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { UsersService } from "./users/users.service";
import { CurrentUserId } from "./decorators/current-user-id.decorator";
import { CurrentUser } from "./decorators/current-user.decorator";
import { BasicAuthGuard } from "./auth/guards/basic-auth.guard";

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@CurrentUser() user) {
    const tokens = await this.authService.login(user);
    //tokens.refresh_token в cookies
    return { access_token: tokens.access_token }
  }
  // async login(@Request() req) {
  //   const tokens = await this.authService.login(req.user);
  //   //tokens.refresh_token в cookies
  //   return { access_token: tokens.access_token }
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUserId() userId:number) {
    const user = await this.usersService.findById(userId)
    // @ts-ignore
    const { password, ...result } = user;
    return result;
  }
  // getProfile(@Request() req) {
  //   const user = this.usersService.findById(req.user.id)
  //   return user;
  // }

  @UseGuards(BasicAuthGuard)
  @Get('basic')
  supperAdmin(){
    return { ok:true }
}

}
