import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { STATUS_CODES } from 'http';
import { Response } from 'src/utils/response';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private response: Response,
  ) {}

  create(body: CreateUserDto) {
    const user = this.repo.create(body);

    return this.repo.save(user);
  }

  async findAll() {
    const users = await this.repo.find();
    return this.response.success(users);
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  find(email: string) {
    return this.repo.findOne({ email });
  }

  async update(id: number, attributes: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) return this.response.fail('User was not found');

    Object.assign(user, attributes);

    await this.repo.save(user);

    return this.response.successMessage('user updated');
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
