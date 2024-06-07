import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

interface Response {
  message: string;
  respCode: number;
  data: [
    {
      asccessToken: string;
      user?: any;
    }
  ];
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Request() req) : Promise<Response>{
    return this.authService.login(req.body);
  }

  // @Post('register')
  // async register(@Body() body) {
  //   return this.authService.register(body);
  // }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
