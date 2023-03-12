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

You will require a wallet capable of producing a Bitcoin Signed Message (BIP-322). This proves that you own a certain Bitcoin address.

If your wallet doesn't support this, I don't know what to tell you other than to use a different wallet.

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

The order of this queue matters. Shares in Subrockets get offered to people in the order of this queue.

## How does funding work for me as an investor?
When someone contributes work to a Subrocket, they submit an expense of the approximate value of that work. This is then peer reviewed such that shares are only ever produced as a consequence of real work being done to solve a real problem that is in the critical path to more users or more revenue.

If an expense is approved, the contributor has two options:
1. The contributor can be issued with shares at a rate of 1:1 per satoshi claimed in the expense, OR
2. The contributor can sell their expense to an investor who pays it and gets issued with the shares.

If the contributor opts to sell their expense to an investor, it will be offered to investors in the order that the joined the funding waitlist.

Everyone in the waitlist has a right of first refusal before being offered to the next person.

## Security considerations
This should go without saying, but doing this allows other people can see that you own:
- the Bitcoin address you provide
- the amount of Bitcoin that you have in the address