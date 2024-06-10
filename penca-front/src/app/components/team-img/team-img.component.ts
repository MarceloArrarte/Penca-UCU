import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-img',
  templateUrl: './team-img.component.html',
  styleUrls: ['./team-img.component.scss']
})
export class TeamImgComponent implements OnInit {
  @Input()
  equipo!: string;

  @HostBinding('style.width')
  @Input()
  width?: string;
  
  ngOnInit(): void {
    if (this.equipo == undefined) {
      console.warn(`El input "equipo" tiene el valor ${this.equipo}`);
    }
  }
}
