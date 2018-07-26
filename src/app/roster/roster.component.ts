import { Component, OnInit,  NgZone } from '@angular/core';
import { RosterService } from '../roster.service';
import { Roster, Service } from '../roster';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {
  private title : string;
  private backupServices : Service[];
  private services : Service[];
  private displayedServices: Service []; //used to display all services within the current page
  private displayedColumns: string[];
  private editingEnabled: boolean;
  private pageSize: number = 13;
  private pageIndex : number = 0;
  private selectedRows: number [];

  /*set services (services: Service[]) {
    this._services = services;
    this.displayedServices = this._services.slice(this.pageIndex, this.pageSize)
  }*/

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private zone: NgZone, private rosterService: RosterService, private cd: ChangeDetectorRef) {
    this.displayedColumns = Object.getOwnPropertyNames(new Service('','','',''));
    this.editingEnabled = false;
    this.selectedRows = [];
    this.services = [];
  }

  ngOnInit() {
    //TODO: add TokenInterceptor (implements HttpInterceptor) to set the token and handle the 401
    this.rosterService.getRoster().subscribe(roster => {
      this.title = roster.title;
      this.services = roster.serviceList;
      this.backupServices = this.services.slice(0);
      this.displayedServices = this.services.slice(0, this.pageSize);
    },
    error => {
      console.log("could not fetch roster from the server");
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
    this.displayedColumns = this.editingEnabled ? 
      ['select', ...Object.getOwnPropertyNames(new Service('','','',''))] :
      Object.getOwnPropertyNames(new Service('','','',''));
  }

  private saveRoster(){
    this.editingEnabled = false;
    this.services = this.services.sort((service1, service2)=> {
      if(!service1.date)
      {
        return -1;
      }

      if(!service2.date)
      {
        return +1;
      }

      let date1 = service1.date.split('.');
      let date2 = service2.date.split('.');
      var diff = new Date(parseInt(date1[2]), parseInt(date1[1]), parseInt(date1[0])).getTime() - new Date(parseInt(date2[2]), parseInt(date2[1]), parseInt(date2[0])).getTime()
      console.log(diff);
      return diff;
    });
    this.displayedColumns = Object.getOwnPropertyNames(new Service('','','',''));
    this.backupServices = this.services.slice(0);
  }

  private cancel(){
    this.editingEnabled = false;
    this.services = this.backupServices.slice(0);
    this.displayedServices = this.services.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
    this.displayedColumns = Object.getOwnPropertyNames(new Service('','','',''));
    this.selectedRows = [];
  }

  private addServiceRow(){
    this.services.unshift(new Service('','','',''));
    this.displayedServices = this.services.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
    this.editingEnabled = true;
  }

  private rowSelected(index: number){
    this.selectedRows.push(index);
  }

  private delete(){
    this.selectedRows.sort().reverse().forEach(selectedRowId => {
      let rowId = this.pageIndex * this.pageSize + selectedRowId;
      this.services.splice(rowId, 1);
      this.displayedServices = this.services.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
    });

    this.selectedRows = [];
  }

}
