export class Grave {
    addrss: string
    name: string
    birth: number
    death: number
    epigraph: string
    prayed: number
    portraitURL: string

    constructor(address:string, name:string, birth:number, death:number, portraitURL:string, epigraph:string, prayed:number) {
        this.addrss = address;
        this.name = name;
        this.birth = birth;
        this.death = death;
        this.portraitURL = portraitURL;
        this.epigraph = epigraph;
        this.prayed = prayed;
    }
}

export interface Web3Gateway {
    getGraves(limit:number, offset:number): Promise<Grave[]>
    getGraveCount(): Promise<number>
    createGrave(name:string, birth:number, death:number, portraitURL:string, epigraph:string): Promise<void>
}