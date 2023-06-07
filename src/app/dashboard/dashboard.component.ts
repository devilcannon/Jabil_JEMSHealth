import { Component, OnInit } from '@angular/core';
import { DataService, HealthCheck } from 'app/jems.service';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: HealthCheck;
  constructor(private dataService: DataService) { }
  
  ngOnInit() {
    interval(5000)
    .pipe(switchMap(() => this.dataService.getData()))
    .subscribe((data) => {
      this.data = data;
    });
  }

}
