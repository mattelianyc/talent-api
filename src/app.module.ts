import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StripeModule } from './account/stripe.module';
import { PaymentsController } from './account/payments.controller';
import { AccountModule } from './account/account.module';
import { SeederModule } from './common/seeders/seeder.module';
import { TalentModule } from './talent/talent.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config globally available
    }),
    UsersModule, 
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/talent'),
    StripeModule,
    AccountModule,
    SeederModule,
    TalentModule,
  ],
  controllers: [AppController, PaymentsController],
  providers: [AppService],
})
export class AppModule {}
