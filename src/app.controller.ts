import {
  Controller,
  Get,
  Post,
  Res,
  Render,
  UseGuards,
  Request,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';

import { LoginGuard } from './common/guards/login.guard';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.fitler';

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
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

  @Get('/logout')
  logout(@Res() res: Response, @Request() req): void {
    req.logout(() => res.redirect('/'));
  }
}
