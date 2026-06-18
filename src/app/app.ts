import { Component, OnInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  name = signal('');
  tagline = signal('');
  isGlitching = signal(false);

  private cancelled = false;
  private readonly TARGET = 'JOSHUA ADELOYE';
  private readonly CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$@&<>/\\';
  private readonly LINES = [
    'Senior Full Stack .NET Developer',
    'AI-Powered Engineer',
    'Cloud Architect · Azure · .NET',
    'Building the future, one commit at a time.',
  ];

  ngOnInit() {
    setTimeout(() => this.runScramble(), 200);
  }

  ngOnDestroy() {
    this.cancelled = true;
  }

  private runScramble() {
    let progress = 0;

    const tick = () => {
      if (this.cancelled) return;

      this.name.set(
        this.TARGET.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (i < Math.floor(progress)) return char;
          return this.CHARS[Math.floor(Math.random() * this.CHARS.length)];
        }).join('')
      );

      progress += 0.35;

      if (progress < this.TARGET.length) {
        setTimeout(tick, 35);
      } else {
        this.name.set(this.TARGET);
        setTimeout(() => {
          this.isGlitching.set(true);
          setTimeout(() => {
            this.isGlitching.set(false);
            this.runTypewriter();
          }, 320);
        }, 200);
      }
    };

    tick();
  }

  private async runTypewriter() {
    for (let li = 0; li < this.LINES.length; li++) {
      const line = this.LINES[li];

      for (let i = 0; i <= line.length; i++) {
        if (this.cancelled) return;
        this.tagline.set(line.slice(0, i));
        await this.sleep(48);
      }

      if (li < this.LINES.length - 1) {
        await this.sleep(1600);
        for (let i = line.length; i >= 0; i--) {
          if (this.cancelled) return;
          this.tagline.set(line.slice(0, i));
          await this.sleep(22);
        }
        await this.sleep(250);
      }
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(r => setTimeout(r, ms));
  }
}
