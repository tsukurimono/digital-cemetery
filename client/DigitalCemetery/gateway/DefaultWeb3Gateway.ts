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
            createGrave(name:string, birth:number, death:number, portraitURL:string): {send(param:any):Promise<void>}
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

    public async getGraves(limit:number, offset:number): Promise<Grave[]> {
        const graveContracts = await this.graveFactoryContract.methods.associatedGraves(limit, offset).call({from: this.accounts[0]});
        const graves:Grave[] = []

        graveContracts.forEach(async(element) => {
            const contractObject:ContractObject = GraveContract;
            console.log(element);
            const grave = new this.web3.eth.Contract(contractObject.abi, element);
            graves.push(new Grave(
                grave.options.address,
                await grave.methods.name().call(), 
                Number(await grave.methods.birth().call()),
                Number(await grave.methods.death().call()),
                await grave.methods.portraitURL().call()
                ))
        });
        return graves;
    }

    public async getGraveCount(): Promise<number> {
        return await this.graveFactoryContract.methods.associatedGravesCount().call();
    }

    public async createGrave(name:string, birth:number, death:number, portraitURL:string): Promise<void> {
        await this.graveFactoryContract.methods.createGrave(
            name, 
            birth, 
            death, 
            portraitURL
            ).send({from: this.accounts[0]});
    }
}