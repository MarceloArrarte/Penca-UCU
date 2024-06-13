import { Injectable } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastRef, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastrService: NbToastrService) { }

  info(message: string, title?: string): NbToastRef {
    return this.toastrService.info(message, title || 'Info', { position: NbGlobalPhysicalPosition.BOTTOM_RIGHT });
  }

  success(message: string): NbToastRef {
    return this.toastrService.success(message, 'Éxito', { position: NbGlobalPhysicalPosition.BOTTOM_RIGHT });
  }

  error(message: string): NbToastRef {
    return this.toastrService.danger(message, 'Error', { position: NbGlobalPhysicalPosition.BOTTOM_RIGHT });
  }
}
