### How to join the funding queue
TL;DR: reply to [this event](#) with a Bitcoin signed message of your Nostr npub in the following format:
```
<Bitcoin Address>
<Signature>
```

For example:
```
bc1qy4zt2cmeg7xl0p5lq0l5cr56ttr2d8cg82c994
H2+j9rl2D8TPws4icYtAhSuU9Xg+LsWTQIpVVX1FjG6mFOCIe5LjfFMcXFY06Qfkh/VHHmHs5p7xQTsTC6VuWXU=
```

Nostrocket will see this event and add you to the funding queue.

### How do I do this?

Most Bitcoin wallets support producing BIP-322 signed message. This proves that you own a certain Bitcoin address.

If your wallet does not support this, I don't know what to tell you.

#### Step 1
Your wallet will ask you for the message (text) you want to sign. Copy and paste your *npub* into this text field, with no white spaces.

Sign the message.

You will then be presented with:
- the message content, 
- your bitcoin address, 
- and the signature.

#### Step 2
1. Open [this event](#) in your favorite Nostr client
2. Reply to the event: 
   1. paste in your Bitcoin address. 
   2. Press enter for a new line. 
   3. Paste in the signature.
   4. Send it.

### What happens next?
Nostrocket will automagically verify the signature, check the balance of your Bitcoin address, add you to the funding queue.

The order of this queue matters. Nostrocket projects will offer investment in the queue order. For example, only when the first person in the queue has failed to produce a transaction in time or their pledged amount has been spent will the second person in the queue be able to invest.

