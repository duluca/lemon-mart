import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-home',
  template: `
    <h2 class="mat-display-4" style="text-align: center">Home Component</h2>
  `,
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
