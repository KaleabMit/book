import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from '../../../../../tools/src/lib/api.service';
import { Personaldetail } from '../../../../../models/personaldetail.interface';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css']
})
export class TenantsComponent {

  
  personaldetails: Personaldetail[] = [];
  @ViewChild('dt1', { static: false }) dt1!: Table;
  @ViewChild('search') search!: HTMLInputElement;

  loading: boolean = true;

  constructor(private apiService: ApiService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.fetchPersonaldetails();
  }

  fetchPersonaldetails(): void {
    this.apiService.getAllPersonaldetails().toPromise().then(personaldetails => {
      this.personaldetails = personaldetails || [];
      this.loading = false;
    }).catch(error => {
      console.error('Error fetching personal details:', error);
      this.personaldetails = [];
      this.loading = false;
    });
  }

  clear(table: Table) {
    table.clear();
  }

  filterText(ev: any) {
    this.dt1.filterGlobal(ev.target.value, 'contains');
  }

  removeMessage(id: number) {
    this.apiService.removePersonaldetail(id).subscribe(res => {
      if (res.success) {
        this.personaldetails = this.personaldetails.filter(p => p.id !== id);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Personaldetail removed',
          life: 1500
        });
      }
    }, (error: HttpErrorResponse) => {
      console.error('Error removing personal detail:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to remove personal detail',
        life: 1500
      });
    });
  }
}
