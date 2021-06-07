import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.scss']
})
export class UserCreateEditComponent implements OnInit, OnDestroy {
  user: User = null;
  userForm = new FormGroup({
    id: new FormControl(''),
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    admin: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    document.querySelector('html').style.background = 'linear-gradient(to right, #F4A460, #808080, #DC143C)';
    this.userService.botaoEdit.subscribe( edit => {
      this.user = edit;
      this.userForm.get('id').setValue(edit.id);
      this.userForm.get('username').setValue(edit.username);
      this.userForm.get('password').setValue(edit.password);
      this.userForm.get('name').setValue(edit.name);
      this.userForm.get('admin').setValue(edit.admin);
    });
  }

  ngOnDestroy(): void {
    document.querySelector('html').style.background = 'none';
  }

  createUser(){
    if(this.userForm.valid){
      this.user = this.userForm.value;
      this.userService.createUser(this.user).subscribe(
        data => {
          Swal.fire({
            title: 'Eeeeba!',
            text: 'Usuário criado com sucesso',
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          this.router.navigate(['/user_list']);
        },
        error => {
          Swal.fire({
            title: 'Ooops!',
            text: 'Erro ao criar usuário',
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
      );
    }else {
      Swal.fire({
        title: 'Ooops!',
        text: 'Preencha todos os campos',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }
  }

  updateUser(){
    if(this.userForm.valid){
      this.user = this.userForm.value;
      this.userService.updateUser(this.user).subscribe(
        data => {
          Swal.fire({
            title: 'Eeeeba!',
            text: 'Usuário editado com sucesso',
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          this.router.navigate(['/user_list']);
        },
        error => {
          Swal.fire({
            title: 'Ooops!',
            text: 'Erro ao editar usuário',
            icon: 'error',
            confirmButtonText: 'Okay'
          });
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
