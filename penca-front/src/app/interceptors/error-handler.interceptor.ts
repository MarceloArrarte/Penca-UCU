import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpEventType
} from '@angular/common/http';
import { Observable, filter, merge, partition, tap } from 'rxjs';
import { ToastService } from '../services/toast.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private toastService: ToastService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let [responses$, others$] = partition(
      next.handle(request),
      (event: HttpEvent<unknown>): event is HttpResponse<unknown> => event.type == HttpEventType.Response
    );

    responses$ = responses$.pipe(
      tap((response) => {
        let errorMessage: string | null | undefined = (response.body as any)?.error?.description
        if (errorMessage) {
          this.toastService.error(errorMessage);
        }
      })
    );

    return merge(responses$, others$);
  }
}