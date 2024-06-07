import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './auth.dto';

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


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  // async register(user: any) {
  //   return this.userService.create(user);
  // }

  async login(body: LoginDto): Promise<Response> {
    const { username, password }: LoginDto = body;
    try {
      const chenck = await this.validateUser(username, password);

      const payload = { username: chenck.username, sub: chenck.id };

      const resp: Response = {
        message: '',
        respCode: 0,
        data: [{ asccessToken: '' }]
      };

      if (!chenck) {
        resp.message = 'Invalid username or password';
        resp.respCode = 400;
        return resp;
      }

      // ตัด password ออก ไม่ส่งกลับไป
      delete chenck.password;
      
      resp.message = 'Login successful';
      resp.respCode = 200;
      resp.data = [
        {
          asccessToken: this.jwtService.sign(payload),
          user: chenck
        }
      ];
      
      return resp;
    
    } catch (error) {
      
      const resp: Response = {
        message: error.message,
        respCode: 400,
        data: [
          {
            asccessToken: ''
          }
        ]
      };
      
      return resp;
    }
  }
}
