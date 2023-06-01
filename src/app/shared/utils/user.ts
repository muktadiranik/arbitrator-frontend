import { User } from '../interfaces/auth';

export class UserUtil {
  static fullname(user: User) {
    if (!user) return '';
    return `${user.first_name} ${user.last_name}`;
  }
}
