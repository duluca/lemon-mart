import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-home',
  styles: [`
    div[fxLayout] {margin-top: 32px;}
  `],
  template: `
    <div fxLayout="column" fxLayoutAlign="center center">
      <span class="mat-display-2">Hello, Lemonite!</span>
      <button mat-raised-button color="primary">Login</button>
    </div>
  `
  // template: `
  //   <div fxLayout="row" fxLayoutAlign="center">
  //     <mat-card fxFlex="400px">
  //       <mat-card-header>
  //         <mat-card-title><div class="mat-headline">Hello, Lemonite!</div></mat-card-title>
  //       </mat-card-header>
  //       <mat-card-content>
  //         <app-login></app-login>
  //       </mat-card-content>
  //     </mat-card>
  //   </div>
  // `,
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
