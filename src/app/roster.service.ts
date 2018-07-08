import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Roster, Service } from './roster';

@Injectable({
  providedIn: 'root'
})
export class RosterService {

  constructor() { }

  public getRoster():Observable<Roster>{
    /*return Observable.create(function(observer) {
      observer.next(this.createRoster());
    });*/

    return of(this.createRoster());
  }

  public saveRoster(roster : Roster) : void{
    
  }

  private createRoster(): Roster{
    let service = new Service('07.07.2018', 'Herbert Maier', 'Ralf Huber', 'Training');
    let service2 = new Service('14.07.2018', 'Hubert Maier', 'Josef Huber', 'Training');
    let service4 = new Service('14.07.2018', 'Hubert Maier', 'Josef Huber', 'Training');
    let service5 = new Service('14.07.2018', 'Hubert Maier', 'Josef Huber', 'Training');
    let service6 = new Service('14.07.2018', 'Hubert Maier', 'Josef Huber', 'Training');
    let service7 = new Service('14.07.2018', 'Hubert Maier', 'Josef Huber', 'Training');
    let service8 = new Service('14.07.2018', 'Hubert Maier', 'Josef Huber', 'Training');
    let service9 = new Service('14.07.2018', 'Hubert Maier', 'Josef Huber', 'Training');
    let service10 = new Service('14.07.2018', 'Bauer Herbert', 'Humber Josef', 'Spiel');
    return new Roster('Dienstplan Vorrunde Saison 2018/2019', [service, service2, service4, service5, service6,service7, service8, service9, service9, service9, service10, service10, service10, service10,service10,service9,service9,service9,service9,service9]);
  }

}
