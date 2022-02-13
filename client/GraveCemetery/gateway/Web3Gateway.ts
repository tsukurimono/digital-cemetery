export class Grave {
    addrss: string
    name: string
    portraitURL: string
    birth: number
    death: number

    constructor(address:string, name:string, portraitURL:string, birth:number, death:number) {
        this.addrss = address;
        this.name = name;
        this.portraitURL = portraitURL;
        this.birth = birth;
        this.death = death;
    }
}

export interface Web3Gateway {
    getGraves(limit:number, offset:number): Promise<Grave[]>
    getGraveCount(): Promise<number>
    createGrave(name:string, birth:number, death:number, portraitURL:string): Promise<void>
}