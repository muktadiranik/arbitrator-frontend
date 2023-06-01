import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AlertModalService {
  constructor() {}

  success(title: string, message: string, confirmButtonText: string = 'OK') {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonColor: '#1890ff',
      confirmButtonText: confirmButtonText,
    });
  }

  info(title: string, message: string, confirmButtonText: string = 'OK') {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'info',
      confirmButtonColor: '#1890ff',
      confirmButtonText: confirmButtonText,
      color: '#000',
      customClass: {
        title: 'text-[#1890ff]',
      },
    });
  }

  alert(
    title: string,
    message: string,
    type: any,
    confirmButtonText: string = 'OK'
  ) {
    return Swal.fire({
      title: title,
      text: message,
      icon: type,
      confirmButtonColor: '#1890ff',
      confirmButtonText: confirmButtonText,
      color: '#000',
      customClass: {
        title: 'text-[#1890ff]',
      },
    });
  }
}
