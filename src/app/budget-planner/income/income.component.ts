import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent {
  incomeForm: any;
  selectedMonth: any;
  januaryIncomes: any[] = [
    {source: 'Зарплата', amount: 28000},
    {source: 'Доп.заробіток', amount: 5000}
  ];
  februaryIncomes: any[] = [
    {source: 'Зарплата', amount: 25000},
    {source: 'Доп.заробіток', amount: 2000}
  ];
  marchIncomes: any[] = [
    {source: 'Зарплата', amount: 30000},
    {source: 'Доп.заробіток', amount: 1000}
  ];

  monthSelected: boolean = false;

  constructor(public fb: FormBuilder) {
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', {month: 'long'})
  }

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      month: ['', Validators.required],
      source: ['', Validators.required],
      amount: ['', Validators.required],
      investments: ['', Validators.required],
    })
  }

  onChange(event: any) {
    this.selectedMonth = event.target.value
    this.getFilteredIncomes();
  }

  calculateTotalIncome(month: string): number {
    let totalIncome = 0;
    for (const income of this.getIncomesForMonth(month)) {
      totalIncome += income.amount;
    }
    return totalIncome;
  }

  getIncomesForMonth(month: string): any[] {
    switch (month) {
      case 'January':
        return this.januaryIncomes;
      case 'February':
        return this.februaryIncomes;
      case 'March':
        return this.marchIncomes;
      default:
        return [];
    }
  }

  getFilteredIncomes() {
    let filteredIncomes: any[] = [];
    switch (this.selectedMonth) {
      case 'January':
        filteredIncomes = [...this.januaryIncomes];
        break;
      case 'February':
        filteredIncomes = [...this.februaryIncomes];
        break;
      case 'March':
        filteredIncomes = [...this.marchIncomes];
        break;
      default:
        break;
    }
    return filteredIncomes;
  }

  onSubmit() {

  }
}
