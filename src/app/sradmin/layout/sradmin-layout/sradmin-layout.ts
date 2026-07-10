import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-sradmin-layout',
  standalone: true,
  imports: [
    Sidebar,
    RouterOutlet
  ],
  templateUrl: './sradmin-layout.html',
  styleUrl: './sradmin-layout.css'
})
export class SrAdminLayout {

}