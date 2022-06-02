export class Item {
  public header: string = '';
  public imageUrl: string = '';
  public brand: string = '';
  public price: number = 0;
  public description: string = '';
  public category: string = '';
  public itemID: number = 0;
  public size: string[] = [];

  constructor(
    header: string,
    imageUrl: string,
    brand: string,
    price: number,
    description: string,
    category: string,
    itemID: number,
    size: string[]
  ) {}
}
