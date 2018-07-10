﻿import {
  Component,
  Injector,
  ElementRef,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  AccountServiceProxy,
  RegisterInput,
  RegisterOutput,
} from '@shared/service-proxies/service-proxies';
import { LoginService } from '../login/login.service';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent extends AppComponentBase
  implements AfterViewInit {
  // @ViewChild('cardBody') cardBody: ElementRef;

  model: RegisterInput = new RegisterInput();

  saving = false;

  constructor(
    injector: Injector,
    private _accountService: AccountServiceProxy,
    private _router: Router,
    private readonly _loginService: LoginService,
  ) {
    super(injector);
  }

  ngAfterViewInit(): void {
    // $(this.cardBody.nativeElement).find('input:first').focus();
  }

  back(): void {
    this._router.navigate(['/login']);
  }

  save(): void {
    this.saving = true;
    this._accountService
      .register(this.model)
      .finally(() => {
        this.saving = false;
      })
      .subscribe((result: RegisterOutput) => {
        if (!result.canLogin) {
          this.notify.success(this.l('SuccessfullyRegistered'));
          this._router.navigate(['/login']);
          return;
        }

        // Autheticate
        this.saving = true;
        this._loginService.authenticateModel.userNameOrEmailAddress = this.model.userName;
        this._loginService.authenticateModel.password = this.model.password;
        this._loginService.authenticate(() => {
          this.saving = false;
        });
      });
  }
}
