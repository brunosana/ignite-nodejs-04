import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {

    if(!email) {
      throw new AppError("Email required");
    }
    if(!name) {
      throw new AppError("Name required");
    }

    const emailExists = this.usersRepository.findByEmail(email);
    if(emailExists){
      throw new AppError("Email already exists");
    }

    const user = this.usersRepository.create({ name, email });

    return user;
  }
}

export { CreateUserUseCase };
