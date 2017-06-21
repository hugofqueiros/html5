import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer = false;
  serverCreactionStatus = 'No server was created';
  serverName = 'TestServer';
  serverCreated = false;
  servers = ['Testserver', 'Testserver 2'];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreactionStatus = 'Server was created! Name is: ' + this.serverName;
  }

  onUpdateServerName2(event: Event) {
    console.log(event);
    this.serverName =  (<HTMLInputElement>event.target).value;
  }

  onUpdateServerName(event: any) {
    console.log(event);
    this.serverName =  event.target.value;
  }
}
