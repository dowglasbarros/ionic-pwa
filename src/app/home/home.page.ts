import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  fullTime: any = '00:01:00';
  percent = 0;
  radius = 100;

  minutes: number;
  overallTimer: any;
  progress: number;
  seconds: number;
  timer: any;

  elapsed: any = {
    h: '00',
    m: '00',
    s: '00',
  };


  constructor() { }

  setTimes() {
    const timeSplit = this.fullTime.split(':');
    let totalSeconds = 0;

    this.minutes = timeSplit[1];
    this.seconds = timeSplit[2];

    totalSeconds = Math.floor(this.minutes * 60) + parseInt(this.seconds.toString(), 10);

    this.timer = setInterval(() => {
      if (this.percent === this.radius) {
        clearInterval(this.timer);
      }

      this.percent = Math.floor((this.progress / totalSeconds) * 100);
      this.progress++;
    }, 1000);
  }

  progressTimer() {
    const countDownDate = new Date();

    this.overallTimer = setInterval(() => {
      const now = new Date().getTime();
      const distance = now - countDownDate.getTime();

      this.elapsed.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.elapsed.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.elapsed.s = Math.floor((distance % (1000 * 60)) / 1000);

      this.elapsed.h = this.pad(this.elapsed.h, 2);
      this.elapsed.m = this.pad(this.elapsed.m, 2);
      this.elapsed.s = this.pad(this.elapsed.s, 2);
    }, 1000);
  }

  pad(num, size) {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }

  startTime() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (!this.overallTimer) {
      this.progressTimer();
    }

    this.setTimes();
    this.percent = 0;
    this.progress = 0;
  }

  stopTime() {
    clearInterval(this.timer);
    clearInterval(this.overallTimer);
    this.overallTimer = false;
    this.timer = false;
    this.percent = 0;
    this.progress = 0;
    this.elapsed = {
      h: '00',
      m: '00',
      s: '00'
    };
  }
}
