import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SwapiService } from '../services/swapi.service';

@Component({
  selector: 'planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {
  @Output() sendCurrentPlanetUrl: EventEmitter<string> = new EventEmitter();

  constructor (private swapi: SwapiService) {  }

  planetList: Array<any> = [];
  planetTagList!: HTMLCollectionOf<Element>;
  isPlanetListComplete: boolean = false;

  currentIndex: number = 0;
  maxIndex: number = 0;

  ngOnInit () {
    this.addPlanetList(1);
  }

  addPlanetList (pageNumber: number) { // Nice Implementation
    this.swapi.getPlanetList(pageNumber).subscribe(
      (json: any) => {
        this.planetList.push(...json.results);

        if (json.next === null) {

          this.isPlanetListComplete = true;
          this.maxIndex = this.planetList.length - 1;

          this.planetTagList = document.getElementsByClassName('info');
          this.planetTagList[this.currentIndex].classList.toggle('info--show');
          this.swapi.setCurrentPlanetUrl(this.planetList[this.currentIndex].url);

          return null;
        }

        return this.addPlanetList(pageNumber + 1);
      }
    )
  }

  changeSlideShowIndex (change: number) {
    if (
      change > 0 &&
      this.currentIndex >= this.maxIndex
    ) { return; }
    else if (
      change < 0 &&
      this.currentIndex <= 0
    ) { return; }

    this.planetTagList[this.currentIndex].classList.toggle('info--show');

    this.currentIndex += change;

    this.planetTagList[this.currentIndex].classList.toggle('info--show');
    this.swapi.setCurrentPlanetUrl(this.planetList[this.currentIndex].url);
  }
}
