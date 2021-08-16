import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CdsModule } from '@cds/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VMService } from './vm.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, CdsModule],
  providers: [VMService],
  bootstrap: [AppComponent],
})
export class AppModule {}
