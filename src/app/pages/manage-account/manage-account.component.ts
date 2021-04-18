import { AfterViewInit, Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { SearchUserBy, SupportedLocales, UserManager } from '@almond-platform/api-kit';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent implements OnInit {
  id: number;
  el = 0;
  term;
  users: any;
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['id', 'userName', 'firstName', 'lastName', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userManager: UserManager,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
    ) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }


  public getAllUsers(): void {
    this.userManager.profile.getAllUserProfiles().subscribe((users) => {
      console.log(users);
      this.users = users;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
    }, err => {
      console.error(err);
      alert('User List Retrieve failed, got this error: ' + err?.error?.message);
    });
  }

  elem(id) {
    let index = this.users.findIndex(user => user.id === id);
    console.log(index);
    this.el = index;
  }

  setupFilter(column: string) {
    this.dataSource.filterPredicate = (d: User, filter: string) => {
      const textToSearch = d[column] && d[column].toLowerCase() || '';
      return textToSearch.indexOf(filter) !== -1;
    };
  }

  filterTable(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(id) {
    this.router.navigate(['/user-detail/', id], { relativeTo: this.route });
  }
}

export class User {
  public readonly userName: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly password: string;
  public readonly status: string;
}
