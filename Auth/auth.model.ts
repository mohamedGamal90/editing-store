export class auth {
  public idToken: string = '';
  public email: string = '';
  public refreshToken: string = '';
  public expiresIn: string = '';
  public localId: string = '';
  public registered: boolean = false;

  constructor(
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered: boolean
  ) {}
}
