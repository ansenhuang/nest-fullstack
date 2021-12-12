export class CreateUserDto {
  username: string;
  nickname?: string;
  password: string;
  avatar?: string;
  email?: string;
  role?: number;
}
