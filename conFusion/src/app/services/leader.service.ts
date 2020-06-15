import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
import { delay } from 'rxjs/operators';
import { Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }


  getLeaders(): Observable<Leader[]>{
    return of(LEADERS).pipe(delay(2000));
    
  }
 
  getLeader(id: string): Observable<Leader> {
    return of(LEADERS.filter((lead) => (lead.id === id))[0]).pipe(delay(2000));
  }
 
  
  getFeaturedLeader(): Observable<Leader> {
    return  of(LEADERS.filter((lead) => lead.featured)[0]).pipe(delay(2000));
  
  }
 
}
