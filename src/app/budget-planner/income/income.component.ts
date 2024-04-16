// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import {
//   FormBuilder,
//   FormControl,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { Router } from '@angular/router';
// import moment from 'moment';
// import 'moment/locale/uk';

// @Component({
//   selector: 'app-income',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './income.component.html',
//   styleUrl: './income.component.scss',
// })
// export class IncomeComponent {
//   incomeForm: any;
//   selectedMonth: any;
//   selectedIndex: number | undefined;
//   selectedMonthForEdit: string | undefined;
//   incomeSources: string[] = [];
//   januaryIncomes: any[] = [
//     { source: 'Зарплата', amount: 28000 },
//     { source: 'Доп.заробіток', amount: 5000 },
//   ];
//   februaryIncomes: any[] = [
//     { source: 'Зарплата', amount: 25000 },
//     { source: 'Доп.заробіток', amount: 2000 },
//   ];
//   marchIncomes: any[] = [
//     { source: 'Зарплата', amount: 30000 },
//     { source: 'Доп.заробіток', amount: 1000 },
//   ];
//   monthSelected: boolean = false;

//   constructor(public fb: FormBuilder, public router: Router) {
//     const currentDate = new Date();
//     this.selectedMonth = moment().locale('uk').format('MMMM');

//     if (typeof localStorage !== 'undefined') {
//       const incomeSourcesString = localStorage.getItem('incomeSources');
//       this.incomeSources = incomeSourcesString
//         ? JSON.parse(incomeSourcesString)
//         : [];

//       this.januaryIncomes = JSON.parse(
//         localStorage.getItem('januaryIncomes') ?? '[]'
//       );
//       this.februaryIncomes = JSON.parse(
//         localStorage.getItem('februaryIncomes') ?? '[]'
//       );
//       this.marchIncomes = JSON.parse(
//         localStorage.getItem('marchIncomes') ?? '[]'
//       );

//       if (!this.januaryIncomes.length) {
//         this.januaryIncomes = [
//           { source: 'Зарплата', amount: 28000 },
//           { source: 'Доп.заробіток', amount: 5000 },
//         ];
//       }

//       if (!this.februaryIncomes.length) {
//         this.februaryIncomes = [
//           { source: 'Зарплата', amount: 25000 },
//           { source: 'Доп.заробіток', amount: 2000 },
//         ];
//       }

//       if (!this.marchIncomes.length) {
//         this.marchIncomes = [
//           { source: 'Зарплата', amount: 30000 },
//           { source: 'Доп.заробіток', amount: 1000 },
//         ];
//       }
//     } else {
//       console.warn('localStorage is not available.');
//     }
//   }

//   ngOnInit(): void {
//     this.incomeForm = this.fb.group({
//       month: ['', Validators.required],
//       source: ['', Validators.required],
//       amount: ['', Validators.required],
//       incomeName: ['', Validators.required],
//     });
//   }

//   onChange(event: any) {
//     this.selectedMonth = event.target.value;
//     this.monthSelected = true;
//     this.getFilteredIncomes();
//   }

//   calculateTotalIncome(month: string): number {
//     let totalIncome = 0;
//     const incomes = this.getIncomesForMonth(month);

//     for (const income of incomes) {
//       totalIncome += income.amount;
//     }
//     return totalIncome;
//   }

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

//   editIncome(index: number, income: any) {
//     (this.incomeForm.get('amount') as FormControl).setValue(null);

//     const selectedMonth = this.selectedMonth;
//     let incomeToEdit: any;

//     switch (selectedMonth) {
//       case 'Січень':
//         incomeToEdit = this.januaryIncomes[index];
//         break;
//       case 'Лютий':
//         incomeToEdit = this.februaryIncomes[index];
//         break;
//       case 'Березень':
//         incomeToEdit = this.marchIncomes[index];
//         break;
//       default:
//         return;
//     }
//     this.incomeForm.setValue({
//       month: selectedMonth,
//       incomeName: income.source,
//       amount: income.amount,
//       source: income.source,
//     });

