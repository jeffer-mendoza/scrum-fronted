import { Component } from '@angular/core';
import {ProjectService, StoryServiceManager} from './project.service';
import {StoryService} from './project.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProjectService, StoryService, StoryServiceManager],

})
export class AppComponent {
  title = 'INVEST';
  error = "";
  projects = [];
  stories = [];
  story = [];
  project = null;
  visibleBacklogs: boolean = true;
  visibleSprint: boolean = true;
  visibleStory: boolean = true;
  visibleCreateStory: boolean = true;
  prioritySelectOptions = [
    {value: 1, text: '1'},
    {value: 2, text: '2'},
    {value: 3, text: '3'},
    {value: 4, text: '4'},
    {value: 5, text: '5'}
  ];

  statusOptions = [
    {value: 1, text: '1'},
    {value: 2, text: '2'},
    {value: 3, text: '3'},
    {value: 4, text: '4'},
    {value: 5, text: '5'}
  ];


  constructor(private projectService: ProjectService, private storyService: StoryService, private storyServicemanager: StoryServiceManager) {
    this.projectService = projectService;
    this.storyService = storyService;
    this.storyServicemanager = storyServicemanager;
  }

  getProjects() {
    if (this.visibleBacklogs) {
      this.projectService.getProjects()
        .subscribe(
          data => this.projects = data,
          error => this.error = 'No se encontraron proyectos'
        );
      this.visibleBacklogs = false;
    } else {
      this.visibleBacklogs = true;
    }
  }

  showSprint(project) {
    if (this.visibleSprint) {
      this.visibleSprint = false;
      this.stories = project.stories;
      this.project = project;
    } else {
      this.visibleSprint = true;
      this.stories = project.stories;
      this.project = project;
    }
  }

  showStory(story) {
    if (story != this.story) {
      this.visibleStory = false;
      this.story = story;
    } else {
      if (this.visibleStory) {
        this.visibleStory = false;
        this.story = story;
      } else {
        this.visibleStory = true;
        this.story = story;
      }
    }

  }

  showCreateStory(){
    if(this.visibleCreateStory == true){
      this.visibleCreateStory = false;
    }else{
      this.visibleCreateStory = true;
    }

  }

  getStories() {
    this.storyService.getStories()
      .subscribe(
        data => this.stories = data,
        error => this.error = 'No se encontraron historias de usuario'
      );
  }

  addAcceptanceReq(story) {
    var acceptancetext = (<HTMLInputElement>document.getElementById("acceptance_requirements"));
    story.acceptance_requirements.push({"status": "", "description": acceptancetext.value});
    acceptancetext.value = "";
    console.log(story);
  }

  addTask(story) {
    //forma de obtener la información de un input en Typescript
    var tasktext = (<HTMLInputElement>document.getElementById("taski"));
    story.task.push({"status": "", "description": tasktext.value});
    // this.storyServicemanager.saveStory(story);
    tasktext.value = "";
    console.log(story);
  }

  addEffort(story) {
    var effortdate = (<HTMLInputElement>document.getElementById("effort-date"));
    var efforthours = (<HTMLInputElement>document.getElementById(("effort-hours")));
    story.spend_efforts.push({hours: efforthours.value, date: effortdate.value});

    effortdate.value = "";
    efforthours.value = "";
    console.log(story);
  }

  addComments(story) {
    var commenttext = (<HTMLInputElement>document.getElementById("comment-text"));
    story.comments.push({"description": commenttext.value});
    commenttext.value = "";
    console.log(story);
  }

  addCreateStory(){
    var titlestorytext = (<HTMLInputElement>document.getElementById("title_story_text"));
    var wantstorytext = (<HTMLInputElement>document.getElementById("want_story_text"));
    var sothatstorytext = (<HTMLInputElement>document.getElementById("so_that_story_text"));

    var date = new Date;

    this.project.stories.push({id:2,title:titlestorytext.value,want:wantstorytext.value,so_that:sothatstorytext.value,priority:1,status:1,effort:1,start_date:date.toDateString(),due_date:date.toDateString(),task:[],comments:[],spend_efforts:[],acceptance_requirements:[]});

    console.log(this.project);
  }

  saveEditable(value) {
    this.storyServicemanager.saveStory(this.story);

  }

}


