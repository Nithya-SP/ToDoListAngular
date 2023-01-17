import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
// import {Message, SelectItem} from 'primeng/primeng';
import {Observable} from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class SharedService {

  logincheck:any;
  datatablevalue:any;

    //  private globalUrl= document.location.protocol +'//'+ document.location.hostname + '/TeekayIA';
      //private globalUrl= document.location.protocol +'//'+ document.location.hostname + '/injury';
     private globalUrl:string="http://localhost:8081";
      //  private globalUrl:string="http://prm.solverminds.net:8061/injury";
      private headers: Headers = new Headers({"Content-Type'" : 'application/json',
                                'Accept': 'application/json',
                                'Access-Control-Allow-Origin':'*',
                                'Access-Control-Allow-Credentials':'true'
      });
constructor(private http: Http) { }

public addtask(inputValue){
  return this.http.post(`${this.globalUrl}/task`, inputValue);

}

public deletetask(id){
  return this.http.delete(`${this.globalUrl}/task?id=${id}`, { headers: this.headers }).pipe(map((res) => res));

}


    public login(username,password){
      return this.http.post(`${this.globalUrl}/loginRequest?username=${username}&password=${password}`, { headers: this.headers }).pipe(map((res) => res));
    }

    public retrievetask(username){
        // return this.http.get(this.globalUrl+"/retrievetask", { headers: this.headers }).map(res => res.json());
      return this.http.get(`${this.globalUrl}/retrievetask?name=${username}`, { headers: this.headers }).pipe(map((res) => res));
    }
    public UpdateTask(inputValue){
      return this.http.put(`${this.globalUrl}/task`, inputValue);

    }




  }
