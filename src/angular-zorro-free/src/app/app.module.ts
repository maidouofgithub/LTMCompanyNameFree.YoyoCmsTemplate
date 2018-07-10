import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '@app/app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AbpModule } from 'abp-ng2-module/dist/src/abp.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LocalizationService } from 'abp-ng2-module/dist/src/localization/localization.service';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    AbpModule,
    NgZorroAntdModule,

    AppRoutingModule,
  ],
  declarations: [AppComponent],
  providers: [LocalizationService],
})
export class AppModule {}
