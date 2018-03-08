import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {Session} from "../../model/session";

/**
 * Generated class for the SessionOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-session-overview',
  templateUrl: 'session-overview.html',
})
export class SessionOverviewPage {
  activeSessions: Session[] = [];
  plannedSessions: Session[] = [];
  stoppedSessions: Session[] = [];


  constructor(private restService: RestProvider) {
  }

  ionViewDidLoad() {

    this.restService.get('sessions/getAllSessionsByUser').subscribe(ses => {
      console.log(ses);
      for (const obj of ses) {
        console.log(obj);
        if (obj.startTime > new Date()) {
          this.plannedSessions.push(obj);
        } else if (obj.startTime < new Date()) {
          this.activeSessions.push(obj);
        }
      }
    },error2 => console.log(error2));
  }
}
