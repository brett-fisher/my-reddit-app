import { Component } from '@angular/core';
const snoowrap = require('snoowrap');

/*
  As a quick note...I could probably abstract the logic which gets
  the reddit data out into another object with methods that I call in
  the getSubredditData() method...that would be v2 of this. It would 
  look something like:

    getSubredditData() {
      var r = new Reddit()

      reddit.getTitle()
      reddit.getComments()
    }

    KNOWN BUG: couldnt figure out how to use angular to clear the 
    comments from the previous post that gets rendered.
*/


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
  comments = [];

  width;
  height;

  getSubredditData() {
    this.resetComments(this.comments);

    const r = new snoowrap({
      userAgent: 'my-app',
      clientId: 'PaJVCLl8lIxteA',
      clientSecret: 'd5jyBGHNnG72HzYUYySQ1XFc-bo',
      username: 'app4bbot',
      password: 'Password1'
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

        // if there's a url show
        if (r[0].url) {
          this.url = r[0].url;
        } else {
          this.url = "";
        }

        // fetch the comments
        r[0].comments.fetchAll().then(obj => {
          for (var i=0; i<obj.length; i++) {
            this.comments[i] = obj[i].body;
          }
        })
      })
    }

    resetComments(list) {
      list = [];
    }
}
