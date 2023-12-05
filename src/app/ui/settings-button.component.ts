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
  @Input() menuItems: MenuItem[] = [
    { name: MenuItemNames.EDIT, icon: "edit" },
    { name: MenuItemNames.DELETE, icon: "delete", color: "warn" }
  ];
  @Output() itemSelected: EventEmitter<MenuItem> = new EventEmitter();


  selectItem(item: MenuItem) {
    this.itemSelected.emit(item);
  }
}

export enum MenuItemNames {
  EDIT = "Edit",
  DELETE = "Delete"
};

export interface MenuItem {
  name: string;
  icon?: string;
  color?: string;
}
