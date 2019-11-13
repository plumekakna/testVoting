
    //Check providers
    if (typeof web3 !== 'undefined') {
			web3 = new Web3(web3.currentProvider);
			console.log("Use MetaMask");
        } else {
            // set the provider you want from Web3.providers
			web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
			console.log("7545");
        }
        
            // Set ccount
            web3.eth.defaultAccount = web3.eth.accounts[0];
			console.log(web3.eth.defaultAccount);

            // Set ABI
            var contractAbi = web3.eth.contract([
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_name",
                            "type": "string"
                        }
                    ],
                    "name": "addCandidate",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_candidateId",
                            "type": "uint256"
                        }
                    ],
                    "name": "voting",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "string",
                            "name": "_name",
                            "type": "string"
                        }
                    ],
                    "name": "EventaddCandidate",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "candidateId",
                            "type": "uint256"
                        }
                    ],
                    "name": "EventVoting",
                    "type": "event"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "candidate",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "score",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "candidateCount",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                }
            ]);
        // Set Address Transection
        var contract = contractAbi.at('0x49f0da3b4f07e4dC1BE1e7C0fb4d494b89843Fe5');
        console.log(contract);

        // Event add
        var Eventadd = contract.EventaddCandidate({}, 'lastest');
        Eventadd.watch(function(error, result) {
            if (!error) {
                $("#errmsg").html("<span class='badge badge-pill badge-success'>Complete!!</span><br><br>");
				console.log("Add Complete");                              
            } else {
                console.log(error);
            }
        });
        
        //add candidate
        $("#add").click(function(){
            contract.addCandidate($("#addName").val(), (err, res) => {
                if (err) {
                    $("#errmsg").html("<span class='badge badge-pill badge-danger'>Fail</span><br><br>");
                    console.log(err);
                } else {
                    $("#errmsg").html("<span class='badge badge-pill badge-primary'>Loading...</span><br><br>"); 
                }
            });
        });

        // Show Candidate
        var count=0;
        contract.candidateCount(function(err, result) {
            count = result.c;
            console.log(count);
            for (let index = 1; index <= count; index++) {
                contract.candidate(index, function(err, result){
                    $("#vote").append("<option value='" + index + "'>" + result[1] + "</option>"); 
                    $("#n").append("<tr><td>" + result[1] + "</td><td>" + result[2] + "</td></tr>");                  
                    console.log(index , result[1])
                });               
            }
        });

        
            

            
        
        // When Click Vote
        $("#voting").click(function(){
            contract.voting($("#vote").val(), (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    $("#errmsg").html("<span class='badge badge-pill badge-primary'>Loading...</span><br><br>");
                     
                }
            });
        }); 
        
        
        // Event vote
        var EventVote = contract.EventVoting({}, 'lastest');
        EventVote.watch(function(error, result) {
            if (!error) {
                $("#errmsg").html("<span class='badge badge-pill badge-success'>Complete!!</span><br><br>");
                console.log("Vote Complete");                             
            } else {
                console.log(error);
            }
        });