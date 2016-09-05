"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var project_service_1 = require('./project.service');
var project_service_2 = require('./project.service');
var AppComponent = (function () {
    function AppComponent(projectService, storyService) {
        this.projectService = projectService;
        this.storyService = storyService;
        this.title = 'INVEST';
        this.error = "";
        this.projects = [];
        this.stories = [];
        this.story = [];
        this.visibleBacklogs = true;
        this.visibleSprint = true;
        this.visibleStory = true;
        this.projectService = projectService;
        this.storyService = storyService;
    }
    AppComponent.prototype.getProjects = function () {
        var _this = this;
        if (this.visibleBacklogs) {
            this.projectService.getProjects()
                .subscribe(function (data) { return _this.projects = data; }, function (error) { return _this.error = 'No se encontraron proyectos'; });
            this.visibleBacklogs = false;
        }
        else {
            this.visibleBacklogs = true;
        }
    };
    AppComponent.prototype.showSprint = function (project) {
        if (this.visibleSprint) {
            this.visibleSprint = false;
            this.stories = project.stories;
        }
        else {
            this.visibleSprint = true;
            this.stories = project.stories;
        }
    };
    AppComponent.prototype.showStory = function (story) {
        if (story != this.story) {
            this.visibleStory = false;
            this.story = story;
        }
        else {
            if (this.visibleStory) {
                this.visibleStory = false;
                this.story = story;
            }
            else {
                this.visibleStory = true;
                this.story = story;
            }
        }
    };
    AppComponent.prototype.getStories = function () {
        var _this = this;
        this.storyService.getStories()
            .subscribe(function (data) { return _this.stories = data; }, function (error) { return _this.error = 'No se encontraron historias de usuario'; });
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css'],
            providers: [project_service_1.ProjectService, project_service_2.StoryService]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map