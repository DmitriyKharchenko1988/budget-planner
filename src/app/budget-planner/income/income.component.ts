import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {Router} from '@angular/router';
import moment from 'moment';
import 'moment/locale/uk';

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
  selectedIndex: number | undefined;
  selectedMonthForEdit: string | undefined;
  incomeSources: string[] = [];
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

  constructor(public fb: FormBuilder, public router: Router) {
    const currentDate = new Date();
    this.selectedMonth = moment().locale('uk').format('MMMM');

    if (typeof localStorage !== 'undefined') {
      const incomeSourcesString = localStorage.getItem('incomeSources');
      this.incomeSources = incomeSourcesString ? JSON.parse(incomeSourcesString) : [];

      this.januaryIncomes = JSON.parse(localStorage.getItem('januaryIncomes') ?? '[]');
      this.februaryIncomes = JSON.parse(localStorage.getItem('februaryIncomes') ?? '[]');
      this.marchIncomes = JSON.parse(localStorage.getItem('marchIncomes') ?? '[]');

      if (!this.januaryIncomes.length) {
        this.januaryIncomes = [
          {source: 'Зарплата', amount: 28000},
          {source: 'Доп.заробіток', amount: 5000}
        ];
      }

      if (!this.februaryIncomes.length) {
        this.februaryIncomes = [
          {source: 'Зарплата', amount: 25000},
          {source: 'Доп.заробіток', amount: 2000}
        ];
      }

      if (!this.marchIncomes.length) {
        this.marchIncomes = [
          {source: 'Зарплата', amount: 30000},
          {source: 'Доп.заробіток', amount: 1000}
        ];
      }
    } else {
      console.warn('localStorage is not available.');
    }
  }


  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      month: ['', Validators.required],
      source: ['', Validators.required],
      amount: ['', Validators.required],
      incomeName: ['', Validators.required]
    });
  }

  onChange(event: any) {
    this.selectedMonth = event.target.value
    this.monthSelected = true;
    this.getFilteredIncomes();
  }

  calculateTotalIncome(month: string): number {
    let totalIncome = 0;
    const incomes = this.getIncomesForMonth(month);

    for (const income of incomes) {
      totalIncome += income.amount;
    }
    return totalIncome;
  }

  getIncomesForMonth(month: string): any[] {
    switch (month) {
      case 'Січень':
        return this.januaryIncomes;
      case 'Лютий':
        return this.februaryIncomes;
      case 'Березень':
        return this.marchIncomes;
      default:
        return [];
    }
  }

  getFilteredIncomes() {
    let filteredIncomes: any[] = [];
    switch (this.selectedMonth) {
      case 'Січень':
        filteredIncomes = [...this.januaryIncomes];
        break;
      case 'Лютий':
        filteredIncomes = [...this.februaryIncomes];
        break;
      case 'Березень':
        filteredIncomes = [...this.marchIncomes];
        break;
      default:
        break;
    }
    return filteredIncomes;
  }


  editIncome(index: number, income: any) {
    (this.incomeForm.get('amount') as FormControl).setValue(null);

    const selectedMonth = this.selectedMonth;
    let incomeToEdit: any;

    switch (selectedMonth) {
      case 'Січень':
        incomeToEdit = this.januaryIncomes[index];
        break;
      case 'Лютий':
        incomeToEdit = this.februaryIncomes[index];
        break;
      case 'Березень':
        incomeToEdit = this.marchIncomes[index];
        break;
      default:
        return;
    }
    this.incomeForm.patchValue({
      month: selectedMonth,
      incomeName: income.source,
      amount: income.amount
    });

    this.selectedIndex = index;
    this.selectedMonthForEdit = this.selectedMonth;



      this.saveIncomesToLocalStorage();
      this.calculateTotalIncome(this.selectedMonth);

      // this.incomeForm.get('incomeName').setValue('');
      // this.incomeForm.get('amount').setValue(null);


  }

  saveIncomesToLocalStorage() {
    localStorage.setItem('januaryIncomes', JSON.stringify(this.januaryIncomes));
    localStorage.setItem('februaryIncomes', JSON.stringify(this.februaryIncomes));
    localStorage.setItem('marchIncomes', JSON.stringify(this.marchIncomes));
  }

  deleteIncome(index: number) {
    const selectedMonth = this.selectedMonth;

    switch (selectedMonth) {
      case 'Січень':
        this.januaryIncomes.splice(index, 1);
        localStorage.setItem('januaryIncomes', JSON.stringify(this.januaryIncomes));
        break;
      case 'Лютий':
        this.februaryIncomes.splice(index, 1);
        localStorage.setItem('februaryIncomes', JSON.stringify(this.februaryIncomes));
        break;
      case 'Березень':
        this.marchIncomes.splice(index, 1);
        localStorage.setItem('marchIncomes', JSON.stringify(this.marchIncomes));
        break;
      default:
        return;
    }
  }

  onSubmit() {
    if (this.incomeForm.valid) {
      const selectedMonth = this.incomeForm.get('month').value;
      const newIncome = this.incomeForm.value;
      newIncome.source = newIncome.incomeName.trim();

      if (this.selectedIndex !== undefined && this.selectedMonthForEdit === this.selectedMonth) {
        const incomeToEdit = this.getIncomesForMonth(selectedMonth)[this.selectedIndex];
        incomeToEdit.source = newIncome.incomeName.trim();
        incomeToEdit.amount = newIncome.amount;

        switch (this.selectedMonth) {
          case 'Січень':
            this.januaryIncomes[this.selectedIndex] = newIncome;
            localStorage.setItem('januaryIncomes', JSON.stringify(this.januaryIncomes));
            break;
          case 'Лютий':
            this.februaryIncomes[this.selectedIndex] = newIncome;
            localStorage.setItem('februaryIncomes', JSON.stringify(this.februaryIncomes));
            break;
          case 'Березень':
            this.marchIncomes[this.selectedIndex] = newIncome;
            localStorage.setItem('marchIncomes', JSON.stringify(this.marchIncomes));
            break;
        }
        this.selectedIndex = undefined;
        this.selectedMonthForEdit = undefined;
      } else {
        switch (this.selectedMonth) {
          case 'Січень':
            this.januaryIncomes.push(newIncome);
            localStorage.setItem('januaryIncomes', JSON.stringify(this.januaryIncomes));
            break;
          case 'Лютий':
            this.februaryIncomes.push(newIncome);
            localStorage.setItem('februaryIncomes', JSON.stringify(this.februaryIncomes));
            break;
          case 'Березень':
            this.marchIncomes.push(newIncome);
            localStorage.setItem('marchIncomes', JSON.stringify(this.marchIncomes));
            break;
          default:
            break;
        }
      }
      // localStorage.setItem('januaryIncomes', JSON.stringify(this.januaryIncomes));
      // localStorage.setItem('februaryIncomes', JSON.stringify(this.februaryIncomes));
      // localStorage.setItem('marchIncomes', JSON.stringify(this.marchIncomes));

      this.incomeForm.reset();
      this.incomeForm.get('amount').setValue(null);
      this.incomeForm.get('incomeName').setValue('');
      this.incomeForm.patchValue({month: selectedMonth, amount: '', incomeName: ''});
      this.calculateTotalIncome(this.selectedMonth);
    }
  }

  saveForm() {
    console.log("Форма збережена!");
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }
}


