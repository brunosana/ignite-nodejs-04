import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    const now = new Date();
    Object.assign(user, {
      email,
      name,
      created_at: now,
      updated_at: now
    });

    UsersRepository.INSTANCE.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const user = UsersRepository.INSTANCE.users.find(user => user.id === id);
    
    return user;
  }
  
  findByEmail(email: string): User | undefined {
    const user = UsersRepository.INSTANCE.users.find(user => user.email === email);
    
    return user;
  }

  turnAdmin(receivedUser: User): User {
    const userIndex = UsersRepository.INSTANCE.users.findIndex(user => user.id === receivedUser.id);
    receivedUser.admin = true;
    receivedUser.updated_at = new Date();
    UsersRepository.INSTANCE.users[userIndex] = receivedUser;
    
    return receivedUser;
  }

  list(): User[] {
    return UsersRepository.INSTANCE.users;
  }
}

export { UsersRepository };
