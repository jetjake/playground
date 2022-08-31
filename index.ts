import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { getOrca, OrcaFarmConfig, OrcaPoolConfig, Network } from "@orca-so/sdk";
import {MarginClient, MarginAccount, PoolManager} from '@jet-lab/margin';

import { AnchorProvider, Wallet } from "@project-serum/anchor"



async function main(pubkeystring : string ){
    console.log("jake")
    const config = await MarginClient.getConfig("mainnet-beta")
    const connection = new Connection("https://jetprot-main-0d7b.mainnet.rpcpool.com/cad6ce6e-2bbf-4a77-bea5-3a30d03ad0e9", 'singleGossip')
    const options = AnchorProvider.defaultOptions()
    
    const walletKepair = Keypair.generate()
    const walletPubkey = walletKepair.publicKey
    let wallet2 = new Wallet(walletKepair);
    
    const provider = new AnchorProvider(connection, wallet2, options)
    
    const programs = MarginClient.getPrograms(provider, config)
    
    //Load margin pools
    const poolManager = new PoolManager(programs, provider)
    const pools = await poolManager.loadAll()
    
    
    let pubkey2 = new PublicKey(pubkeystring)
    
    const mints: any = {};
    
    for (const pool2 of Object.values(pools)) {
        mints[pool2.symbol] = {
          tokenMint: pool2.addresses.tokenMint,
          depositNoteMint: pool2.addresses.depositNoteMint,
          loanNoteMint: pool2.addresses.loanNoteMint
        };
      }
    const transactions = await MarginClient.getTransactionHistory(provider, pubkey2, mints, config)
    
    console.log(transactions)




}

main('8oPT9UsUkW7zHqZzGnx1BuSKd4JHCEhWEXXbJkbknouh')

// console.log("look ma, no hands")

// const orca = getOrca(connection, Network.DEVNET);
// console.log(orca)


// console.log(OrcaPoolConfig)
// const orcaPool = orca.getPool(OrcaPoolConfig.SOL_USDC);
// const tokenB = orcaPool.getTokenB();
// console.log(orcaPool)
// console.log(tokenB.mint.toBase58())

// const tokenA = orcaPool.getTokenA();
// console.log(tokenA)
// console.log(tokenA.mint.toBase58())
// console.group()





//token mint for USDC = EmXq3Ni9gfudTiyNKzzYvpnQqnJEMRw2ttnVXoJXjLo1
//token mint for USDT = 6PE3Mwjzx9h8kCoBp5YPed9TFoG7du8L98yucBP5ps3x
//