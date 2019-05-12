import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { PlatformLocation } from '@angular/common';
import { BudgetItemType } from '../budget-item/budget-item.component';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {

  data: any;
  type: BudgetItemType;
  public totalRevenueDifference = 0;

  constructor(
    private dataService: DataService,
    public platformLocation: PlatformLocation,
  ) { }

  ngOnInit() {
    this.data = this.dataService.getData();
    this.type = BudgetItemType.Revenue;

    this.dataService.totalRevenueDifference.subscribe({
      next: (totalRevenueDifference) => {
        this.totalRevenueDifference = totalRevenueDifference;
      }
    });
  }

}
