"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/Rx');
var ProjectService = (function () {
    function ProjectService(http) {
        this.endpoint_url = "http://localhost/scrum-app/web/app_dev.php/api/project/index";
        this.http = http;
    }
    ProjectService.prototype.getProjects = function () {
        return this.http.get(this.endpoint_url).map(function (res) { return res.json(); });
    };
    ProjectService = __decorate([
        core_1.Injectable()
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;
var StoryService = (function () {
    function StoryService(http) {
        this.endpoint_url = "http://localhost/scrum-app/web/app_dev.php/api/story/index";
        this.http = http;
    }
    StoryService.prototype.getStories = function () {
        return this.http.get(this.endpoint_url).map(function (res) { return res.json(); });
    };
    StoryService = __decorate([
        core_1.Injectable()
    ], StoryService);
    return StoryService;
}());
exports.StoryService = StoryService;
//# sourceMappingURL=project.service.js.map