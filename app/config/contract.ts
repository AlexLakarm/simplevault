// Remplacer par l'adresse réelle obtenue lors du déploiement sur Holesky
export const contractAddress = '0x65dE2de33f8B15b35153c6b5937364Af1CCFD283' as const;

// L'ABI reste identique car le contrat est le même
export const contractABI = [
  {
    "inputs": [],
    "name": "Bank__NotEnoughEthersOnTheSC",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Bank__NotEnoughFundsProvided",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Bank__WithdrawFailed",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getBalanceOfUser",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sendEthers",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

// Ajout d'une configuration pour wagmi
export const wagmiConfig = {
    contracts: [
        {
            address: contractAddress,
            abi: contractABI,
        },
    ],
} as const;