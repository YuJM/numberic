import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './routes';
import { P1Component } from './views/p1/p1.component';
import { StartViewComponent } from './views/start-view/start-view.component';

import { ListToStrPipe } from './list-to-str.pipe';
import { LastItemPipe } from './last-item.pipe';
import { ResultDialogComponent } from './views/result-dialog/result-dialog.component';

const materialModule = [MatCardModule, MatIconModule, MatButtonModule, MatDialogModule, MatTooltipModule];

@NgModule({
  declarations: [
    AppComponent,
    StartViewComponent,
    P1Component,
    ListToStrPipe,
    LastItemPipe,
    ResultDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    materialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ResultDialogComponent]
})
export class AppModule {
}
