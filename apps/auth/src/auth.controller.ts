import {
  Controller,
  HttpException,
  HttpStatus,
  Ip,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import {
  ApiBody,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { string } from 'joi';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './users/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ description: 'login api' })
  @ApiUnauthorizedResponse({ description: 'cant login' })
  @ApiBody({
    type: class LoginDto {
      email: string;
      password: string;
    },
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passsthrough: true }) response: Response,
    @Ip() ipAddress: any,
    @Req() request: any,
  ) {
    const newUser = await this.authService.login(user, response, {
      ipAddress: ipAddress,
      userAgent: request.userAgent,
    });
    return { ...newUser, password: 'private' };
  }

  @ApiOperation({ description: 'logout api' })
  @UseGuards(LocalAuthGuard)
  @Post('logout')
  logout(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
    @Req() request: any,
  ) {
    return this.authService.logout(response, {
      refreshToken: request.cookies['RefreshToken'],
      user_id: user._id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: User) {
    return user;
  }

  @ApiOperation({ description: 'refresh api, send with cookies' })
  @Post('refresh')
  async refresh(
    @Req() request: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.refresh(request.cookies['RefreshToken'], response);
  }
}
