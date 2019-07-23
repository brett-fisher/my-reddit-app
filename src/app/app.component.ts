import { Component } from '@angular/core';
const snoowrap = require('snoowrap');;

//<img [hidden]="img == null || img == 'self'" [ngStyle]="setImageSize()" src="{{ img }}">

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subredditInput = '';
  postTitle = '';
  postText = '';
  img;
  url = '';
  submissionId = '';
  comments = '';

  width;
  height;

  setImageSize() {
    let style = {
      'width': 'this.width'+'px',
      'height': 'this.height'+'px'
    };
    return style
  }

  getSubredditData() {

    const r = new snoowrap({
      userAgent: 'my-app',
      clientId: '1tQ0hKzdmj18fA',
      clientSecret: 'ZuMaXl85Kia_6QjpKnnx-G9U5ns',
      username: 'bdf1221',
      password: 'RecogXcity23$'
    })

    var data = r
      .getSubreddit(this.subredditInput)
      .getNew({ limit: 1 })
      .then(r => {
        console.log(r);
        this.postTitle = r[0].title;
        this.postText = r[0].selftext;
        this.submissionId = r[0].id;
        this.img = null;

        
        // if there's an image, show
        if (r[0]['preview']['images'][0]['source']['url']) {
          this.img = r[0]['preview']['images'][0]['source']['url'];
        } else {
          this.img = null;
        }

        if (r[0].url) {
          this.url = r[0].url;
        } else {
          this.url = "";
        }
      })

      var replies = r
        .getSubmission(this.submissionId)
        .expandReplies()
        .then(r => {
          console.log(r);
        })

    console.log(data);
  }
}
