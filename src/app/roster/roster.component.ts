import { Component, OnInit } from '@angular/core';
import { RosterService } from '../roster.service';
import { Roster, Service } from '../roster';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {
  private title : string;
  private services : Service[];
  private displayedServices: Service [];
  private displayedColumns: string[];
  private editingEnabled: boolean;
  private pageSize: number = 10;
  private pageIndex : number = 0;

  /*set services (services: Service[]) {
    this._services = services;
    this.displayedServices = this._services.slice(this.pageIndex, this.pageSize)
  }*/

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private rosterService: RosterService, private cd: ChangeDetectorRef) {
    this.displayedColumns = Object.getOwnPropertyNames(new Service('','','',''));
    this.editingEnabled = false;
  }

  ngOnInit() {
    this.rosterService.getRoster().subscribe(roster => {
      this.title = roster.title;
      this.services = roster.serviceList;
      this.displayedServices = this.services.slice(0, this.pageSize);
    });

    this.paginator.page.subscribe(page => {
      this.pageIndex = page.pageIndex;
      this.displayedServices = this.services.slice(page.pageIndex * page.pageSize, page.pageIndex * page.pageSize + page.pageSize);
      console.log(this.displayedServices);
      console.log(this.services.length);
    });
  }

  private enableEditing(){
    this.editingEnabled = !this.editingEnabled;
  }

  private saveRoster(){
    this.editingEnabled = false;
    this.services = this.services.sort((service1, service2)=> {
      let date1 = service1.date.split('.');
      let date2 = service2.date.split('.');
      var diff = new Date(parseInt(date1[2]), parseInt(date1[1]), parseInt(date1[0])).getTime() - new Date(parseInt(date2[2]), parseInt(date2[1]), parseInt(date2[0])).getTime()
      console.log(diff);
      return diff;
    });
  }

  private cancel(){
    this.editingEnabled = false;
  }

  private addServiceRow(){
    this.services.unshift(new Service('','','',''));
    this.displayedServices = this.services.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
    this.editingEnabled = true;
  }

}
