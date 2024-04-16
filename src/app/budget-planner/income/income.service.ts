import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  constructor() {}

  getTotalIncome(): number {
    if (typeof localStorage === 'undefined') {
      console.warn('localStorage is not available.');
      return 0;
    }
    let totalIncome = 0;

    const januaryIncomes = JSON.parse(
      localStorage.getItem('januaryIncomes') ?? '[]'
    );
    const februaryIncomes = JSON.parse(
      localStorage.getItem('februaryIncomes') ?? '[]'
    );
    const marchIncomes = JSON.parse(
      localStorage.getItem('marchIncomes') ?? '[]'
    );

    totalIncome += this.calculateTotalIncomeForMonth(januaryIncomes);
    totalIncome += this.calculateTotalIncomeForMonth(februaryIncomes);
    totalIncome += this.calculateTotalIncomeForMonth(marchIncomes);

    return totalIncome;
  }

  getTotalIncomeForLastMonths(months: number): number[] {
    if (typeof localStorage === 'undefined') {
      console.warn('localStorage is not available.');
      return [];
    }

    const currentMonth = new Date().getMonth();
    const totalIncomes: number[] = [];

    for (let i = 0; i < months; i++) {
      const month = (currentMonth - i + 12) % 12;
      const monthName = this.getMonthName(month);
      const monthIncomes = JSON.parse(
        localStorage.getItem(monthName + 'Incomes') ?? '[]'
      );
      const totalIncome = this.calculateTotalIncomeForMonth(monthIncomes);
      totalIncomes.unshift(totalIncome);
    }

    return totalIncomes;
  }

  public getMonthNameByDate(date: Date): string {
    return this.getMonthName(date.getMonth());
  }

  private getMonthName(month: number): string {
    const monthNames = [
      'січень',
      'лютий',
      'березень',
      'квітень',
      'травень',
      'червень',
      'липень',
      'серпень',
      'вересень',
      'жовтень',
      'листопад',
      'грудень',
    ];
    return monthNames[month];
  }

  private calculateTotalIncomeForMonth(incomes: any[]): number {
    let totalIncome = 0;
    incomes.forEach((income: any) => {
      totalIncome += income.amount;
    });
    return totalIncome;
  }
}
