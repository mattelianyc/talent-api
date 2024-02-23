import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'; // Assume you have a users service

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === pass) { // Reminder: Use bcrypt for password comparison
      const { password, ...result } = user.toObject(); // Use toObject() if user is a Mongoose document
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    console.log('pay load mo fo : ', payload)
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
