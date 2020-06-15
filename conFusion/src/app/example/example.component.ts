import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

  ngOnInit(): void {
   
  }

  constructor() { }


   fruits = ["Banana", "Orange", "Apple", "Mango"];


   myFunction() {
    this.fruits.push("Kiwi");
  
  }


  appareil ={
    name:'',
 
  }
 
  onSubmit( form:NgForm){
    console.log(this.appareil.name);
        form.reset({
          nameddee: '',
         
        });

   
  }

}
