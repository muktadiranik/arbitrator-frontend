import { Actor } from '../interfaces/auth';
import { Witness } from '../interfaces/witness';
import { UserUtil } from './user';

export class ActorUtil {
  static fullname(actor: Actor | Witness) {
    if (actor && actor?.user) {
      return UserUtil.fullname(actor.user);
    } else {
      return null;
    }
  }
}
