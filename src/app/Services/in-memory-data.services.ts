import {InMemoryDbService} from "angular-in-memory-web-api";
import {User} from "../Shared/models/user";


export class InMemoryDataService implements InMemoryDbService {

  createDb(): { items: User[] } {

    const items: User[] = [
      {id: 1, productName: "WaterBottle", quantity: 1, color: "cyan", giftWrap: false, price:12,image: "/assets/image1.jpeg"},
      {id: 2, productName: "Bag", quantity: 1, color: "black", giftWrap: false,price:12, image: "/assets/image2.jpeg"},
      {id: 3, productName: "LunchBox", quantity: 2, color: "beige", giftWrap: true,price:12, image: "/assets/image3.jpeg"},
      {id: 4, productName: "Box", quantity: 4, color: "purple", giftWrap: true,price:12, image: "/assets/image4.jpeg"},
    ];

    return {items};

  }
}
