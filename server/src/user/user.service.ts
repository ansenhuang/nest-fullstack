import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { hashSync, compareSync } from 'bcryptjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async login(createUserDto: CreateUserDto) {
    const { username, password, role = 3, ...restValues } = createUserDto;
    const encryptedPwd = hashSync(createUserDto.password);
    const [user, created] = await this.userModel.findOrCreate({
      where: { username },
      defaults: {
        ...restValues,
        username,
        password: encryptedPwd,
        role,
      },
    });
    const resUser = user.get();
    if (!created && !compareSync(password, resUser.password)) {
      throw new BadRequestException('密码错误');
    }
    delete resUser.password;
    return resUser;
  }
}
