/**
 *  The Sheet DAO
 * 
 * functions exported are:
 * 
 * getId(): string
 * getName(): string
 * setName(): string
 * getOwner(): string
 * setOwner(): string
 * 
 */

export class Sheet {
  /** The owner, memory, cell map, name, and path to access the sheet */
  private _id: string;
  private _owner: string;
  private _name: string;

  /**
   * constructor
   * 
   * default sheetName is spreadsheet
   * default owner is Anonymous
   * */
  constructor(sheetName: string = "spreadsheet", owner: string = "Anonymous", id: string) {
    this._id = id;
    this._owner = owner;
    // remove any / or \ from the sheet name
    sheetName = sheetName.replace(/[\/\\]/g, "");
    // configure the persistent memory
    this._name = sheetName;
  }


  getId(): string {
    return this._id;
  }

  getName(): string {
    return this._name;
  }

  setName(sheetName: string): void {
    this._name = sheetName;
  }

  /**
   * get the sheet owner
   */
  getOwner(): string {
    return this._owner;
  }

  /**
   * set the sheet owner
   */
  setOwner(owner: string): void {
    this._owner = owner;
  }
}

export default Sheet;