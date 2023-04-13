## How to verify a funding commitment

Funding commitments are Nostr events that contain a Bitcoin Signed Message (BIP-322).



You can use a library to validate these events, for example Nostrocket uses [this one](https://github.com/bitcoinjs/bitcoinjs-message) and has implemented it in [this file](https://github.com/nostrocket/nostr.hk/blob/master/verifyBitcoinSignedMessage.js). But the easiest way is to use an online tool which supports legacy as well as segwit Bitcoin addresses.

### Step 1
Find a Bitcoin Signed Message validation tool that supports segwit, [this one](https://www.verifybitcoinmessage.com/) for example.

Select a commitment from the list of Nostrocket funders. Let's verify [this commitment](note1ywfa8xmg7kyjazjlh0m4t6fw5esvlt8pccumr9n53zetmyma7mys37mmr6).

The relevant data is: 
```
Nostr Identity: npub1mygerccwqpzyh9pvp6pv44rskv40zutkfs38t0hqhkvnwlhagp6s3psn5p
Bitcoin Address: 178w97ueBBEntBdHNLnnb9ZSgMoTPyUSK
Signature: IEzZZY6E8DsU2OgVLKZlZ/GX1r45KD3JR8AE4ELM/mMgCJaD6s7FBsGVW6NMn70A/9FCzJmpkfIrmFEzl11FI1U=
```

Paste the Nostr Identity into Message field of the verification tool, with no white spaces.

Paste the Bitcoin address into the address field.

Paste the Signature into the signature field.

Click verify.