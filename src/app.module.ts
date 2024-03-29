import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config globally available
    }),
    UsersModule, 
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/talent'),    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
