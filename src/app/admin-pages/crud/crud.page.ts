import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CRUDPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
}
