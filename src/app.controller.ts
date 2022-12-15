import {
  Controller,
  Get,
  Post,
  Res,
  Render,
  UseGuards,
  Request,
  UseFilters,
  Body,
  Req,
} from '@nestjs/common';
import { Response } from 'express';

import { LoginGuard } from './common/guards/login.guard';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.fitler';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users/users.service';

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  constructor(private readonly userService: UsersService) {}
  @Get('/')
  async index(@Request() req, @Res() res) {
    if (req.user) res.redirect('/home');
    res.render('login', { message: req.flash('loginError') });
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  login(@Res() res: Response): void {
    res.redirect('/home');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/home')
  @Render('home')
  getHome(@Request() req) {
    return { user: req.user };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  @Render('profile')
  getProfile(@Request() req) {
    return { user: req.user };
  }

  @Get('/register')
  @Render('register')
  register() {
    return;
  }
  @Post('/register')
  async createUser(@Res() res: Response, @Req() req, @Body() request: UserDto) {
    await this.userService.createUser(request);
    req.flash('loginError', 'Register success!');
    res.redirect('/');
  }
  @Get('/logout')
  logout(@Res() res: Response, @Request() req): void {
    req.logout(() => res.redirect('/'));
  }
}
