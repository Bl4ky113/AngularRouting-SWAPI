import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SwapiService } from '../services/swapi.service';

@Component({
  selector: 'residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss']
})
export class ResidentsComponent implements OnInit {
  constructor (private swapi: SwapiService, private router: Router) {  }

  planetUrl: string = "";

  personUrlList: Array<string> = [];
  personList: Array<any> = [];
  personTagList!: HTMLCollectionOf<Element>;
  isPersonListComplete: boolean = true;

  currentIndex: number = 0;
  maxIndex: number = 0;

  ngOnInit () {
    this.planetUrl = this.swapi.getCurrentPlanetUrl();
    console.log(this.planetUrl);

    if (this.planetUrl === "") {
      alert("You Should First Set the Planet to Search Residents");
      this.router.navigate(['/planets']);
      return;
    }

    this.swapi.getResidentsUrls(this.planetUrl).subscribe(
      (json: any) => {
        this.personUrlList = json.residents;

        if (this.personUrlList.length === 0) {
          alert(" You Should Pick a Planet That Has Residents Available");
          this.router.navigate(['/planets']);
          return;
        }

        this.maxIndex = this.personUrlList.length - 1;
        console.log(this.maxIndex);
        this.getPersonList();
      })
  }

  getPersonList () {
    this.personList = [];
    for (let url of this.personUrlList) {
      this.swapi.getResident(url).subscribe(
        (json: any) => {
          this.personList.push(json);
          console.log(this.personList, this.personList.length)

          if (this.personList.length - 1 === this.maxIndex) {
            this.personTagList = document.getElementsByClassName('info');
            this.personTagList[this.currentIndex].classList.toggle('info--show');
            this.swapi.setCurrentPersonUrl(this.personList[this.currentIndex].url);
          }
      })
    }

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

    this.personTagList[this.currentIndex].classList.toggle('info--show');

    this.currentIndex += change;

    this.personTagList[this.currentIndex].classList.toggle('info--show');
    this.swapi.setCurrentPersonUrl(this.personList[this.currentIndex].url);
  }
}
