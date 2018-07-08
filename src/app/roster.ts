export class Roster {
    
    constructor(public title: string, public serviceList: Service[]){
    }

}

export class Service {

    constructor(public date:string, public serviceName1: string, public serviceName2: string, public note?: string){
    }

}
