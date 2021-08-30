import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from './entities/user.entity';
import { idTypesEnum } from './enums/id-types.enums';
import { IUser } from './interfaces/user.interface';
import CreateUserDto from './dto/create-user.dto';

@Injectable()
export default class UserService {
  constructor(@InjectModel('User') private userRepository: Model<UserEntity>) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const id_type = createUserDto.id.includes('@')
      ? idTypesEnum.email
      : idTypesEnum.phone;
    if (id_type === idTypesEnum.phone) {
      createUserDto.id = createUserDto.id.replace(/\D/g, '');
    } else {
      createUserDto.id = createUserDto.id.toLowerCase();
    }
    return this.userRepository.create({ id_type, ...createUserDto });
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const id_type = id.includes('@') ? idTypesEnum.email : idTypesEnum.phone;
    if (id_type === idTypesEnum.phone) {
      id = id.replace(/\D/g, '');
    } else {
      id = id.toLowerCase();
    }
    return this.userRepository.findOne({ id });
  }

  async remove(id: string) {
    return this.userRepository.findByIdAndRemove(id);
  }

  async info(id: string) {
    const user = await this.findOne(id);
    return `${user.id_type}: ${user.id}`;
  }
}
