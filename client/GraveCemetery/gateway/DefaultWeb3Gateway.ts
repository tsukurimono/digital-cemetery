import { Web3Gateway, Grave } from '@/gateway/Web3Gateway'
import Web3 from "web3";
import GraveFactoryContract from "../contracts/GraveFactory.json";

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
            createGrave(name:string, birth:number, death:number, portraitURL:string): void
            associatedGraves(limit:number, offset:number): {call():Promise<GraveContract[]>}
            associateGrave(address:string): void
        }
    }

    interface GraveContract {
        _address:string,
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
       console.log(gateway.graveFactoryContract);

       return gateway;
    }

    public async getGraves(limit:number, offset:number): Promise<Grave[]> {
        const graveContracts = await this.graveFactoryContract.methods.associatedGraves(limit, offset).call();
        const grave:Grave[] = []

        graveContracts.forEach(async(element) => {
            grave.push(new Grave(
                element._address,
                await element.methods.name().call(), 
                await element.methods.portraitURL().call(),
                await element.methods.birth().call(),
                await element.methods.death().call()
                ))
        });
        return grave;
    }

    public async getGraveCount(): Promise<number> {
        return await this.graveFactoryContract.methods.associatedGravesCount().call();
    }
}