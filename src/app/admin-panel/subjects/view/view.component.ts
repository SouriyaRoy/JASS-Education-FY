import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  description="Object-oriented programming (OOP) is a programming paradigm based on the concept of 'objects', which can contain data and code: data in the form of fields (often known as attributes or properties), and code, in the form of procedures (often known as methods).s"
 
  constructor() { 
    this.descriptionSplit();
  }
  
  ngOnInit(): void {
  }

  descriptionSplit()//sample function to split string call this after getting data from backend.
  {
    this.description=this.description.slice(0,20);
    console.log(this.description);
  }
}
