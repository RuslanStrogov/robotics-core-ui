import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgFlowchart, NgFlowchartCanvasDirective, NgFlowchartStepComponent, NgFlowchartStepRegistry } from '@joelwenzel/ng-flowchart';


@Component({
  selector: 'app-custom-router-step',
  template: `
  <div class="router-step" #canvasContent>
    <span>{{ data.name }}</span>
    <button class="btn" (click)="onAddRoute()">Add Route</button>
  </div>
  `,
  // styleUrls: ['./custom-router-step.component.scss']
})
export class CustomRouterStepComponent extends NgFlowchartStepComponent {

  //@ts-ignore
  getDropPositionsForStep(pendingStep: NgFlowchart.PendingStep): NgFlowchart.DropPosition[] {
    if (pendingStep.template !== CustomRouterStepComponent) {
      return ['ABOVE', 'LEFT', 'RIGHT'];
    }
    else {
      return ['BELOW'];
    }
  }

  onAddRoute() {
    let route = {
      name: 'New Route',
      condition: ''
    }

    this.addChild({
      template: CustomRouterStepComponent, //another custom step
      type: 'route-step',
      data: route
    }, {
      sibling: true
    });
  }
}




@Component({
  selector: 'robotics-app-page-hardware-dashboard',
  templateUrl: './page-hardware-dashboard.component.html',
  styleUrls: ['./page-hardware-dashboard.component.css']
})
export class PageHardwareDashboardComponent implements OnInit {

  @ViewChild(NgFlowchartCanvasDirective)
  canvasElement: NgFlowchartCanvasDirective;

  @ViewChild('stepContent', { read: TemplateRef }) stepContent:TemplateRef<any>;


  constructor(private stepRegistry: NgFlowchartStepRegistry) { }

  items: any = [
    {
      name: 'Logger',
      type: 'log',
      data: {
        name: 'Log',
        icon: { name: 'log-icon', color: 'blue' },
        config: {
          message: null,
          severity: null
        }
      }
    }
  ]

  ngOnInit() {

    // this.flowchartStep = ;


  }

  ngAfterViewInit() {

    let flow: NgFlowchart.Flow = this.canvasElement.getFlow();

    // manual canvas zoom methods reside on the canvas directive directly
    this.canvasElement.scaleDown()
    this.canvasElement.scaleUp()
    this.canvasElement.setScale(1) //resets back to default scale

    //created from standared ng-template refs
    // this.stepRegistry.registerStep('rest-get', this.normalStepTemplate);
    // this.stepRegistry.registerStep('filter', this.normalStepTemplate);

    //created from custom component
    // this.stepRegistry.registerStep('router', CustomRouterStepComponent);
  }

  onDelete(item: any) {

  }

  flowchartStep: any;

}
