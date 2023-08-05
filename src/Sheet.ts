import * as path from 'path';
import * as fs from 'fs';

/**
 *  The Sheet DAO
 * 
 * functions exported are:
 * 
 * getCells(): Map<string, string[]>
 * setCells(sheetMemory: SheetMemory): void
 * reset()
 * addToken(cellLabel: string, token: string): void
 * removeToken(cellLabel: string): void
 * clearFormula(cellLabel: string): void
 * getFormula(cellLabel: string): string[]
 * getOwner(): string
 * setOwner(): string
 * 
 */

export class Sheet {
  /** The owner, memory, cell map, name, and path to access the sheet */
  private _owner: string;
  private _cells: Map<string, string[]>;
  private _filename: string;
  private _sheetDirectory: string = path.join(__dirname, "Data");

  /**
   * constructor
   * 
   * default sheetName is spreadsheet
   * default owner is Anonymous
   * */
  constructor(sheetName: string = "spreadsheet", owner: string = "Anonymous") {
    this._owner = owner;
    this._cells = new Map<string, string[]>();
    // remove any / or \ from the sheet name
    sheetName = sheetName.replace(/[\/\\]/g, "");
    // configure the persistent memory
    this._filename = path.join(this._sheetDirectory, sheetName + ".json");
    this._load();
    this._initializeDirectory();
  }


  // create the directory if it does not exist
  private _initializeDirectory() {
    if (!fs.existsSync(this._sheetDirectory)) {
        fs.mkdirSync(this._sheetDirectory, { recursive: true });
    }
  }

  // load the data from the file
  private _load() {
      try {
          let data = fs.readFileSync(this._filename, 'utf8');
          let cells = JSON.parse(data);
          for (let cell of cells) {
              this._cells.set(cell._label, cell._formula);
          }
      } catch (err) {
          // create the empty file
          this._save();
      }
  }

  // save the data to the file
  private _save() {
      let cells = [];
      for (let [label, formula] of this._cells) {
          cells.push({
              _label: label,
              _formula: formula,
          });
      }
      let data = JSON.stringify(cells);
      fs.writeFileSync(this._filename, data);
  }

  public getCells(): Map<string, string[]> {
      return this._cells;
  }

  public reset() {
      this._cells.clear();
      this._save();
  }

  /**  
   *  add token to a given cell's formula
   *  this is not a cell and thus no dependency updating is needed
   *  this is not the SpreadSheetController and thus no evaluaton is needed
   * 
   * @param token:string
   */
  addToken(cellLabel: string, token: string): void {
    // get the current formula
    let holder = this._cells.get(cellLabel);
    // handle the case where the cell is undefined
    if (holder === undefined) {
      this._cells.set(cellLabel, []);
    }
    // get the current formula
    let formula = this._cells.get(cellLabel);
    // add the token to the formula
    formula?.push(token);
    // update the cell map with the new formula
    this._cells.set(cellLabel, formula ? formula : []);
  }

  /**
   * remove the last token from the given cell's formula
   */
  removeToken(cellLabel: string): void {
    this._cells.get(cellLabel)?.pop();
  }

  /**
   * clear the given cell's formula
   */
  clearFormula(cellLabel: string): void {
    this._cells.set(cellLabel, []);
  }

  /**
   * get the formula for the given cell
   */
  getFormula(cellLabel: string): string[] {
    return this._cells.get(cellLabel) as string[];
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