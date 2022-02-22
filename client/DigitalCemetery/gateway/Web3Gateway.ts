export class Grave {
    address: string
    name: string
    birth: number
    death: number
    epigraph: string
    prayed: number
    portraitURL: string
    inheritor: string
    successor: string
    isFinalized: boolean

    constructor(
        address:string,
        name:string, 
        birth:number, 
        death:number, 
        portraitURL:string, 
        epigraph:string, 
        prayed:number, 
        inheritor:string, 
        successor:string,
        isFinalized:boolean
        ) {
        this.address = address;
        this.name = name;
        this.birth = birth;
        this.death = death;
        this.portraitURL = portraitURL;
        this.epigraph = epigraph;
        this.prayed = prayed;
        this.inheritor = inheritor;
        this.successor = successor;
        this.isFinalized = isFinalized;
    }
}

export interface Web3Gateway {
    getGrave(address:string): Promise<Grave>
    getGraves(limit:number, offset:number): Promise<Grave[]>
    getGraveCount(): Promise<number>
    createGrave(name:string, birth:number, death:number, portraitURL:string, epigraph:string): Promise<void>
    updateGrave(address:string, name:string, birth:number, death:number, portraitURL:string, epigraph:string): Promise<void>
    pray(address:string): Promise<number>
    finalize(address:string): Promise<void>
    nominate(address:string, successor:string): Promise<void>
    setPortraitURL(address:string, portraitURL:string): Promise<void>
    myAddress(): string
}