import {Component} from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {Router} from "@angular/router";

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {
  expenseForm: any;
  selectedMonth: string;
  expenses: { month: string, expenseAmount: number }[] = [
    {month: 'January', expenseAmount: 15000},
    {month: 'February', expenseAmount: 20000},
    {month: 'March', expenseAmount: 18000},
  ];
  monthSelected: boolean = false;
  januaryExpense: any[] = [
    {expenseType: 'Продукти', expenseAmount: 7000},
    {expenseType: 'Гуртки для дитини', expenseAmount: 2500},
    {expenseType: 'Звязок', expenseAmount: 500},
    {expenseType: 'Подорож', expenseAmount: 5000},
  ];
  februaryExpense: any[] = [
    {expenseType: 'Продукти', expenseAmount: 7000},
    {expenseType: 'Гуртки для дитини', expenseAmount: 2500},
    {expenseType: 'Звязок', expenseAmount: 500},
    {expenseType: 'Ремонт авто.', expenseAmount: 6300},
    {expenseType: 'Інше', expenseAmount: 3700},
  ];
  marchExpense: any[] = [
    {expenseType: 'Продукти', expenseAmount: 7000},
    {expenseType: 'Гуртки для дитини', expenseAmount: 2500},
    {expenseType: 'Звязок', expenseAmount: 500},
    {expenseType: 'Д.Н.', expenseAmount: 8000},
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.selectedMonth = new Date().toLocaleString('default', {month: 'long'})
  }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required],
    })
  }

  onSubmitExpense() {
    if (this.expenseForm.valid) {
      const newExpense = this.expenseForm.value;
      this.getFilteredExpenses().push(newExpense);
      this.expenseForm.reset();
    }
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpenses();
  }

  getFilteredExpenses() {
    switch (this.selectedMonth) {
      case 'January':
        return this.januaryExpense;
      case 'February':
        return this.februaryExpense;
      case 'March':
        return this.marchExpense;
      default:
        return [];
    }
  }

  calculateTotalExpense(month: string): number {
    return this.getFilteredExpenses().reduce((acc, curr) => acc + curr.expenseAmount, 0)
  }

  onSave() {
    if (this.expenseForm.valid) {
      this.expenseForm.reset({month: this.selectedMonth})
      this.getFilteredExpenses();
    }
  }

  saveForm() {
    console.log("Form saved!")
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard'])
  }

}
