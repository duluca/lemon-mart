import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-manager-home',
  template: `
    <p>
      <img
        src="https://user-images.githubusercontent.com/822159/36186559-c2ee9c4a-110d-11e8-80a6-933943a1336f.png"
      />
    </p>
  `,
  styles: [],
})
export class ManagerHomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
