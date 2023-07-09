import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor() {}
}

export const main_aboutUsContent = {
  title: 'About Us',
  body: `Hello friends, ^500 
  our new project serves to convey the beauty of the earth,^100
   you will find content about various attractions, ^100
   will be able to write posts and share your thoughts with other visitors.^300
    Places that you particularly like can be saved on your profile and visited later. ^300
    The site will give you other opportunities, for which you need to pass authorization first.^300
   Your feedback is important, please contact us in case of any problems.^300 good luck!`,
  author: 'Team X Developers',
};
