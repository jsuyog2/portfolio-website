import data from './../../public/data.json'
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { NgxTypedWriterModule } from 'ngx-typed-writer';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TimelineModule } from 'primeng/timeline';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AvatarModule, AvatarGroupModule, ButtonModule, NgxTypedWriterModule, CardModule, CarouselModule, DialogModule, ScrollPanelModule, TimelineModule, DividerModule, FloatLabelModule, InputTextModule, InputTextareaModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('subHeader') typewriterElement: any;
  subHeaderArray: any = [
    `Full Stack Developer`,
    `Front-End Developer`,
    `Back-End Developer`,
  ];
  title = 'Suyog Jadhav';
  data: any = data
  services: any;
  latestProjects: any;
  oldProjects: any;
  collageProjects: any;
  openProjects: any;
  projectDialogVisible: boolean = false;
  selectedProject: any;
  experience: any;
  education: any;
  responsiveOptions: any[] | undefined;
  responsiveCollageOptions: any[] | undefined;
  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.title = data.name;
    this.primengConfig.ripple = true;

    this.responsiveOptions = [
      {
        breakpoint: '1200px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];

    this.responsiveCollageOptions = [
      {
        breakpoint: '1200px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '1024px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];

    this.addService();
    this.addProjects();
    this.addExperienceANDEducation();
  }

  socialOpen(value: string) {
    switch (value) {
      case 'github':
        window.open(data.social.github, "_blank");
        break;
      case 'linkedin':
        window.open(data.social.linkedin, "_blank");
        break;
      case 'twitter':
        window.open(data.social.twitter, "_blank");
        break;
      case 'cv':
        window.open(data.cv_link, "_blank");
        break;
      case 'email':
        window.open(data.contact[1]?.href, "_blank");
        break;
      case 'icons8':
        window.open("https://icons8.com/icons", "_blank");
        break;
      default:
        window.open(data.social.github, "_blank");
        break;
    }
  }

  addService() {
    const totalProjects = data.projects.length;
    const startExperienceDate = data.experience[data.experience.length - 1].start_date
    const currentDate: number = new Date().getFullYear();
    const startDate: number = new Date(startExperienceDate).getFullYear();
    const totalExperience = currentDate - startDate;
    this.services = [{
      label: totalProjects,
      text: 'Projects Complete'
    },
    {
      label: (((totalExperience * 365) + totalProjects)) * 3,
      text: 'Cup of Coffee'
    },
    {
      label: totalExperience,
      text: 'Years Experience'
    }];
  }

  addProjects() {
    data.projects.map((val: any, index: any) => {
      val.id = index
      if (val.start_date) {
        const duration = this.returnDuration(val.start_date, val.end_date);
        val.duration = duration
      }
      return val
    })
    const projects = data.projects;
    this.latestProjects = projects.filter((e) => e.tag === 'latest');
    this.oldProjects = projects.filter((e) => e.tag === 'old');
    this.openProjects = projects.filter((e) => e.tag === 'open');
    this.collageProjects = projects.filter((e) => e.tag === 'collage');
  }

  addExperienceANDEducation() {
    data.experience.map((val: any) => {
      const duration = this.returnDuration(val.start_date, val.end_date);
      val.duration = duration
      return val
    })
    this.experience = data.experience;

    data.education.map((val: any) => {
      val.year = this.returnDateFormat(val.year);
      return val
    })
    this.education = data.education;
  }

  openProject(id: any) {
    this.projectDialogVisible = true
    this.selectedProject = data.projects[id];
  }

  openLink(link: any) {
    window.open(link, "_blank");
  }

  returnDuration(start_date: any, end_date: any) {
    let start = this.returnDateFormat(start_date);
    let end = end_date ? this.returnDateFormat(end_date) : 'Present';
    return `${start} - ${end}`;
  }

  returnDateFormat(date: any) {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date_month = month[new Date(date).getMonth()];
    let date_year = new Date(date).getFullYear();
    return `${date_month} ${date_year}`
  }
  validURL(str: any) {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+@]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]@*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(str);
  }
}
