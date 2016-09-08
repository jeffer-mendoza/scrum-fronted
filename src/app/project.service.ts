import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx'
import { Headers, RequestOptions, Response} from '@angular/http';

@Injectable()
export class ProjectService{

  endpoint_url:String = "http://localhost/scrum-backend/web/app_dev.php/api/project/index";
  http;
  constructor(http: Http){
    this.http = http;
  }

  getProjects (){
    return this.http.get(this.endpoint_url).map(res => res.json());
  }
}

@Injectable()
export class StoryService{
  endpoint_url:String = "http://localhost/scrum-backend/web/app_dev.php/api/story/index";
  http;
  constructor(http: Http){
    this.http = http;
  }

  getStories (){
    return this.http.get(this.endpoint_url).map(res => res.json());
  }

}
@Injectable()
export class StoryServiceManager{
  http;

  constructor(http: Http){
    this.http = http;
  }

  saveStory (story){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log("dfsd");
    return this.http.post("http://localhost/scrum-backend/web/app_dev.php/api/story/index", story, headers)
      .subscribe(data => {alert('ok');}, error => { console.log(error)})
      .map((res:Response)=> res.json());
  }
}

