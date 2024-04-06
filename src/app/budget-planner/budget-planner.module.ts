import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BudgetPlannerRoutingModule} from './budget-planner-routing.module';
import {CustomMatOptionComponent} from "./custom-mat-option/custom-mat-option.component";
@NgModule({
  declarations: [CustomMatOptionComponent,],
  imports: [
    CommonModule,
    BudgetPlannerRoutingModule,
  ],
  exports: [CustomMatOptionComponent]
})
export class BudgetPlannerModule {
}
