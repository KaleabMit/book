import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  contactUs() {
    //  contact logic here
    console.log('Contact Us button clicked!');
    
  }
  steps = [
    {
      icon: 'assets/searchhome.jpg', // Replace with the actual path to your icon
      iconStyle: 'height: 160px; width: 180px;',
      title: 'Search Property',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, placeat.'
    },
    {
      icon: 'assets/contactagent.jpg', // Replace with the actual path to your icon
      title: 'Contact Agents',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, placeat.'
    },
    {
      icon: 'assets/enjoyproperty.jpg', // Replace with the actual path to your icon
      title: 'Enjoy Property',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, placeat.'
    }
  ];
  reviews = [
    { clientImage: 'assets/image1.jpg', clientName: 'Teddy Afro', rating: 5, reviewText: 'wooow, how cool is it,Thank you Teleport...' },
    { clientImage: 'assets/image2.jpg', clientName: 'Merid', rating: 5, reviewText: 'wooow, how cool is it,Thank you Teleport...' },
    { clientImage: 'assets/image3.jpg', clientName: 'Aster Awoke', rating: 5, reviewText: 'wooow, how cool is it,Thank you Teleport...' },
    
  ];
  reviews2 = [
  { clientImage: 'assets/image4.jpg', clientName: 'Girum Ermias', rating: 1, reviewText: 'hooo, I cant afford the payment,so costy ...' },
    { clientImage: 'assets/image5.jpg', clientName: 'Adane Girma', rating: 4, reviewText: 'wooow, how cool is it,Thank you Teleport...' },
    { clientImage: 'assets/image6.jpg', clientName: 'Mohammed Hussein Ali Al Amoudi', rating: 5, reviewText: 'wooow, how cool is it,Thank you Teleport...' }
  ];
  }
