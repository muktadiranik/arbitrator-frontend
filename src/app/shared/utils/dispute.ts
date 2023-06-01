import { AuthRoleService } from '../services/auth-role.service';

export class DisputeUtil {
  constructor(private authRoleService: AuthRoleService) {}

  isDisputeResolved(): boolean {
    let isResolved = false;
    this.authRoleService.dispute$.subscribe((dispute: any) => {
      if (dispute.status === 'in-progress') {
        isResolved = true;
      }
    });
    return isResolved;
  }
}
