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
  
  selectedDish: Dish;
  
  constructor( private dishService: DishService,
    @Inject('BaseURL') public baseURL : string
   ) { }

    
  ngOnInit() {
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes);
  }
  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
/*
  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }*/

}