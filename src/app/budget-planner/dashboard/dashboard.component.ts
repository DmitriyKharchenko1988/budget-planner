// import {Component} from '@angular/core';
// import {MatIconModule} from "@angular/material/icon";
// import {SideNavComponent} from "../side-nav/side-nav.component";
// import {CommonModule} from "@angular/common";
// import {Router} from "@angular/router";

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [MatIconModule, SideNavComponent, CommonModule],
//   templateUrl: './dashboard.component.html',
//   styleUrl: './dashboard.component.scss'
// })
// export class DashboardComponent {
//   // Income
//   lastMonthIncome = ['Січень: 330000 грн.', 'Лютий: 27000 грн.', 'Березень: 31000 грн.'];
//   currentMonthIncome = '28000 грн';

//   // Expense
//   lastMonthExpense = ['Січень: 15000 грн.', 'Лютий: 20000 грн.', 'Березень: 18000 грн.'];
//   currentMonthExpense = '140000 грн';

//   // Todo Transaction

//   todoTransactions = [
//     {description: 'Комунальні платежі'},
//     {description: 'Купувати продукти}'},
//     {description: 'Зателефонувати до страхової компанії'},
//     {description: 'Сплатити рахунок за електроенергію'},
//   ]

//   totalCurrentMonthIncome = 28000;
//   totalCurrentMonthExpense = 14000;

//   constructor(public router: Router) {
//   }

//   onIncome() {
//     this.router.navigate(['/budget-planner/income'])
//   }

//   onExpense() {
//     this.router.navigate(['/budget-planner/expense'])
//   }

//   onTodo() {
//     this.router.navigate(['/budget-planner/todo'])
//   }

//   get currentMonthSavings(): number {
//     return this.totalCurrentMonthIncome - this.totalCurrentMonthExpense
//   }
// }

import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IncomeService } from '../income/income.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, SideNavComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  // Income
  totalIncome: number = 0;
  lastMonthIncome: string[] = [];

  // Expense
  lastMonthExpense = [
    'Січень: 15000 грн.',
    'Лютий: 20000 грн.',
    'Березень: 18000 грн.',
  ];
  currentMonthExpense = '140000 грн';

  // Todo Transaction

  todoTransactions = [
    { description: 'Комунальні платежі' },
    { description: 'Купувати продукти}' },
    { description: 'Зателефонувати до страхової компанії' },
    { description: 'Сплатити рахунок за електроенергію' },
  ];

  totalCurrentMonthIncome = 28000;
  totalCurrentMonthExpense = 14000;

  constructor(public router: Router, private incomeService: IncomeService) {}

  ngOnInit(): void {
    this.totalIncome = this.incomeService.getTotalIncome();
    const currentMonth = new Date().getMonth();
    const lastThreeMonthsIncomes =
      this.incomeService.getTotalIncomeForLastMonths(3);

    this.lastMonthIncome = lastThreeMonthsIncomes.map((income, index) => {
      const monthDate = new Date();
      monthDate.setMonth(currentMonth - index);
      const monthName = this.incomeService.getMonthNameByDate(monthDate);
      return `${monthName}: ${income.totalIncome} грн.`;
    });
    this.totalIncome =
      lastThreeMonthsIncomes.length > 0
        ? lastThreeMonthsIncomes[0].totalIncome
        : 0;
    // Общая сумма дохода за текущий месяц
  }

  onIncome() {
    this.router.navigate(['/budget-planner/income']);
  }

  onExpense() {
    this.router.navigate(['/budget-planner/expense']);
  }

  onTodo() {
    this.router.navigate(['/budget-planner/todo']);
  }

  get currentMonthSavings(): number {
    return this.totalCurrentMonthIncome - this.totalCurrentMonthExpense;
  }
}
