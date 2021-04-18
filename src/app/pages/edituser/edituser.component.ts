import { UserManager } from '@almond-platform/api-kit';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
  form: FormGroup;
  users: any;

  constructor(
    private userManager: UserManager,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.validators();
  }

  public getAllUsers(): void {
    const index = this.route.snapshot.paramMap.get('id');
    let id = Number(index);
    this.userManager.profile.getUserProfile(id).subscribe(users => {
      this.users = users;
    });
  }

  validators() {
    this.form = this.fb.group({
      userName: '',
      firstName: '',
      lastName: '',
      status: ''
    });
  }

  updateForm(){
    this.onChanel();
  }

  onChanel() {
    this.router.navigate(['../../todos'], { relativeTo: this.route })
  }
}
