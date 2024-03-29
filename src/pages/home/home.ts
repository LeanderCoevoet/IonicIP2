import {Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthProvider} from "../../providers/auth/auth";
import {HttpClient} from "@angular/common/http";
import {ProfilePage} from "../profile/profile";
import {SessionOverviewPage} from "../session-overview/session-overview";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: string;
  message: string;


  constructor(private readonly authProvider: AuthProvider,
              jwtHelper: JwtHelperService,
              private readonly httpClient: HttpClient,
              public navCtrl: NavController) {
    this.authProvider.authUser.subscribe(jwt => {
      if (jwt) {
        const decoded = jwtHelper.decodeToken(jwt);
        this.user = decoded.sub
      }
      else {
        this.user = null;
      }
    });
  }

  profilePage() {
    this.navCtrl.setRoot(ProfilePage)
  }

  overviewPage() {
    this.navCtrl.setRoot(SessionOverviewPage)
  }

  logout() {
    this.authProvider.logout();
  }
}
