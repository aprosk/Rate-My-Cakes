import { Component, OnInit } from '@angular/core';

import { HttpService} from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';

  cakes: any;
  newCake: any;

  selectedCake: any;

  reviewForms: any;

  newReview: any;
  


  cakeToShow: any;
  avgRating:any;

  constructor(private _httpService: HttpService) {}
  ngOnInit() {
    this.newCake = {baker: "", imageUrl:""};
    this.newReview = {rating: 0, comment: ""}
    this.getCakes();
  }

  getCakes() {
    let observable = this._httpService.getCakes();
    observable.subscribe(data => {
      console.log(data);
      this.cakes = data;
      var reviewForms = {}
      for (let cake of this.cakes) {
        reviewForms[cake._id] = {
          rating: 0, 
          comment: "",
          stars: [0,0,0,0,0]
        }
      }
      this.reviewForms = reviewForms;
      console.log(reviewForms);
    })
  }

  onSubmitCake() {
    let observable = this._httpService.createCake(this.newCake);
    observable.subscribe(data => {
      console.log(data);
      this.ngOnInit();
    })
  }

  selectCake(_id) {
    this.selectedCake = _id;
  }


  onSubmitReview(_id) {
    let observable = this._httpService.createReview({_id: _id, review: this.reviewForms[_id]});
    observable.subscribe(data => {
      console.log(data);
      this.ngOnInit();
    })
  }

  showDetails(cake) {
    console.log(cake);
    this.cakeToShow = cake;
    this.avgRating = this.getAvgRating(cake);
  }

  showStar(cakeId, starIndex) {
    console.log('inside show star function');
    let star = this.reviewForms[cakeId].stars[starIndex]
    if (star == 0) {
      return "fa fa-star"
    }
    else {
      return "fa fa-star checked"
    }

  }

  hoverStar(cakeId, starIndex) {
    
    for (let i=0; i<this.reviewForms[cakeId].stars.length; i++) {
      if (i <= starIndex) {
        this.reviewForms[cakeId].stars[i] = 1;
      }
      else {
        this.reviewForms[cakeId].stars[i] = 0;
      }
      
    }

  }

  resetColor(cakeId) {
    if (this.reviewForms[cakeId].rating == 0) {
      this.reviewForms[cakeId].stars = [0,0,0,0,0]
    }
    else {
      this.setRating(cakeId, this.reviewForms[cakeId].rating-1)
    }
  }

  setRating(cakeId, starIndex, reviews=this.reviewForms) {
    reviews[cakeId].rating = starIndex + 1;
    for (let i=0; i<reviews[cakeId].stars.length; i++) {
      if (i <= starIndex) {
        reviews[cakeId].stars[i] = 1;
      }
      else {
        reviews[cakeId].stars[i] = 0;
      }
      
    }
    
  }

  getAvgRating() {
    let sum = 0;
    let avg = 0;
    if (this.cakeToShow.reviews.length > 0) {
      for (let review of this.cakeToShow.reviews) {
        sum += review.rating;
      }
      
      avg = sum/this.cakeToShow.reviews.length
      console.log(avg)
      return avg
    }
    return 0;
    

  }


  
}
