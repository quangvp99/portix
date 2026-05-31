import { Routes } from '@angular/router';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';

export const TRANSACTION_ROUTES: Routes = [
  { path: '', component: TransactionsListComponent }
];