//     this.selectedIndex = index;
//     this.selectedMonthForEdit = this.selectedMonth;

//     this.saveIncomesToLocalStorage();
//     this.calculateTotalIncome(this.selectedMonth);
//   }

//   saveIncomesToLocalStorage() {
//     localStorage.setItem('januaryIncomes', JSON.stringify(this.januaryIncomes));
//     localStorage.setItem(
//       'februaryIncomes',
//       JSON.stringify(this.februaryIncomes)
//     );
//     localStorage.setItem('marchIncomes', JSON.stringify(this.marchIncomes));
//   }

//   deleteIncome(index: number) {
//     const selectedMonth = this.selectedMonth;

//     switch (selectedMonth) {
//       case 'Січень':
//         this.januaryIncomes.splice(index, 1);
//         localStorage.setItem(
//           'januaryIncomes',
//           JSON.stringify(this.januaryIncomes)
//         );
//         break;
//       case 'Лютий':
//         this.februaryIncomes.splice(index, 1);
//         localStorage.setItem(
//           'februaryIncomes',
//           JSON.stringify(this.februaryIncomes)
//         );
//         break;
//       case 'Березень':
//         this.marchIncomes.splice(index, 1);
//         localStorage.setItem('marchIncomes', JSON.stringify(this.marchIncomes));
//         break;
//       default:
//         return;
//     }
//   }

//   onSubmit() {
//     if (this.incomeForm.valid) {
//       const selectedMonth = this.incomeForm.get('month').value;
//       const newIncome = this.incomeForm.value;
//       newIncome.source = newIncome.incomeName.trim();

//       const newCategory = newIncome.incomeName.trim();
//       if (!this.incomeSources.includes(newCategory)) {
//         this.incomeSources.push(newCategory);
//         localStorage.setItem(
//           'incomeSources',
//           JSON.stringify(this.incomeSources)
//         );
//       }

//       if (
//         this.selectedIndex !== undefined &&
//         this.selectedMonthForEdit === this.selectedMonth
//       ) {
//         const incomeToEdit =
//           this.getIncomesForMonth(selectedMonth)[this.selectedIndex];
//         incomeToEdit.source = newIncome.incomeName.trim();
//         incomeToEdit.amount = newIncome.amount;

//         switch (this.selectedMonth) {
//           case 'Січень':
//             this.januaryIncomes[this.selectedIndex] = newIncome;
//             localStorage.setItem(
//               'januaryIncomes',
//               JSON.stringify(this.januaryIncomes)
//             );
//             break;
//           case 'Лютий':
//             this.februaryIncomes[this.selectedIndex] = newIncome;
//             localStorage.setItem(
//               'februaryIncomes',
//               JSON.stringify(this.februaryIncomes)
//             );
//             break;
//           case 'Березень':
//             this.marchIncomes[this.selectedIndex] = newIncome;
//             localStorage.setItem(
//               'marchIncomes',
//               JSON.stringify(this.marchIncomes)
//             );
//             break;
//         }
//         this.selectedIndex = undefined;
//         this.selectedMonthForEdit = undefined;
//       } else {
//         switch (this.selectedMonth) {
//           case 'Січень':
//             this.januaryIncomes.push(newIncome);
//             localStorage.setItem(
//               'januaryIncomes',
//               JSON.stringify(this.januaryIncomes)
//             );
//             break;
//           case 'Лютий':
//             this.februaryIncomes.push(newIncome);
//             localStorage.setItem(
//               'februaryIncomes',
//               JSON.stringify(this.februaryIncomes)
//             );
//             break;
//           case 'Березень':
//             this.marchIncomes.push(newIncome);
//             localStorage.setItem(
//               'marchIncomes',
//               JSON.stringify(this.marchIncomes)
//             );
//             break;
//           default:
//             break;
//         }
//       }

//       this.incomeForm.reset();
//       this.incomeForm.patchValue({ month: selectedMonth });
//       this.calculateTotalIncome(this.selectedMonth);
//     }
//   }

//   onSourceChange(event: any) {
//     this.incomeForm.get('incomeName').setValue(event.target.value);
//   }

