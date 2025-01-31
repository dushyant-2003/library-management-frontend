import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { BookService } from '../../services/book.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { IssuedBookDetail } from '../../models/book.model';
import { HeaderComponent } from '../header/header.component';
import { CurrencyPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, NgFor, NgIf, CurrencyPipe, DatePipe, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  loggedInUserName: string = ''
  user: User| null = null
  issuedBook : IssuedBookDetail[] = []
  greetingMessage : string = ''
  constructor(private authService: AuthService, private bookService: BookService, private userService: UserService) {
  }
  ngOnInit() {
    this.loggedInUserName = this.authService.loggedInUserName$()
    this.setGreetingMessage()

    this.userService.getUser(this.loggedInUserName).subscribe({
      next : (response) => {
        this.user = response.data
      },
      error: (error) => {

      }
    })

    this.bookService.getIssuedBookDetails(this.loggedInUserName).subscribe({
      next: (response) => {
       this.issuedBook = response.data;
       this.issuedBook = this.issuedBook.filter(book => book.status === 'Issued').map(book => {
        if (book.status === 'Issued') {
          return {
            ...book,
            status: book.fine > 0 ? 'Overdue' : 'On-time'
          };
        }
        return book; // Return book unchanged if status is not 'issued'
      });
      
       console.log(this.issuedBook)
      }
    }
  )
    
    
  }
  setGreetingMessage() {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greetingMessage = 'Good Morning';
    } else if (hour < 18) {
      this.greetingMessage = 'Good Afternoon';
    } else {
      this.greetingMessage = 'Good Evening';
    }
  }
}
