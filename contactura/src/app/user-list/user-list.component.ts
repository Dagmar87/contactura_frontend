import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  userList: User[] = null;
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    document.querySelector('html').style.background = 'linear-gradient(to right, #4F4F4F, #FF69B4, #BDB76B)';
    this.getUsers();
  }

  ngOnDestroy(): void {
    document.querySelector('html').style.background = 'none';
  }

  getUsers(){
    this.userService.getUsers().subscribe(
      data => {
        this.userList = data;
      },
      error => {
        Swal.fire({
          title: 'Ooops!',
          text: 'Erro ao retornar lista',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
    );
  }

  deleteUser(id: number){
    this.userService.deleteUsers(id).subscribe(
      data => {
        Swal.fire({
          title: 'Eeeeba!',
          text: 'Sucesso ao remover usuario',
          icon: 'success',
          confirmButtonText: 'Okay'
        });
        this.router.navigate(['/user_list']);
      }
    );
  }

  goToCreate(){
    this.router.navigate(['/user']);
  }

  editUser(user: User){
    this.userService.getUserForList(user);
    this.router.navigate(['/user']);
  }

}
