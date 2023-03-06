function testVerify() {
    return bitcoin.verify('sadf', 'bc1q7recy2dwk6dd9vlerh6spedn0p67ttrcws234u', 'HxljWqtZomeYdbxjXjlifsRXGX6uy38gATiKWyM/ZThvXb8CHEFchuIY8e22bQmsE0bkend1CpOokVcqfZENQi8=', '', true)
}

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
    return bitcoin.verify(npub, btcAddress, sig)
}

async function getBalance(address) {
    p = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest()
        request.open("GET", "https://blockchain.info/rawaddr/" + address);
        request.send();
        request.onload = () => {
            if (request.status === 200) {
                data = JSON.parse(request.response)
                resolve(Number(data["final_balance"]))
            } else {
                resolve(false)
            }
        }

    })
    return p
}