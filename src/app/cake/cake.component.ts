import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css', '../app.component.css']
})
export class CakeComponent implements OnInit {
  @Input() cakeToShow: any;
  @Input() avgRating: any;
  stars = [0,0,0,0,0];
  constructor() { }

  ngOnInit() {
  }

  showStar(rating, starIdx) {
    console.log('inside show star function');
    if (starIdx <= rating-1) {
      return "fa fa-star checked"
    }
    else {
      return "fa fa-star"
    }
  }
  

}