//   saveForm() {
//     console.log('Форма збережена!');
//   }

//   onBack() {
//     this.router.navigate(['/budget-planner/dashboard']);
//   }
// }

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import 'moment/locale/uk';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss',
})
export class IncomeComponent {
  incomeForm: any;
  selectedMonth: any;
  selectedIndex: number | undefined;
  selectedMonthForEdit: string | undefined;
  incomeSources: string[] = [];
  month = [
    'januaryIncomes',
    'februaryIncomes',
    'marchIncomes',
    'aprilIncomes',
    'mayIncomes',
    'juneIncomes',
    'julyIncomes',
    'augustIncomes',
    'septemberIncomes',
    'octoberIncomes',
    'novemberIncomes',
    'decemberIncomes',
  ];
  januaryIncomes: any[] = [];
  februaryIncomes: any[] = [];
  marchIncomes: any[] = [];
  aprilIncomes: any[] = [];
  mayIncomes: any[] = [];
  juneIncomes: any[] = [];
  julyIncomes: any[] = [];
  augustIncomes: any[] = [];
  septemberIncomes: any[] = [];
  octoberIncomes: any[] = [];
  novemberIncomes: any[] = [];
  decemberIncomes: any[] = [];
  monthSelected: boolean = false;

  constructor(public fb: FormBuilder, public router: Router) {
    const currentDate = new Date();
    // this.selectedMonth = moment().locale('uk').format('MMMM');

    if (typeof localStorage !== 'undefined') {
      const incomeSourcesString = localStorage.getItem('incomeSources');
      this.incomeSources = incomeSourcesString
        ? JSON.parse(incomeSourcesString)
        : [];

      this.januaryIncomes = JSON.parse(
        localStorage.getItem('januaryIncomes') ?? '[]'
      );
      this.februaryIncomes = JSON.parse(
        localStorage.getItem('februaryIncomes') ?? '[]'
      );
      this.marchIncomes = JSON.parse(
        localStorage.getItem('marchIncomes') ?? '[]'
      );
      this.aprilIncomes = JSON.parse(
        localStorage.getItem('aprilIncomes') ?? '[]'
      );
      this.mayIncomes = JSON.parse(localStorage.getItem('mayIncomes') ?? '[]');

      this.juneIncomes = JSON.parse(
        localStorage.getItem('juneIncomes') ?? '[]'
      );
      this.julyIncomes = JSON.parse(
        localStorage.getItem('julyIncomes') ?? '[]'
      );
      this.augustIncomes = JSON.parse(
        localStorage.getItem('augustIncomes') ?? '[]'
      );
      this.septemberIncomes = JSON.parse(
        localStorage.getItem('septemberIncomes') ?? '[]'
      );
      this.octoberIncomes = JSON.parse(
        localStorage.getItem('octoberIncomes') ?? '[]'
      );
      this.novemberIncomes = JSON.parse(
        localStorage.getItem('novemberIncomes') ?? '[]'
      );
      this.decemberIncomes = JSON.parse(
        localStorage.getItem('decemberIncomes') ?? '[]'
      );

      if (!this.januaryIncomes.length) {
        this.januaryIncomes = [];
      }

      if (!this.februaryIncomes.length) {
        this.februaryIncomes = [];
      }

      if (!this.marchIncomes.length) {
        this.marchIncomes = [];
      }
      if (!this.aprilIncomes.length) {
        this.aprilIncomes = [];
      }
      if (!this.mayIncomes.length) {
        this.mayIncomes = [];
      }
      if (!this.juneIncomes.length) {
        this.juneIncomes = [];
      }
      if (!this.julyIncomes.length) {
        this.julyIncomes = [];
      }
      if (!this.augustIncomes.length) {
        this.augustIncomes = [];
      }
      if (!this.septemberIncomes.length) {
        this.septemberIncomes = [];
      }
      if (!this.octoberIncomes.length) {
        this.octoberIncomes = [];
      }
      if (!this.novemberIncomes.length) {
        this.novemberIncomes = [];
      }
      if (!this.decemberIncomes.length) {
        this.decemberIncomes = [];
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
      incomeName: ['', Validators.required],
    });
  }

