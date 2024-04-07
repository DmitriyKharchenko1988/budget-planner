// import {CommonModule} from '@angular/common';
// import {Component} from '@angular/core';
// import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
// import {Router} from '@angular/router';
// import moment from 'moment';
// import 'moment/locale/uk';
//
// @Component({
//   selector: 'app-income',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './income.component.html',
//   styleUrl: './income.component.scss'
// })
// export class IncomeComponent {
//   incomeForm: any;
//   selectedMonth: any;
//   januaryIncomes: any[] = [
//     {source: 'Зарплата', amount: 28000},
//     {source: 'Доп.заробіток', amount: 5000}
//   ];
//   februaryIncomes: any[] = [
//     {source: 'Зарплата', amount: 25000},
//     {source: 'Доп.заробіток', amount: 2000}
//   ];
//   marchIncomes: any[] = [
//     {source: 'Зарплата', amount: 30000},
//     {source: 'Доп.заробіток', amount: 1000}
//   ];
//   monthSelected: boolean = false;
//
//   constructor(public fb: FormBuilder, public router: Router) {
//     const currentDate = new Date();
//     this.selectedMonth = moment().locale('uk').format('MMMM');
//
//     if (typeof localStorage !== 'undefined') {
//       const januaryIncomesString = localStorage.getItem('januaryIncomes');
//       this.januaryIncomes = januaryIncomesString ? JSON.parse(januaryIncomesString) : [
//         {source: 'Зарплата', amount: 28000},
//         {source: 'Доп.заробіток', amount: 5000}
//       ];
//
//       const februaryIncomesString = localStorage.getItem('februaryIncomes');
//       this.februaryIncomes = februaryIncomesString ? JSON.parse(februaryIncomesString) : [
//         {source: 'Зарплата', amount: 25000},
//         {source: 'Доп.заробіток', amount: 2000}
//       ];
//
//       const marchIncomesString = localStorage.getItem('marchIncomes');
//       this.marchIncomes = marchIncomesString ? JSON.parse(marchIncomesString) : [
//         {source: 'Зарплата', amount: 30000},
//         {source: 'Доп.заробіток', amount: 1000}
//       ];
//     } else {
//       console.warn('localStorage is not available.');
//     }
//   }
//
//   ngOnInit(): void {
//     this.incomeForm = this.fb.group({
//       month: ['', Validators.required],
//       // source: ['', Validators.required],
//       amount: ['', Validators.required],
//       // investments: ['', Validators.required],
//       incomeName: ['', Validators.required]
//     });
//   }
//
//   onChange(event: any) {
//     this.selectedMonth = event.target.value
//     this.monthSelected = true;
//     this.getFilteredIncomes();
//   }
//
//   calculateTotalIncome(month: string): number {
//     let totalIncome = 0;
//     const incomes = this.getIncomesForMonth(month);
//
//     for (const income of incomes) {
//       totalIncome += income.amount;
//     }
//     return totalIncome;
//
//
//     // for (const income of this.getIncomesForMonth(month)) {
//     //   totalIncome += income.amount;
//     // }
//     // return totalIncome;
//   }
//
//   getIncomesForMonth(month: string): any[] {
//     switch (month) {
//       case 'Січень':
//         return this.januaryIncomes;
//       case 'Лютий':
//         return this.februaryIncomes;
//       case 'Березень':
//         return this.marchIncomes;
//       default:
//         return [];
//     }
//   }
//
//   getFilteredIncomes() {
//     let filteredIncomes: any[] = [];
//     switch (this.selectedMonth) {
//       case 'Січень':
//         filteredIncomes = [...this.januaryIncomes];
//         break;
//       case 'Лютий':
//         filteredIncomes = [...this.februaryIncomes];
//         break;
//       case 'Березень':
//         filteredIncomes = [...this.marchIncomes];
//         break;
//       default:
//         break;
//     }
//     return filteredIncomes;
//   }
//
//   onSubmit() {
//     if (this.incomeForm.valid) {
//       const selectedMonth = this.incomeForm.get('month').value;
//       const newIncome = this.incomeForm.value;
//       newIncome.source = newIncome.incomeName.trim();
//
//       switch (this.selectedMonth) {
//         case 'Січень':
//           this.januaryIncomes.push(newIncome);
//           break;
//         case 'Лютий':
//           this.februaryIncomes.push(newIncome);
//           break;
//         case 'Березень':
//           this.marchIncomes.push(newIncome);
//           break;
//         default:
//           break;
//       }
//
//       localStorage.setItem('januaryIncomes', JSON.stringify(this.januaryIncomes));
//       localStorage.setItem('februaryIncomes', JSON.stringify(this.februaryIncomes));
//       localStorage.setItem('marchIncomes', JSON.stringify(this.marchIncomes));
//
//       this.incomeForm.reset();
//       this.incomeForm.patchValue({month: selectedMonth, amount: '', incomeName: ''});
//
//     }
//   }
//
//   saveForm() {
//     console.log("Форма збережена!");
//   }
//
//   onBack() {
//     this.router.navigate(['/budget-planner/dashboard']);
//   }
// }

import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
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
      // investments: ['', Validators.required],
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


    // for (const income of this.getIncomesForMonth(month)) {
    //   totalIncome += income.amount;
    // }
    // return totalIncome;
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

  deleteIncomeSource(index: number) {
    if (this.incomeSources.length > 1) {
      this.incomeSources.splice(index, 1);
      localStorage.setItem('incomeSources', JSON.stringify(this.incomeSources));
    }
  }

  onSubmit() {
    if (this.incomeForm.valid) {
      const selectedMonth = this.incomeForm.get('month').value;
      const newIncome = this.incomeForm.value;
      newIncome.source = newIncome.incomeName.trim();

      if (!this.incomeSources.includes(newIncome.source)) {
        this.incomeSources.push(newIncome.source);
        localStorage.setItem('incomeSources', JSON.stringify(this.incomeSources));
      }


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

      localStorage.setItem('januaryIncomes', JSON.stringify(this.januaryIncomes));
      localStorage.setItem('februaryIncomes', JSON.stringify(this.februaryIncomes));
      localStorage.setItem('marchIncomes', JSON.stringify(this.marchIncomes));

      this.incomeForm.reset();
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
