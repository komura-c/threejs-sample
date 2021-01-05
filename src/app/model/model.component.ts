import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SceneService } from '../services/scene.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss'],
})
export class ModelComponent implements OnInit {
  @ViewChild('renderer')
  set rendererContainer(rendererContainer: ElementRef) {
    this.sceneService.initRender(rendererContainer.nativeElement);
  }

  constructor(private sceneService: SceneService) {}

  ngOnInit(): void {}
}
