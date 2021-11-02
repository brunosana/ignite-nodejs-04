import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    
    if(!user_id){
      throw new AppError("User_id required");
    }

    const userRequested = this.usersRepository.findById(user_id);

    if(!userRequested){
      throw new AppError("User not found");
    }

    if(!userRequested.admin){
      throw new AppError("User is not admin");
    }

    const users = this.usersRepository.list();
    return users;
  }
}

export { ListAllUsersUseCase };
