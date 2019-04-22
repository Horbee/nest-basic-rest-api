import { GetUserDto } from '../dto/get-user.dto';

export interface CreateUserResponse {
  error: boolean;
  email?: string;
  user?: GetUserDto;
}
