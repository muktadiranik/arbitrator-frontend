import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private messageService: NzMessageService) {}

  info(message: string) {
    this.messageService.create('info', message);
  }

  success(message: string) {
    this.messageService.create('success', message);
  }

  warning(message: string) {
    this.messageService.create('warning', message);
  }

  error(message: string) {
    this.messageService.create('error', message);
  }
}
