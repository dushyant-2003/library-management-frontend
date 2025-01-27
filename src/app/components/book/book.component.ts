import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  Book,
  BookResponse,
  IssuedBookDetail,
  IssuedBookDetailResponse,
} from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { User, UserResponse } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-book',
  imports: [
    NgFor,
    NgIf,
    HeaderComponent,
    CurrencyPipe,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    NgClass,
    DatePipe,
    RadioButtonModule,
    FormsModule,
    ConfirmDialog,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService],
  standalone: true,
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent {
  isBookLost: boolean = false;
  displayModal: boolean = false;
  displayReturnForm: boolean = false;
  displayIssueForm: boolean = false;
  isFormActive: boolean = false;
  isFormDisabled: boolean = true;
  addBookForm: FormGroup;
  books: Book[] = [];
  bookDetail: IssuedBookDetail | null = null;
  loggedInUserName = ''
  detailsVisible: boolean[] = [];
  issuedBooks: IssuedBookDetail[] = []
  role: string = ''
  constructor(
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private bookService: BookService,
    private fb: FormBuilder,
    private userService: UserService,private authService: AuthService
  ) {
    this.addBookForm = this.fb.group({
      name: ['', [Validators.required]],
      author: ['', [Validators.required]],
      publication: ['', [Validators.required]],
      edition: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
    this.isBookLost = false;
    this.role = this.authService.role$()
    console.log(this.role)
    this.loggedInUserName = this.authService.loggedInUserName$()
    console.log(this.loggedInUserName)
  }

  ngOnInit() {
   
  }
  users: User[] = [];

  filteredUsers = [...this.users];
  searchText: string = '';
  issueBookId: string = '';

  searchBookText: string = '';
  filteredBooks = [...this.books];

  showUserDetails(): void {
    // Simulate fetching multiple user data
    this.userService.getAllUsers().subscribe({
      next: (userData: UserResponse) => {
        this.users = userData.data;
        this.filteredUsers = [...this.users];
      },
      error: (error: HttpErrorResponse) => {
        // this.toastService.showError(error.error.message);
      },
    });
  }
  showBookDetails(): void {
    // Simulate fetching multiple user data
    this.bookService.getAllBooks().subscribe({
      next: (bookData: BookResponse) => {
        this.books = bookData.data;
        this.filteredBooks = [...this.books];
      },
      error: (error: HttpErrorResponse) => {
        // this.toastService.showError(error.error.message);
      },
    });
  }

  showBookDetail(bookId: string): void {
    this.bookService.getBookDetail(bookId).subscribe({
      next: (bookData: IssuedBookDetailResponse) => {
        this.bookDetail = bookData.data[0];

        console.log(this.bookDetail);
      },
      error: (error) => {},
    });
  }
  deleteBook(bookId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.bookService.deleteUser(bookId).subscribe({
        next: () => {
          alert('User deleted successfully');
          this.filteredBooks = this.filteredBooks.filter((book) => book.bookId !== bookId); // Remove user from the list
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete the user');
        },
      });
    }

  //   this.confirmationService.confirm({
  //     target: event.target as EventTarget,
  //     message: 'Do you want to delete this record?',
     
  //     header: 'Danger Zone',
  //     icon: 'pi pi-info-circle',
  //     rejectLabel: 'Cancel',
  //     rejectButtonProps: {
  //         label: 'Cancel',
  //         severity: 'secondary',
  //         outlined: true,
  //     },
  //     acceptButtonProps: {
  //         label: 'Delete',
  //         severity: 'danger',
  //     },

  //     accept: () => {
  //       this.bookService.deleteUser(bookId).subscribe({
  //         next: () => {
  //           alert('User deleted successfully');
  //           this.filteredBooks = this.filteredBooks.filter((book) => book.bookId !== bookId); // Remove user from the list
  //         },
  //         error: (error) => {
  //           console.error('Error deleting user:', error);
  //           alert('Failed to delete the user');
  //         },
  //       });
  //     },
  //     reject: () => {
          
  //     },
  // });

  }

  returnBook(): void {
    if (this.bookDetail) {
      let bookId: string = this.bookDetail.bookId;
      let userId: string = this.bookDetail.userId;
      let bookLostStatus = this.isBookLost;
      this.bookService
        .returnBook({ bookId, userId, bookLostStatus })
        .subscribe({
          next: () => {
            this.filteredBooks = this.filteredBooks.map((book) => {
              if (book.bookId === this.bookDetail?.bookId) {
                return { ...book, status: 'Available' }; // Create a new object with updated status
              }
              return book; // Return the original object if no match
            });
          },
          error: (error) => {},
        });
    }
    this.onCloseReturnDialog();
    return;
  }

  onSubmit() {
    if (this.addBookForm.valid) {
      let bookData = this.addBookForm.value;

      this.bookService.addBook(bookData).subscribe(
        (response) => {
         bookData.status = 'Available'
          this.filteredBooks = [...this.filteredBooks, bookData]
          alert('Book added successfully!');
          this.addBookForm.reset();
        },
        (error) => {
          console.error('Error adding user', error);
          alert('Error adding user. Please try again.');
        }
      );
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
  showAddUserModal() {
    this.displayModal = true;
    this.isFormActive = true;
    this.isFormDisabled = false;
  }
  onCloseDialog() {
    this.displayModal = false;
    this.isFormActive = false;
    this.isFormDisabled = true;
  }

  onCloseReturnDialog() {
    this.displayReturnForm = false;
    this.isFormActive = false;
    this.isFormDisabled = true;
  }
  showReturnFormModal() {
    this.displayReturnForm = true;
    this.isFormActive = true;
    this.isFormDisabled = false;
  }
  showIssueFormModal(bookId: string) {
    this.showUserDetails();
    console.log(this.filteredUsers);
    this.displayIssueForm = true;
    this.isFormActive = true;
    this.isFormDisabled = false;
    this.issueBookId = bookId;
  }
  onCloseIssueDialog() {
    this.displayIssueForm = false;
    this.isFormActive = false;
    this.isFormDisabled = true;
    this.issueBookId = '';
    this.searchText = '';
    this.filteredUsers = [...this.users];
  }

  filterUsers() {
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  filterBooks() {
    this.filteredBooks = this.books.filter((book) =>
      book.name.toLowerCase().includes(this.searchBookText.toLowerCase())
    );
  }

  issueBook(userId: string): void {
    let bookId = this.issueBookId;
    this.bookService.issueBook({ bookId, userId }).subscribe({
      next: () => {
        this.filteredBooks = this.filteredBooks.map((book) => {
          if (book.bookId === bookId) {
            return { ...book, status: 'Issued' };
          }
          return book;
        });
      },
      error: (error) => {},
    });
    this.onCloseIssueDialog();
  }
  toggleValueChange() {
    this.isBookLost = !this.isBookLost;
    console.log(this.isBookLost)
  }
  showIssuedBookDetails() {
    this.bookService.getIssuedBookDetails(this.loggedInUserName).subscribe({
      next: (response) => {
        this.issuedBooks = response.data
        this.books = []
      },
      error: () => {

      }
    })
  }
}
