import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

interface Response {
  message: string;
  respCode: number;
  data: [];
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getCredit(request: any): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { id: request['user'].sub } });
    return { credit: user.credit };
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const options: FindOneOptions<User> = {
      where: { id: id }
  };

    return await this.usersRepository.findOne(options);
  }

  async create(user: User): Promise<Response> {
    try {
    
      user.password = await bcrypt.hash(user.password, 10);
      await this.usersRepository.save(user);

      const resp: Response = {
        message: '',
        respCode: 0,
        data: []
      };

      resp.message = 'User created successfully';
      resp.respCode = 201;
      return resp;
      
    } catch (error) { 

      const resp: Response = {
        message: error.message,
        respCode: 400 ,
        data: []
      };
       
      return resp;
    }

  }

  async update(id: number, user: User): Promise<User> {
    
    user.password = await bcrypt.hash(user.password, 10);
    await this.usersRepository.update(id, user);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { username: username } });
  }
}
