import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TalentService } from './talent.service';
import { TalentController } from './talent.controller';
import { Talent, TalentSchema } from './schemas/talent.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Talent', schema: TalentSchema }]),
  ],
  providers: [TalentService],
  controllers: [TalentController],
  exports: [TalentService]
})
export class TalentModule {}
