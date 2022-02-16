export class Grave {
    addrss: string
    name: string
    portraitURL: string
    birth: number
    death: number

    constructor(address:string, name:string, birth:number, death:number, portraitURL:string) {
        this.addrss = address;
        this.name = name;
        this.birth = birth;
        this.death = death;
        this.portraitURL = portraitURL;
    }
}

export interface Web3Gateway {
    getGraves(limit:number, offset:number): Promise<Grave[]>
    getGraveCount(): Promise<number>
    createGrave(name:string, birth:number, death:number, portraitURL:string): Promise<void>
}