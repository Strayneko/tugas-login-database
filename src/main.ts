import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

import * as session from 'express-session';
import flash = require('connect-flash');
import * as exphbs from 'express-handlebars';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const viewsPath = join(__dirname, '../src/views');
  // set view engine to hbs and default layout to main
  app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main' }));
  // set default views folder location
  app.set('views', viewsPath);
  app.set('view engine', '.hbs');

  // set secret key
  app.use(
    session({
      secret: 'base64:bG0aFM7rdRmuVCbWdhgIP2oxhjgOkf/lCykyGbUoXuw=',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  // start local development server with the given port
  await app.listen(3000);
}
bootstrap();
