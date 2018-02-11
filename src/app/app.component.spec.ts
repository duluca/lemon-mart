import { TestBed, async } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material.module'
import { AuthService } from './auth/auth.service'
import { AuthServiceFake } from './auth/auth.service.fake'
import { HttpClientTestingModule } from '@angular/common/http/testing'
describe('AppComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          MaterialModule,
          NoopAnimationsModule,
          HttpClientTestingModule,
        ],
        providers: [{ provide: AuthService, useClass: AuthServiceFake }],
        declarations: [AppComponent],
      }).compileComponents()
    })
  )
  it(
    'should create the app',
    async(() => {
      const fixture = TestBed.createComponent(AppComponent)
      const app = fixture.debugElement.componentInstance
      expect(app).toBeTruthy()
    })
  )
  it(
    'should render title in a h1 tag',
    async(() => {
      const fixture = TestBed.createComponent(AppComponent)
      fixture.detectChanges()
      const compiled = fixture.debugElement.nativeElement
      expect(compiled.querySelector('.mat-h2').textContent).toContain('LemonMart')
    })
  )
})
