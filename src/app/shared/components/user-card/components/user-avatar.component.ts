import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/shared/services/app.service';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';

@Component({
  selector: 'user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent implements OnInit {
  @Input() actor!: any;
  @Input() canEdit!: boolean;
  @Input() editSize: number = 30;
  @Input() showCard!: boolean;
  @Input() size: any = 'large';
  @Input() shape: 'circle' | 'square' = 'circle';
  @Input() text: string = '';

  @ViewChild('inputImage') imageInput!: ElementRef;

  userAvatarForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appSer: AppService,
    private authRoleService: AuthRoleService
  ) {}

  ngOnInit(): void {
    this.userAvatarForm = this.fb.group({
      file: new FormControl(''),
      fileSource: new FormControl(''),
    });
  }

  uploadImage() {
    this.imageInput.nativeElement.click();
  }

  onProfilePicChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      const file = event.target.files[0];

      const formData = new FormData();
      formData.append('display_picture', file);

      this.appSer
        .updateProfile(formData, this.actor.id)
        .subscribe((res: any) => {
          this.actor.display_picture = res.display_picture;
          // this.updateCurrentUser(res);
          this.userAvatarForm.get('file')?.markAsPristine();
        });
    }
  }

  updateCurrentUser(user: any) {
    this.authRoleService.loggedUser.actor = user;
  }
}
