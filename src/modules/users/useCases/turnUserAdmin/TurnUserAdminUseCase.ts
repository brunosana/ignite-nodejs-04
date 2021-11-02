import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {

    if(!user_id){
      throw new AppError("User_id required");
    }

    const user = this.usersRepository.findById(user_id);
    if(!user){
      throw new AppError("User not found", 404);
    }

    const response = this.usersRepository.turnAdmin(user);
    return response;
  }
}

export { TurnUserAdminUseCase };
