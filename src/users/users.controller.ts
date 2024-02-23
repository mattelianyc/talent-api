import { Body, Controller, Get, Post, Req, UseGuards, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto'; // Define this DTO
import { UpdateUserDto } from './dto/update-user.dto'; // Define this DTO
import { UsersService } from './users.service'; // Your users service

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // POST /users/register - User registration
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // GET /users/profile - Get current user's profile
  @UseGuards(AuthGuard('jwt')) // Protect this route
  @Get('profile')
  async getProfile(@Req() req) {
    return req.user;
  }

  // PUT /users/ - Update current user's profile
  @UseGuards(AuthGuard('jwt')) // Ensure this route is protected
  @Put()
  async updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.userId, updateUserDto);
  }
}
