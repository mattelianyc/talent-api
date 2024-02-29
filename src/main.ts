import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging/logging.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { SeederService } from './common/seeders/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const seeder = app.get(SeederService);
  // await seeder.seed();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors();
  app.enableCors({
    origin: "*", // Adjust the origin according to your frontend's actual origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Accept",
  });
  await app.listen(3000);
}
bootstrap();