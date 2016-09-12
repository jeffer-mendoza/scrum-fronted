import {Component} from '@angular/core';
import {ProjectService, StoryServiceManager} from './project.service';
import {StoryService} from './project.service';
import { InlineEditorDirectives} from 'ng2-inline-editor';
import {FormControl} from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [ProjectService, StoryService, StoryServiceManager],
  directives: [InlineEditorDirectives],
})

export class AppComponent {
  title = 'INVEST';
  error = "";
  projects = [];
  stories = [];
  story = [];
  visibleBacklogs: boolean = true;
  visibleSprint: boolean = true;
  visibleStory: boolean = true;
  prioritySelectOptions = [
    { value: 1, text: '1' },
    { value: 2, text: '2' },
    { value: 3, text: '3' },
    { value: 4, text: '4' },
    { value: 5, text: '5' }
  ];

  statusOptions = [
    { value: 1, text: '1' },
    { value: 2, text: '2' },
    { value: 3, text: '3' },
    { value: 4, text: '4' },
    { value: 5, text: '5' }
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
    } else {
      this.visibleSprint = true;
      this.stories = project.stories;
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

  getStories() {
    this.storyService.getStories()
      .subscribe(
        data => this.stories = data,
        error => this.error = 'No se encontraron historias de usuario'
      );
  }

  addAcceptanceReq(story){
    var acceptancetext = (<HTMLInputElement>document.getElementById("acceptance_requirements"));
    story.acceptance_requirements.push({"status": "","description":acceptancetext.value});
    acceptancetext.value = "";
    console.log(story);
  }

  addTask(story){
    //forma de obtener la información de un input en Typescript
    var tasktext = (<HTMLInputElement>document.getElementById("taski"));
    story.task.push({"status": "","description":tasktext.value});
    // this.storyServicemanager.saveStory(story);
    tasktext.value = "";
    console.log(story);
  }

  addEffort(story){
    var effortdate = (<HTMLInputElement>document.getElementById("effort-date"));
    var efforthours = (<HTMLInputElement>document.getElementById(("effort-hours")));
    story.spend_efforts.push({hours:efforthours.value, date:effortdate.value});

    effortdate.value = "";
    efforthours.value = "";
    console.log(story);
  }

  addComments(story){
    var commenttext = (<HTMLInputElement>document.getElementById("comment-text"));
    story.comments.push({"description":commenttext.value});
    commenttext.value = "";

    console.log(story);
  }

  saveEditable(value) {
     this.storyServicemanager.saveStory(this.story);

  }

}

