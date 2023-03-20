function verifyBitcoinAddress(ev) {
    if (ev) {
        let splitted = ev.content.split(/\r?\n/)
        try {
            if(bitcoinjs.address.fromBech32(splitted[0])){return splitted}
        } catch (err) {
        }
        try {
            if(bitcoinjs.address.fromBase58Check(splitted[0])){return splitted}
        } catch (err) {
        }

    }
    return false
}

function verifyBitcoinSignedEvent(npub, btcAddress, sig) {
    let res = bitcoin.verify(npub, btcAddress, sig, '', true)
    if (!res) (console.log(npub, btcAddress, "sig failed"))
    return res
}



async function getBalance(address) {
    p = new Promise((resolve, reject) => {
        fetchBalance(address, 0).then(result => {
            if (result !== "failed") {
                resolve(result)
            } else {
                fetchBalance(address, 1).then(result => {
                    if (result !== "failed") {
                        resolve(result)
                    } else {
                        console.log(address)
                        resolve(false)
                    }
                })
            }
        })
    })
    return p
}

async function fetchBalance(address, service) {
    p = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest()
        if (service === 0) {
            request.open("GET", "https://api.blockcypher.com/v1/btc/main/addrs/" + address+"/balance");
        }
        if (service === 1) {
            request.open("GET", "https://blockchain.info/rawaddr/" + address);
        }
        request.send();
        request.onerror = function () {resolve("failed")}
        request.onload = () => {
            if (request.status === 200) {
                data = JSON.parse(request.response)
                resolve(Number(data["final_balance"]))
            } else {
                resolve("failed")
            }
        }

    })
    return p
}
