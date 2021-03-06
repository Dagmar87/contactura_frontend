import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Authentication } from '../model';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  authentication: Authentication;
  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    document.querySelector('html').style.background = 'linear-gradient(to right, #C0C0C0, #D2691E, #FF1493)'; 
  }

  ngOnDestroy(): void {
    document.querySelector('html').style.background = 'none';
  }

  login(){
    this.authentication = this.loginForm.value;
    if(this.loginForm.valid){
      this.loginService.authenticate(this.authentication).subscribe(
        data => {
          console.log(data, 'o token é');
        }        
      );
    }else{
      Swal.fire({
        title: 'Ooops!',
        text: 'Preencha todos os campos',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }
  }

}
