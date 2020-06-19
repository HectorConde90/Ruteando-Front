import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favorite-routes',
  templateUrl: './favorite-routes.component.html',
  styleUrls: ['./favorite-routes.component.css']
})
export class FavoriteRoutesComponent implements OnInit {
  favoriteRoutes: any;
  constructor(private userService: UserService) { 

  }

  ngOnInit(): void {
    this.getFavoriteRoutes();
  }

  async getFavoriteRoutes() {
    this.favoriteRoutes = await this.userService.getFavoriteRoutes().toPromise();

  }

  async removeFavoriteRoute(event) {
    const id = event.target.dataset.id;
    await this.userService.removeFavoriteRoutes(id).toPromise();
    const index = this.favoriteRoutes.map(route => route._id).indexOf(id);
    this.favoriteRoutes.splice(index, 1);
  }
}
