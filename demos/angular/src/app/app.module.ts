import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { cloudIcon, ClarityIcons } from '@cds/core/icon';

import '@cds/core/grid/register.js';
// import '@cds/core/icon/register.js';
// import '@cds/core/accordion/register.js';
// import '@cds/core/alert/register.js';
// import '@cds/core/button/register.js';
// import '@cds/core/checkbox/register.js';
// import '@cds/core/datalist/register.js';
// import '@cds/core/file/register.js';
// import '@cds/core/forms/register.js';
// import '@cds/core/input/register.js';
// import '@cds/core/password/register.js';
// import '@cds/core/radio/register.js';
// import '@cds/core/range/register.js';
// import '@cds/core/search/register.js';
// import '@cds/core/select/register.js';
// import '@cds/core/textarea/register.js';
// import '@cds/core/time/register.js';
// import '@cds/core/toggle/register.js';
// import '@cds/core/navigation/register.js';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CdsModule } from '@cds/angular';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CdsModule,
    ReactiveFormsModule,
    ClarityModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    ClarityIcons.addIcons(cloudIcon);
  }
}
