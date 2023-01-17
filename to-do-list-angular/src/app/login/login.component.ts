import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { MessageService} from '../shared/shared.service';
// import { Message } from 'primeng/primeng';
import { SharedService } from '../shared.service';
// import {SharedService} from './shared.service'
// import { Adal4Service } from 'adal-angular4';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username:string;
  password:string;
  showError: boolean = false;

  // msgs: Message[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,private sharedService:SharedService
  ) { }

  login(){
    console.log(this.username,this.password);
    this.sharedService.login(this.username,this.password).subscribe(res => {
      console.log(res.json().success);

  if(res.json().status==200){
    localStorage.setItem("username",this.username);
  this.router.navigate(['/task']);
}else{
  this.showError =true;

}
}
);
}
}
