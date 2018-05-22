import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './routes';
import { P1Component } from './views/p1/p1.component';
import { StartViewComponent } from './views/start-view/start-view.component';

@NgModule({
  declarations: [
    AppComponent,
    StartViewComponent,
    P1Component
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
