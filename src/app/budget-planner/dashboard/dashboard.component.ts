import {Component} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {SideNavComponent} from "../side-nav/side-nav.component";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, SideNavComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  // Income
  lastMonthIncome = ['Січень: 20000 грн.', 'Лютий: 18000 грн.', 'Березень: 25000 грн.'];
  currentMonthIncome = '28000 грн';

  // Expense
  lastMonthExpense = ['Січень: 12000 грн.', 'Лютий: 9000 грн.', 'Березень: 15000 грн.'];
  currentMonthExpense = '140000 грн';

  // Todo Transaction

  todoTransactions = [
    {description: 'Комунальні платежі'},
    {description: 'Купувати продукти}'},
    {description: 'Зателефонувати до страхової компанії'},
    {description: 'Сплатити рахунок за електроенергію'},
  ]

  totalCurrentMonthIncome = 28000;
  totalCurrentMonthExpense = 14000;

  constructor(public router: Router) {
  }

  onIncome() {
    this.router.navigate(['/budget-planner/income'])
  }

  onExpense() {
    this.router.navigate(['/budget-planner/expense'])
  }

  onTodo() {
    this.router.navigate(['/budget-planner/todo'])
  }

  get currentMonthSavings(): number {
    return this.totalCurrentMonthIncome - this.totalCurrentMonthExpense
  }
}