  onChange(event: any) {
    this.selectedMonth = event.target.value;
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
      case 'Квітень':
        return this.aprilIncomes;
      case 'Травень':
        return this.mayIncomes;
      case 'Червень':
        return this.juneIncomes;
      case 'Липень':
        return this.julyIncomes;
      case 'Серпень':
        return this.augustIncomes;
      case 'Вересень':
        return this.septemberIncomes;
      case 'Жовтень':
        return this.octoberIncomes;
      case 'Листопад':
        return this.novemberIncomes;
      case 'Грудень':
        return this.decemberIncomes;
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
      case 'Квітень':
        filteredIncomes = [...this.aprilIncomes];
        break;
      case 'Травень':
        filteredIncomes = [...this.mayIncomes];
        break;
      case 'Червень':
        filteredIncomes = [...this.juneIncomes];
        break;
      case 'Липень':
        filteredIncomes = [...this.julyIncomes];
        break;
      case 'Серпень':
        filteredIncomes = [...this.augustIncomes];
        break;
      case 'Вересень':
        filteredIncomes = [...this.septemberIncomes];
        break;
      case 'Жовтень':
        filteredIncomes = [...this.octoberIncomes];
        break;
      case 'Листопад':
        filteredIncomes = [...this.novemberIncomes];
        break;
      case 'Грудень':
        filteredIncomes = [...this.decemberIncomes];
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
      case 'Квітень':
        incomeToEdit = this.aprilIncomes[index];
        break;
      case 'Травень':
        incomeToEdit = this.mayIncomes[index];
        break;
      case 'Червень':
        incomeToEdit = this.juneIncomes[index];
        break;
      case 'Липень':
        incomeToEdit = this.julyIncomes[index];
        break;
      case 'Серпень':
        incomeToEdit = this.augustIncomes[index];
        break;
      case 'Вересень':
        incomeToEdit = this.septemberIncomes[index];
        break;
      case 'Жовтень':
        incomeToEdit = this.octoberIncomes[index];
        break;
      case 'Листопад':
        incomeToEdit = this.novemberIncomes[index];
        break;
      case 'Грудень':
        incomeToEdit = this.decemberIncomes[index];
        break;
      default:
        return;
    }
    this.incomeForm.setValue({
      month: selectedMonth,
      incomeName: income.source,
      amount: income.amount,
      source: income.source,
    });

    this.selectedIndex = index;
    this.selectedMonthForEdit = this.selectedMonth;

