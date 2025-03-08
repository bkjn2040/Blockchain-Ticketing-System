const {
    Client,
    ContractCreateFlow,
    ContractCallQuery,
    ContractExecuteTransaction,
    ContractFunctionParameters,
    Hbar,
    PrivateKey
} = require('@hashgraph/sdk');
const { ethers } = require('ethers');
require('dotenv').config();

async function deploySmartContract() {
    // This code is from the smart contract workshop from Jakub
    const accountId = process.env.ACCOUNT_ID;
    const privateKey = PrivateKey.fromStringED25519(process.env.PRIVATE_KEY);
    console.log(toString(accountId));
    console.log(toString(privateKey));

    if (!accountId || !privateKey) {
        throw Error('Environment variables must be set up properly!');
    }
    console.log('Environment set up!');
    console.log('\n');

    const client = Client.forTestnet();
    client.setOperator(accountId, privateKey);

    let contract = require('./Event.json');
    const bytecode = contract.data.bytecode.object;
    const abi = contract.data.abi;

    // Create the contract on Hedera Testnet
    const constructorParameters = new ContractFunctionParameters()
        .addString("event")
        .addUint32(50)
        .addUint256(7)
        .addUint256(9);

    let contractTx = await new ContractCreateFlow()
        .setGas(1000000)
        .setBytecode(bytecode)
        .setConstructorParameters(constructorParameters);
    
    // Submit the transaction to the Hedera test network
    console.log('Executing transaction of contract deployment...');
    const contractResponse = await contractTx.execute(client);
    console.log('Transaction executed and contract deployed !');
    console.log('\n');

    // Get the receipt of the contract's transaction
    console.log('Getting receipt of the transaction...');
    const contractReceipt = await contractResponse.getReceipt(client);

    // Get the smart contract ID
    const contractId = contractReceipt.contractId;
    console.log('The smart contract ID is ' + contractId);
    console.log('\n');

    /*//////////////////////////////////////////////////////////////
                        CONTRACT FUNCTION CALLS
    //////////////////////////////////////////////////////////////*/

    // Add participant -> calls a function on the smart contract
    const contractAddParticipantTx = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(1000000)
        .setFunction('addParticipant');

    // Submit the transaction to the Hedera testnet and store the response
    console.log('Adding participant to event...');
    const submitTx = await contractAddParticipantTx.execute(client);


    // Get the receipt of the transaction
    console.log('Getting the receipt of the transaction...');
    const receipt = await submitTx.getReceipt(client);
    


    // Confirm the transaction was executed successfully 

    

    console.log('\n');

    // Query the contract to get the updated funds
    // const contractGetParticipant = new ContractCallQuery()
    //     .setContractId(contractId)
    //     .setGas(1000000)
    //     .setFunction('getParticipant')
    //     .addUint256(i) // have to add setFUcntion and then createparameters
    //     .setQueryPayment(new Hbar(3));
    //Query the contract to get the updated funds
    // const contractGetParticipants = new ContractCallQuery()
    //     .setContractId(contractId)
    //     .setGas(1000000)
    //     .setFunction('getParticipants') // Function to get the participants array
    //     .setQueryPayment(new Hbar(3));
    const contractGetParticipantsLength = new ContractCallQuery()
        .setContractId(contractId)
        .setGas(1000000)
        .setFunction('getParticipantsLength') // Function to get the length of participants
        .setQueryPayment(new Hbar(3));

    // Submit the transaction to the Hedera testnet and get the new saved amount
    console.log('Executing query transaction...');
    const contractLength = await contractGetParticipantsLength.execute(client);
    console.log('Getting length...');
    //const participantsResponse = await contractGetParticipants.execute(client);

    // const iface = new ethers.Interface(abi);
    // const decodedParticipants = iface.decodeFunctionResult(
    //     'getParticipants', // Function name
    //     participantsResponse.bytes // Raw response bytes
    // );

    // const participants = decodedParticipants[0]; // The first element is the array of addresses
    // console.log('Participants in the event:');
    // for (let i = 0; i < participants.length; i++) {
    //     console.log(`Participant ${i + 1}: ${participants[i]}`);
    // }

    

    const length = contractLength.getUint256(0);

    console.log('Getting each participant...');
    
    for (let i = 0; i < length; i++){
        const contractGetParticipant = new ContractCallQuery()
            .setContractId(contractId)
            .setGas(1000000)
            .setFunction('getParticipant', new ContractFunctionParameters().addUint256(i))
            .setQueryPayment(new Hbar(3));

        const contractParticipant = await contractGetParticipant.execute(client);

        console.log('Successfully added particant: ' + contractParticipant.getUint256(i));
    }
    // const array = contractNewFunds.getAddress ();
    // for (let i = 0; i < array.length; i++){
    //     console.log('Successfully added particant: ' + contractNewFunds.getUint256(i));
    // }

    process.exit(0);

}
deploySmartContract();