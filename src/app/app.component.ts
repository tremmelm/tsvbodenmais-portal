import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private navLinks: any[];
  private activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
        {
            label: 'Dienstplan',
            path: 'roster',
            index: 0
        }, {
            label: 'Telefonliste',
            path: 'phonelist',
            index: 1
        }, {
            label: '.......',
            link: '',
            index: 2
        }
    ];
}

ngOnInit(): void {
  this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
}

}
