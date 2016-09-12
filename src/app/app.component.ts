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

  addTask(story){
    //forma de obtener la información de un input en Typescript
    var tsk = (<HTMLInputElement>document.getElementById("taski")).value;
    story.task.push(tsk);
    this.storyServicemanager.saveStory(story);
    console.log(story);
  }

  addEffort(story){
    var effortdate = (<HTMLInputElement>document.getElementById("effort-date")).value;
    var efforthours = (<HTMLInputElement>document.getElementById(("effort-hours"))).value;
    story.spend_efforts.push({hours:efforthours, date:effortdate});
    console.log(story);
  }

  addComments(story){
    var commenttext = (<HTMLInputElement>document.getElementById("comment-text")).value;
    story.comments.push(commenttext);
    console.log(story);
  }

  saveEditable(value) {
     this.storyServicemanager.saveStory(this.story);

  }

}

