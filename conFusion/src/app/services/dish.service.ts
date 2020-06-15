import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
//import{ DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';


//pour le http serveur
import { map , catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';


import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,   
    private processHTTPMsgService: ProcessHTTPMsgService) { }

/* avec les promises
  getDishes():Promise<Dish[]> {
    return new Promise(resolve=>{
      //Simulate serveur latency with 2 second delay
      setTimeout(()=>resolve(DISHES),2000);
    }); 
  }
*/

/*with obsrvable*/
/*
  getDishes(): Observable<Dish[]> {
    return of(DISHES).pipe(delay(2000));
  }
  
  getDish(id: string): Observable<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  
  }

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }


  getDishIds(): Observable<string[] | any> {
    return of(DISHES.map(dish => dish.id ));
  }
  */
  /*pour le serveur*/
  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes').pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0])).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id))).pipe(catchError(this.processHTTPMsgService.handleError));
  }





  
}
