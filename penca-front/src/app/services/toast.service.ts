import { Injectable } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastrService: NbToastrService) { }

  success(message: string) {
    this.toastrService.success(message, 'Éxito', { position: NbGlobalPhysicalPosition.BOTTOM_RIGHT });
  }

  error(message: string) {
    this.toastrService.danger(message, 'Error', { position: NbGlobalPhysicalPosition.BOTTOM_RIGHT });
  }
}
