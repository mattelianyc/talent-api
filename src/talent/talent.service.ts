import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Talent } from './schemas/talent.schema';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';

@Injectable()
export class TalentService {
  constructor(@InjectModel('Talent') private talentModel: Model<Talent>) {}

  async create(createTalentDto: CreateTalentDto): Promise<Talent> {
    const createdTalent = new this.talentModel(createTalentDto);
    return createdTalent.save();
  }

  async findAll(): Promise<Talent[]> {
    return this.talentModel.find().exec();
  }

  async findOne(id: string): Promise<Talent> {
    const talent = await this.talentModel.findById(id).exec();
    if (!talent) {
      throw new NotFoundException(`Talent with ID "${id}" not found`);
    }
    return talent;
  }

  async update(id: string, updateTalentDto: UpdateTalentDto): Promise<Talent> {
    const updatedTalent = await this.talentModel.findByIdAndUpdate(id, updateTalentDto, { new: true }).exec();
    if (!updatedTalent) {
      throw new NotFoundException(`Talent with ID "${id}" not found`);
    }
    return updatedTalent;
  }

  async addContent(talentId: string, contentData): Promise<Talent> {
    const talent = await this.talentModel.findById(talentId);
    if (!talent) {
      throw new NotFoundException(`Talent with ID "${talentId}" not found`);
    }
    talent.content.push(contentData);
    return talent.save();
  }

  async removeContent(talentId: string, contentId: string): Promise<Talent> {
    const talent = await this.talentModel.findById(talentId);
    if (!talent) {
      throw new NotFoundException(`Talent with ID "${talentId}" not found`);
    }
    const contentIndex = talent.content.findIndex(c => c._id.toString() === contentId);
    if (contentIndex !== -1) {
      talent.content.splice(contentIndex, 1);
      await talent.save();
    }
    return talent;
  }

  async addSubscriptionTier(talentId: string, subscriptionTierData): Promise<Talent> {
    const talent = await this.talentModel.findById(talentId);
    if (!talent) {
      throw new NotFoundException(`Talent with ID "${talentId}" not found`);
    }
    talent.subscriptionTiers.push(subscriptionTierData);
    return talent.save();
  }

  async removeSubscriptionTier(talentId: string, subscriptionTierId: string): Promise<Talent> {
    const talent = await this.talentModel.findById(talentId);
    if (!talent) {
      throw new NotFoundException(`Talent with ID "${talentId}" not found`);
    }
    const tierIndex = talent.subscriptionTiers.findIndex(t => t._id.toString() === subscriptionTierId);
    if (tierIndex !== -1) {
      talent.subscriptionTiers.splice(tierIndex, 1);
      await talent.save();
    }
    return talent;
  }

  async remove(id: string): Promise<void> {
    const result = await this.talentModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Talent with ID "${id}" not found`);
    }
  }
}
