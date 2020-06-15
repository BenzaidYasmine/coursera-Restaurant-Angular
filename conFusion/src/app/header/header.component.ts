import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
//import {MatDialog, MatDialogRef} from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog ) { }

  ngOnInit() {
  }

  openLoginForm() {
    this.dialog.open(LoginComponent, {width: '500px', height: '450px'});
  }

}
