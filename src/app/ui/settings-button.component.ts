import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from '@angular/material/menu';

@Component({
  standalone: true,
  selector: 'app-settings-button',
  template: `
    <mat-icon class="settings-button" [matMenuTriggerFor]="menu">settings</mat-icon>
    <mat-menu #menu="matMenu">
      <button *ngFor="let item of menuItems"
        mat-menu-item
        (click)="selectItem(item)" class="menu-button" attr.color="{{item.color}}">
        <mat-icon *ngIf="item.icon">{{item.icon}}</mat-icon>
        <span>{{item.name}}</span>
      </button>
    </mat-menu>
  `,
  styles: [`
    @use '../../theme.scss';

    .settings-button {
      cursor: pointer;
    }

    .menu-button[color=primary] {
      color: theme.get-color(primary);
      * {
        color: theme.get-color(primary);
      }
    }

    .menu-button[color=accent] {
      color: theme.get-color(accent);
      * {
        color: theme.get-color(accent);
      }
    }

    .menu-button[color=warn] {
      color: theme.get-color(warn);
      * {
        color: theme.get-color(warn);
      }
    }
  `],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule]
})
export class SettingsButtonComponent {
  @Input() menuItems: MenuItem[] = [EDIT_MENU_ITEM, DELETE_MENU_ITEM];
  @Output() itemSelected: EventEmitter<MenuItem> = new EventEmitter();

  selectItem(item: MenuItem) {
    this.itemSelected.emit(item);
  }
}

export enum MenuItemName {
  EDIT = "Edit",
  DELETE = "Delete",
  CLEAR = "CLEAR"
};

export interface MenuItem {
  name: MenuItemName;
  icon?: string;
  color?: string;
}

export const DELETE_MENU_ITEM: MenuItem = { name: MenuItemName.DELETE, icon: "delete", color: "warn" }
export const EDIT_MENU_ITEM: MenuItem = { name: MenuItemName.EDIT, icon: "edit" }

