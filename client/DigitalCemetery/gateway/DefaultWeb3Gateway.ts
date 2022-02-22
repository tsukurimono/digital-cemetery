import { Web3Gateway, Grave } from '@/gateway/Web3Gateway'
import Web3 from "web3";
import GraveFactoryContract from "../contracts/GraveFactory.json";
import GraveContract from "../contracts/Grave.json";

declare global {
    interface Window {
        ethereum:any;
    }

    interface ContractObject { 
        networks:{[key:number]:any}; 
        abi:any[];
    }
    interface GraveFactoryContract {
        methods: {
            associatedGravesCount(): {call():Promise<number>}
            createGrave(name:string, birth:number, death:number, portraitURL:string, epigraph:string): {send(param:any):Promise<void>}
            associatedGraves(limit:number, offset:number): {call(param:any):Promise<string[]>}
            associateGrave(address:string): void
        }
    }

    interface GraveContract {
        methods:{
            name(): {call():Promise<string>}
            birth(): {call():Promise<number>}
            death(): {call():Promise<number>}
            portraitURL(): {call():Promise<string>}
            epigraph(): {call():Promise<string>}
            prayed(): {call():Promise<number>}
            pray(): {send(param:any):Promise<void>}
            finalize(): {send(param:any):Promise<void>}
            nominate(successor:string): {send(param:any):Promise<void>}
            update(name:string, birth:number, death:number, portraitURL:string, epigraph:string): {send(param:any):Promise<void>}
            inheritor(): {call():Promise<string>}
            successor(): {call():Promise<string>}
            isFinalized(): {call():Promise<boolean>}
        }
    }
}

export class DefaultWeb3Gateway implements Web3Gateway {
    private accounts: string[] = []
    private web3!:Web3  // TODO: Exception handle in build and set in constructor.
    private graveFactoryContract!:GraveFactoryContract  // TODO: Exception handle in build and set in constructor.

    public constructor () {
    }

    public static async build(): Promise<DefaultWeb3Gateway> {
       const gateway = new DefaultWeb3Gateway();
       gateway.web3 = new Web3(window.ethereum);
       await window.ethereum.enable();
       gateway.accounts = await gateway.web3.eth.getAccounts();
       const networkID = await gateway.web3.eth.net.getId();
       const contractObject:ContractObject = GraveFactoryContract;
       gateway.graveFactoryContract = new gateway.web3.eth.Contract(contractObject.abi, contractObject.networks[networkID].address);

       return gateway;
    }

    public async getGrave(address:string): Promise<Grave> {
        const contractObject:ContractObject = GraveContract;
        const graveContract = new this.web3.eth.Contract(contractObject.abi, address);

        return new Grave(
            address,
            await graveContract.methods.name().call(),
            Number(await graveContract.methods.birth().call()),
            Number(await graveContract.methods.death().call()),
            await graveContract.methods.portraitURL().call(),
            await graveContract.methods.epigraph().call(),
            Number(await graveContract.methods.prayed().call()),
            await graveContract.methods.inheritor().call(),
            await graveContract.methods.successor().call(),
            await graveContract.methods.isFinalized().call()
        );
    }

    public async getGraves(limit:number, offset:number): Promise<Grave[]> {
        const graveContracts = await this.graveFactoryContract.methods.associatedGraves(limit, offset).call({from: this.accounts[0]});
        const graves:Grave[] = []

        graveContracts.forEach(async(element) => {
            const contractObject:ContractObject = GraveContract;
            const grave = new this.web3.eth.Contract(contractObject.abi, element);
            graves.push(new Grave(
                grave.options.address,
                await grave.methods.name().call(), 
                Number(await grave.methods.birth().call()),
                Number(await grave.methods.death().call()),
                await grave.methods.portraitURL().call(),
                await grave.methods.epigraph().call(),
                Number(await grave.methods.prayed().call()),
                await grave.methods.inheritor().call(),
                await grave.methods.successor().call(), 
                await grave.methods.isFinalized().call()
                ));
        });
        return graves;
    }

    public async getGraveCount(): Promise<number> {
        return await this.graveFactoryContract.methods.associatedGravesCount().call();
    }

    public async createGrave(name:string, birth:number, death:number, portraitURL:string, epigraph:string): Promise<void> {
        await this.graveFactoryContract.methods.createGrave(
            name, 
            birth, 
            death, 
            portraitURL,
            epigraph
            ).send({from: this.accounts[0]});
    }

    public async updateGrave(address:string, name:string, birth:number, death:number, portraitURL:string, epigraph:string): Promise<void> {
        const contractObject:ContractObject = GraveContract;
        const graveContract = new this.web3.eth.Contract(contractObject.abi, address);

        await graveContract.methods.update( 
            name, 
            birth, 
            death, 
            portraitURL,
            epigraph
            ).send({from: this.accounts[0]});
    }

    public async pray(address:string): Promise<number> {
        const contractObject:ContractObject = GraveContract;
        const graveContract = new this.web3.eth.Contract(contractObject.abi, address);
        await graveContract.methods.pray().send({from: this.accounts[0]});

        return await graveContract.methods.prayed().call();
    }

    public async finalize(address:string): Promise<void> {
        const contractObject:ContractObject = GraveContract;
        const graveContract = new this.web3.eth.Contract(contractObject.abi, address);
        await graveContract.methods.finalize().send({from: this.accounts[0]});
    }

    public async nominate(address:string, successor:string): Promise<void> {
        const contractObject:ContractObject = GraveContract;
        const graveContract = new this.web3.eth.Contract(contractObject.abi, address);
        await graveContract.methods.nominate(successor).send({from: this.accounts[0]});
    }

    public async setPortraitURL(address: string, portraitURL: string): Promise<void> {
        const contractObject:ContractObject = GraveContract;
        const graveContract = new this.web3.eth.Contract(contractObject.abi, address);
        await graveContract.methods.setPortraitURL(portraitURL).send({from: this.accounts[0]});
    }

    public myAddress(): string {
        return this.accounts[0];
    }
}