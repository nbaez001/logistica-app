import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveRowsDirective } from '../core/directives/responsive-rows.directive';
import { UppercasedDirective } from '../core/directives/uppercased.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { Uppercased2Directive } from '../core/directives/uppercased2.directive';



@NgModule({
  declarations: [
    ResponsiveRowsDirective,
    UppercasedDirective,
    Uppercased2Directive,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutModule,
    HttpClientModule,
  ],
  exports: [
    ReactiveFormsModule,
    LayoutModule,
    HttpClientModule,

    ResponsiveRowsDirective,
    UppercasedDirective,
    Uppercased2Directive,
  ]
})
export class SharedModule { }
