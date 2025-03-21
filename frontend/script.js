const contractAddress = "0xbEC864656D41051D2e632b42232A024c16b8Bec5";
const contractABI = [/* [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "CardListedForSale",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "metadata",
				"type": "string"
			}
		],
		"name": "CardMinted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "CardSold",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "buyCard",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getCardDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "metadata",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "forSale",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					}
				],
				"internalType": "struct NFTTradingCardGame.NFTCard",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "listCardForSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "metadata",
				"type": "string"
			}
		],
		"name": "mintCard",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
] */];

let web3;
let nftContract;
let userAccount;

// Connect Wallet
document.getElementById("connectWallet").addEventListener("click", async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        userAccount = accounts[0];
        nftContract = new web3.eth.Contract(contractABI, contractAddress);
        document.getElementById("statusMessage").textContent = `Wallet Connected: ${userAccount}`;
    } else {
        alert("Please install MetaMask!");
    }
});

// Mint a new card
document.getElementById("mintCard").addEventListener("click", async () => {
    if (!nftContract) return alert("Connect Wallet First!");
    
    try {
        await nftContract.methods.mintCard().send({ from: userAccount });
        alert("New NFT card minted!");
        loadPlayerCards();
    } catch (error) {
        console.error(error);
    }
});

// Load player's NFT cards
async function loadPlayerCards() {
    if (!nftContract) return;
    
    try {
        const totalCards = await nftContract.methods.getPlayerCards(userAccount).call();
        const yourCardsContainer = document.getElementById("yourCards");
        yourCardsContainer.innerHTML = "";

        totalCards.forEach((cardId) => {
            let card = document.createElement("div");
            card.classList.add("card");
            card.textContent = `#${cardId}`;
            yourCardsContainer.appendChild(card);
        });

    } catch (error) {
        console.error(error);
    }
}

// Trade a card (dummy function for now)
document.getElementById("tradeCard").addEventListener("click", () => {
    alert("Trade feature coming soon!");
});

// Battle function
document.getElementById("battle").addEventListener("click", async () => {
    if (!nftContract) return alert("Connect Wallet First!");
    
    try {
        const result = await nftContract.methods.battle().send({ from: userAccount });
        alert(`Battle result: ${result.events.BattleOutcome.returnValues.winner}`);
    } catch (error) {
        console.error(error);
    }
});
