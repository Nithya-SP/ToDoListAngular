import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedService } from './shared.service';
import { HttpModule } from '@angular/http';
import {MatListModule} from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource} from '@angular/material/table';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
// import { MatDialog } from '@angular/material/dialog';

// import {SelectionModel} from '@angular/cdk/collections';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    ToDoListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,HttpModule,FormsModule,ReactiveFormsModule,MatListModule,MatTableModule,MatCheckboxModule,
    RouterModule.forRoot([
   {path: '', component: LoginComponent},
   {path: 'logout', component: LoginComponent},
   {path: 'task', component: ToDoListComponent},
 ]),
 FormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
