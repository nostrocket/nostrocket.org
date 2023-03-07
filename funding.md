## How to join the funding queue
TL;DR: reply to [this event](https://snort.social/e/note12qu5r2vnnfpn0kdw77ujxg7r2dzped0tu7038lkh0t4vv9g3vd2qjxr9c7) with a Bitcoin signed message of your Nostr npub in the following format:
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

## How do I do this?

Most Bitcoin wallets support producing BIP-322 signed messages. This proves that you own a certain Bitcoin address.

If your wallet does not support this, I don't know what to tell you.

### Step 1
Your wallet will ask you for the message (text) you want to sign. Copy and paste your *npub* into this text field, with no white spaces.

Sign the message.

You will then be presented with:
- the message content, 
- your bitcoin address, 
- and the signature.

### Step 2
1. Open [this event](https://snort.social/e/note12qu5r2vnnfpn0kdw77ujxg7r2dzped0tu7038lkh0t4vv9g3vd2qjxr9c7) in your favorite Nostr client
2. Reply to the event: 
   - paste in your Bitcoin address. 
   - Press enter for a new line. 
   - Paste in the signature.
   - Send it.

## How do I verify a funding commitment?
Read [this](/verify.html).

## What happens next?
Nostrocket will automagically verify the signature, check the balance of your Bitcoin address, and append you to the funding queue.

The order of this queue matters. Shares in Nostrocket projects get offered to people in the order of this queue.

## How does funding work for me as an investor?
When someone works on a Nostrocket project, shares are produced. You can see exactly what work was done to produce the shares by looking at the associated [pull request](https://www.pagerduty.com/resources/learn/what-is-a-pull-request/). Shares are only ever produced as a consequence of real work being done to solve a real problem that is in the critical path to more users or more revenue.

These shares are the basis for revenue distribution when people start paying for whatever the project builds or whatever service it provides. As with most organizational structures, there's higher risk higher reward associated with being early.

When a contributor (someone working on a Nostrocket project) needs to sell their shares, the easiest and simplest way is to just use the Nostrocket platform to do it. This means that the shares go through a rolling dutch auction, being offered to people in the order that they joined the funding queue. Everyone in the queue has a right of first refusal before being offered to the next person. If the entire queue rejects the offer, it starts again at a lower price.





