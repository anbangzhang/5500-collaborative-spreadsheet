export class ReferenceCheckResponse {
    private allow: boolean;

    constructor(allow: boolean) {
        this.allow = allow;
    }

    public getAllow(): boolean {
        return this.allow;
    }

}

export default ReferenceCheckResponse;