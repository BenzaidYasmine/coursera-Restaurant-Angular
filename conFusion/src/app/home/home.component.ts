import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { MatCard } from '@angular/material/card';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string ;

  constructor(private dishservice: DishService,
              private leaderService: LeaderService,
              private promotionservice: PromotionService,
              @Inject('BaseURL') public baseURL : string
             ) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
        .subscribe((dish)=>this.dish =dish, errmess => this.dishErrMess = <any>errmess ) ;
    this.promotionservice.getFeaturedPromotion()
        .subscribe((promotion)=>this.promotion =promotion );
     this.leaderService.getFeaturedLeader()
        .subscribe((leader)=> this.leader = leader);

  }






  
  





}
