import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private toastr: ToastrService) { }

    success(message, duration?) {
        this.toastr.success(message, null, {
            timeOut: Number(duration) | 3000,
            closeButton: true,
        });
    }

    error(message, duration?) {
        this.toastr.error(message, null, {
            timeOut: Number(duration) | 3000,
            closeButton: true,
        });
    }

}