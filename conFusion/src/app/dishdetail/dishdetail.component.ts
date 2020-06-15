import { Component, OnInit,Input, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { MatCardModule } from '@angular/material/card';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Feedback } from '../shared/feedback';
import {Comment} from '../shared/comment';
import {MatSliderModule} from '@angular/material/slider';
import { baseURL } from '../shared/baseurl';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {


  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  rating : number;
  
  feedbackForm: FormGroup;
  //feedback: Feedback;
  errMess: string;



  @ViewChild('fform') feedbackFormDirective;
  
  formErrors = {
    'firstname':'',
  };

  validationMessages = {
    'name':{
      'required':'First name is rquired',
      'minlength':'First name must be at least 2 caracters',
      'maxlength':'First name cant not be more than 25 caracters',
    },
  };
  selectedRam: any;



  constructor(private dishservice: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              @Inject('BaseURL')  public baseURL : string
             ) { 
        this.createForm()
       ;
 }

  
  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); },errmess=>this.errMess=<any>errmess);
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(25)]],
      message: ''
    });

    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();//re set fomr validation
}

 

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  pitch(event: any) {
    this.rating = event.value;
  }

  onSubmit() {
    //this.feedback = this.feedbackForm.value;

  const  author : string = this.feedbackForm.value['name'];
  const  message : string = this.feedbackForm.value['message'];
  //const  comment = new Comment(this.rating,message,author, Date() );
    
  const comment : Comment ={
    rating: 0,
    author:'',
    comment:'',
    date:''
  };

  comment.rating = this.rating;
  comment.author = author;
  comment.comment = message;
  comment.date = Date();


    console.log('le commentaire ',comment);

    this.feedbackForm.reset({
      name: '',
      message: ''
    });
    //this.feedbackFormDirective.resetForm();
    this.dish.comments.push(comment);
  }



  setRam(value){
    this.selectedRam = value;
    console.log(this.selectedRam);
}


}
