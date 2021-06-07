import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../model';
import { ContactService } from '../service/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {

  contactList: Contact[] = [];
  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    document.querySelector('html').style.background = 'linear-gradient(to right, #4F4F4F, #FF69B4, #BDB76B)';
    this.getContacts();
  }

  ngOnDestroy(): void {
    document.querySelector('html').style.background = 'none';
  }

  getContacts(){
    this.contactService.getContacts().subscribe (
      data => {
        this.contactList = data;
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

  deleteContact(id:number){
    this.contactService.deleteContacts(id).subscribe(
      data => {
        Swal.fire({
          title: 'Eeeeba!',
          text: 'Sucesso ao remover contato',
          icon: 'success',
          confirmButtonText: 'Okay'
        });
        this.router.navigate(['/contact_list']);
      }
    );
  }

  goToCreate(){
    this.router.navigate(['/contact']);
  }

  editContact(contact: Contact){
    this.contactService.getContactForList(contact);
    this.router.navigate(['/contact']);
  }

}
