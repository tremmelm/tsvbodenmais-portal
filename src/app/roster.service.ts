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
    let service2 = new Service('14.07.2018', 'Hubert Maier2', 'Josef Huber', 'Training');
    let service4 = new Service('14.07.2018', 'Hubert Maier4', 'Josef Huber', 'Training');
    let service5 = new Service('14.07.2018', 'Hubert Maier5', 'Josef Huber', 'Training');
    let service6 = new Service('14.07.2018', 'Hubert Maier6', 'Josef Huber', 'Training');
    let service7 = new Service('14.07.2018', 'Hubert Maier7', 'Josef Huber', 'Training');
    let service8 = new Service('14.07.2018', 'Hubert Maier8', 'Josef Huber', 'Training');
    let service9 = new Service('14.07.2018', 'Hubert Maier9', 'Josef Huber', 'Training');
    let service10 = new Service('14.07.2018', 'Bauer Herbert10', 'Humber Josef', 'Spiel');
    let service11 = new Service('14.07.2018', 'Bauer Herbert22', 'Humber Josef', 'Spiel');
    let service12 = new Service('14.07.2018', 'Bauer Herbert11', 'Humber Josef', 'Spiel');
    let service14 = new Service('14.07.2018', 'Bauer Herbert12', 'Humber Josef', 'Spiel');
    let service15 = new Service('14.07.2018', 'Bauer Herbert14', 'Humber Josef', 'Spiel');
    let service16 = new Service('14.07.2018', 'Bauer Herbert15', 'Humber Josef', 'Spiel');
    let service17 = new Service('14.07.2018', 'Bauer Herbert16', 'Humber Josef', 'Spiel');
    let service18 = new Service('14.07.2018', 'Bauer Herbert17', 'Humber Josef', 'Spiel');
    let service19 = new Service('14.07.2018', 'Bauer Herbert18', 'Humber Josef', 'Spiel');
    let service20 = new Service('14.07.2018', 'Bauer Herbert19', 'Humber Josef', 'Spiel');
    let service21 = new Service('14.07.2018', 'Bauer Herbert20', 'Humber Josef', 'Spiel');
    

    return new Roster('Dienstplan Vorrunde Saison 2018/2019', [service, service2, service4, service5, service6,service7, service8, service9, service10, service11, service12, service14,service15,service16,service17,service18,service19,service20,service21]);
  }

}
