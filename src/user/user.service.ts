import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const database: User[] = [];
let id = 0;

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto)

    user.id = ++id;

    database.push(user);

    return user;
  }

  findAll() {
    return database;
  }

  findOne(id: number) {
    return database.find(user => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = database.find(user => user.id === id);
    if (user) {
      Object.assign(user, updateUserDto);
      database.splice(database.findIndex(u => u.id === id), 1, user);
    }
    return user;
  }

  remove(id: number) {
    const index = database.findIndex(user => user.id === id);
    if (index !== -1) {
      database.splice(index, 1);
      return true;
    }
    return false;
  }
}
