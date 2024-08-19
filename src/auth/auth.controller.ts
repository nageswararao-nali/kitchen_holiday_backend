// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string, password: string, userType: string }) {
    let resp = await this.authService.login(body.username, body.password, body.userType);
    let response = {
      success: true,
      message: 'User Loggedin',
      data: {}
    }
    if(!resp) {
      response.success = false
      response.message = "Invalid Username or Password!"
    } else {
      response.data = resp
    }
    return response
  }
}
