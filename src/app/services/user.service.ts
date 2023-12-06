import { Injectable } from '@angular/core';
import { UUID, User } from '../model/user.model';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  user: User;
  users: Map<UUID, User>;

  constructor() {
    this.user = {
      id: UUID.randomUUID(),
      name: 'Jared Smith'
    }

    this.users = new Map();
    this.users.set(this.user.id, this.user);
  }

  currentUser(): User | undefined {
    return this.user;
  }

  getUser(id: UUID): User | undefined {
    return this.users.get(id);
  }
}