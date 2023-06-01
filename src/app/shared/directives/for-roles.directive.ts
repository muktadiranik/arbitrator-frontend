import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../interfaces/auth';
import { AuthRoleService } from '../services/auth-role.service';

@Directive({
  selector: '[forRoles]',
})
export class ForRolesDirective {
  roles!: string[];
  checker = (arr: string[], target: string[]) =>
    target.every((v: string) => arr.includes(v));

  @Input()
  set forRoles(roles: string[] | string) {
    if (roles != null) {
      this.roles = Array.isArray(roles) ? roles : [roles];
      // this.roles = this.roles.map(r => r.toUpperCase()); //I dont think we need to uppercase our roles
    } else {
      this.roles = [];
    }
    this.authRoleService.getCurrentUser().subscribe((user: User) => {
      // console.log("this.roles",this.roles, user.permissions, this.checker(user.permissions, this.roles))
      if (user.permissions && !this.checker(user.permissions, this.roles)) {
        this.viewContainer.clear();
      } else {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authRoleService: AuthRoleService
  ) {}
}