    this.saveIncomesToLocalStorage();
    this.calculateTotalIncome(this.selectedMonth);
  }

  saveIncomesToLocalStorage() {
    localStorage.setItem('januaryIncomes', JSON.stringify(this.januaryIncomes));
    localStorage.setItem(
      'februaryIncomes',
      JSON.stringify(this.februaryIncomes)
    );
    localStorage.setItem('marchIncomes', JSON.stringify(this.marchIncomes));
    localStorage.setItem('aprilIncomes', JSON.stringify(this.aprilIncomes));
    localStorage.setItem('mayIncomes', JSON.stringify(this.mayIncomes));
    localStorage.setItem('juneIncomes', JSON.stringify(this.juneIncomes));
    localStorage.setItem('julyIncomes', JSON.stringify(this.julyIncomes));
    localStorage.setItem('augustIncomes', JSON.stringify(this.augustIncomes));
    localStorage.setItem(
      'septemberIncomes',
      JSON.stringify(this.septemberIncomes)
    );
    localStorage.setItem('octoberIncomes', JSON.stringify(this.octoberIncomes));
    localStorage.setItem(
      'novemberIncomes',
      JSON.stringify(this.novemberIncomes)
    );
    localStorage.setItem(
      'decemberIncomes',
      JSON.stringify(this.decemberIncomes)
    );
  }

  deleteIncome(index: number) {
    const selectedMonth = this.selectedMonth;

    switch (selectedMonth) {
      case 'Січень':
        this.januaryIncomes.splice(index, 1);
        localStorage.setItem(
          'januaryIncomes',
          JSON.stringify(this.januaryIncomes)
        );
        break;
      case 'Лютий':
        this.februaryIncomes.splice(index, 1);
        localStorage.setItem(
          'februaryIncomes',
          JSON.stringify(this.februaryIncomes)
        );
        break;
      case 'Березень':
        this.marchIncomes.splice(index, 1);
        localStorage.setItem('marchIncomes', JSON.stringify(this.marchIncomes));
        break;
      case 'Квітень':
        this.aprilIncomes.splice(index, 1);
        localStorage.setItem('aprilIncomes', JSON.stringify(this.aprilIncomes));
        break;
      case 'Травень':
        this.mayIncomes.splice(index, 1);
        localStorage.setItem('mayIncomes', JSON.stringify(this.mayIncomes));
        break;
      case 'Червень':
        this.juneIncomes.splice(index, 1);
        localStorage.setItem('juneIncomes', JSON.stringify(this.juneIncomes));
        break;
      case 'Липень':
        this.julyIncomes.splice(index, 1);
        localStorage.setItem('julyIncomes', JSON.stringify(this.julyIncomes));
        break;
      case 'Серпень':
        this.augustIncomes.splice(index, 1);
        localStorage.setItem(
          'augustIncomes',
          JSON.stringify(this.augustIncomes)
        );
        break;
      case 'Вересень':
        this.septemberIncomes.splice(index, 1);
        localStorage.setItem(
          'septemberIncomes',
          JSON.stringify(this.septemberIncomes)
        );
        break;
      case 'Жовтень':
        this.octoberIncomes.splice(index, 1);
        localStorage.setItem(
          'octoberIncomes',
          JSON.stringify(this.octoberIncomes)
        );
        break;
      case 'Листопад':
        this.novemberIncomes.splice(index, 1);
        localStorage.setItem(
          'novemberIncomes',
          JSON.stringify(this.novemberIncomes)
        );
        break;
      case 'Грудень':
        this.decemberIncomes.splice(index, 1);
        localStorage.setItem(
          'decemberIncomes',
          JSON.stringify(this.decemberIncomes)
        );
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

      const newCategory = newIncome.incomeName.trim();
      if (!this.incomeSources.includes(newCategory)) {
        this.incomeSources.push(newCategory);
        localStorage.setItem(
          'incomeSources',
          JSON.stringify(this.incomeSources)
        );
      }

      if (
        this.selectedIndex !== undefined &&
        this.selectedMonthForEdit === this.selectedMonth
      ) {
        const incomeToEdit =
          this.getIncomesForMonth(selectedMonth)[this.selectedIndex];
        incomeToEdit.source = newIncome.incomeName.trim();
        incomeToEdit.amount = newIncome.amount;

        switch (this.selectedMonth) {
          case 'Січень':
            this.januaryIncomes[this.selectedIndex] = newIncome;
            localStorage.setItem(
              'januaryIncomes',
              JSON.stringify(this.januaryIncomes)
            );
            break;
          case 'Лютий':
            this.februaryIncomes[this.selectedIndex] = newIncome;
            localStorage.setItem(
              'februaryIncomes',
              JSON.stringify(this.februaryIncomes)
            );
            break;
          case 'Березень':
            this.marchIncomes[this.selectedIndex] = newIncome;
            localStorage.setItem(
              'marchIncomes',
              JSON.stringify(this.marchIncomes)
            );
            break;
          case 'Квітень':
            this.aprilIncomes[this.selectedIndex] = newIncome;
            localStorage.setItem(
              'aprilIncomes',
              JSON.stringify(this.aprilIncomes)
            );
            break;
          case 'Травень':
            this.mayIncomes[this.selectedIndex] = newIncome;
            localStorage.setItem('mayIncomes', JSON.stringify(this.mayIncomes));
            break;
          case 'Червень':
            this.juneIncomes[this.selectedIndex] = newIncome;
            localStorage.setItem(
              'juneIncomes',
              JSON.stringify(this.juneIncomes)
            );
            break;
          case 'Лиаень':
            this.julyIncomes[this.selectedIndex] = newIncome;
            localStorage.setItem(
              'julyIncomes',
              JSON.stringify(this.julyIncomes)
            );
            break;
          case 'Серпень':
            this.augustIncomes[this.selectedIndex] = newIncome;
            localStorage.setItem(
              'augustIncomes',
              JSON.stringify(this.augustIncomes)
            );
            break;
          case 'Вересень':
            this.septemberIncomes[this.selectedIndex] = newIncome;
            localStorage.setItem(
              'septemberIncomes',
              JSON.stringify(this.septemberIncomes)
            );
            break;
          case 'Жовтень':
            this.octoberIncomes[this.selectedIndex] = newIncome;
            localStorage.setItem(
              'octoberIncomes',
              JSON.stringify(this.octoberIncomes)
            );
            break;
          case 'Листопад':
            this.novemberIncomes[this.selectedIndex] = newIncome;
            localStorage.setItem(
              'novemberIncomes',
              JSON.stringify(this.novemberIncomes)
            );
            break;
          case 'Грудень':
            this.decemberIncomes[this.selectedIndex] = newIncome;
            localStorage.setItem(
              'decemberIncomes',
              JSON.stringify(this.decemberIncomes)
            );
            break;
        }
        this.selectedIndex = undefined;
        this.selectedMonthForEdit = undefined;
      } else {
        switch (this.selectedMonth) {
          case 'Січень':
            this.januaryIncomes.push(newIncome);
            localStorage.setItem(
              'januaryIncomes',
              JSON.stringify(this.januaryIncomes)
            );
            break;
          case 'Лютий':
            this.februaryIncomes.push(newIncome);
            localStorage.setItem(
              'februaryIncomes',
              JSON.stringify(this.februaryIncomes)
            );
            break;
          case 'Березень':
            this.marchIncomes.push(newIncome);
            localStorage.setItem(
              'marchIncomes',
              JSON.stringify(this.marchIncomes)
            );
            break;
          case 'Квітень':
            this.aprilIncomes.push(newIncome);
            localStorage.setItem(
              'aprilIncomes',
              JSON.stringify(this.aprilIncomes)
            );
            break;
          case 'Травень':
            this.mayIncomes.push(newIncome);
            localStorage.setItem('mayIncomes', JSON.stringify(this.mayIncomes));
            break;
          case 'Червень':
            this.juneIncomes.push(newIncome);
            localStorage.setItem(
              'juneIncomes',
              JSON.stringify(this.juneIncomes)
            );
            break;
          case 'Лиаень':
            this.julyIncomes.push(newIncome);
            localStorage.setItem(
              'julyIncomes',
              JSON.stringify(this.julyIncomes)
            );
            break;
          case 'Серпень':
            this.augustIncomes.push(newIncome);
            localStorage.setItem(
              'augustIncomes',
              JSON.stringify(this.augustIncomes)
            );
            break;
          case 'Вересень':
            this.septemberIncomes.push(newIncome);
            localStorage.setItem(
              'septemberIncomes',
              JSON.stringify(this.septemberIncomes)
            );
            break;
          case 'Жовтень':
            this.octoberIncomes.push(newIncome);
            localStorage.setItem(
              'octoberIncomes',
              JSON.stringify(this.octoberIncomes)
            );
            break;
          case 'Листопад':
            this.novemberIncomes.push(newIncome);
            localStorage.setItem(
              'novemberIncomes',
              JSON.stringify(this.novemberIncomes)
            );
            break;
          case 'Грудень':
            this.decemberIncomes.push(newIncome);
            localStorage.setItem(
              'decemberIncomes',
              JSON.stringify(this.decemberIncomes)
            );
            break;
          default:
            break;
        }
      }

      this.incomeForm.reset();
      this.incomeForm.patchValue({ month: selectedMonth });
      this.calculateTotalIncome(this.selectedMonth);
    }
  }

  onSourceChange(event: any) {
    this.incomeForm.get('incomeName').setValue(event.target.value);
  }

  saveForm() {
    console.log('Форма збережена!');
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }
}
