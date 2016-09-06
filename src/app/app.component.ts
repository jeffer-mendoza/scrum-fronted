import {Component} from '@angular/core';
import {ProjectService} from './project.service';
import {StoryService} from './project.service';
import { InlineEditorDirectives} from 'ng2-inline-editor';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [ProjectService, StoryService],
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



  constructor(private projectService: ProjectService, private storyService: StoryService) {
    this.projectService = projectService;
    this.storyService = storyService;
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

  saveEditable(value) {
    //call to http server
    console.log('http.server: ' + value);

  }


}

