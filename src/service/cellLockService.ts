
export class CellLockService {
    // Lock map
    // key: lockId (form: sheetId:cellLabel)
    // value: user
    private sheetMap = new Map<string, string>();

    public lockCell(sheetId: string, cellLabel: string, user: string): boolean {
        const lockId = this.getLockId(sheetId, cellLabel);
        if (this.sheetMap.has(lockId)) {
            return false;
        } else {
            this.sheetMap.set(lockId, user);
            return true;
        }
    }

    public unlockCell(sheetId: string, cellLabel: string, user: string): boolean {
        const lockId = this.getLockId(sheetId, cellLabel);
        if (this.sheetMap.has(lockId)) {
            if (this.sheetMap.get(lockId) === user) {
                this.sheetMap.delete(lockId);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public getLockId(sheetId: string, cellLabel: string): string {
        return `${sheetId}:${cellLabel}`;
    }

    public getAllLockedCells(sheetId: string): Map<string, string> {
        const lockedCells = new Map<string, string>();
        this.sheetMap.forEach((user, lockId) => {
            if (lockId.startsWith(sheetId)) {
                lockedCells.set(lockId.split(':')[1], user);
            }
        });
        return lockedCells;
    }

}

export default CellLockService;