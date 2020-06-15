import { Component, OnInit ,Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import{ DishService} from '../services/dish.service';
import { baseURL } from '../shared/baseurl';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-menu',
  templateUrl:'./menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  
  dishes: Dish[] ;
  
 // selectedDish: Dish;
  errMess: string;
  
  constructor( private dishService: DishService,
    @Inject('BaseURL') public baseURL : string
   ) { }

    
  ngOnInit() {
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }
 
/*
  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }*/

}