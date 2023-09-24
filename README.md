# Project Description
This project uses Aleo's Layer 1 solution to provide students and graduates with ownership over their academic transcripts. Issuing authorities like academic institutions can create and issue transcripts as Leo records to owner addresses which are students. These records can then be queried for accuracy in regards to features like total GPA, major GPA, and graduation status and timestamp.

## How it's Made
I leveraged Aleo's Layer 1 solution to make a dApp that implements transcripts on the blockchain. A core issue with transcripts being on-chain is the sensitivity of the information contained within. By using the privacy options Aleo is built from the ground up to support you can solve for the issue of having ownership of your own transcript with an immutable record of its changes and status while not sacrificing privacy by having the entirety of your transcript public. Interested parties like hiring authorities or other academic institutions can verify the authenticity of your transcript, your degree, and your performance in specific classes with zero knowledge proofs. I used the Aleo javascript SDK and the create aleo app SDK for creating a simple front end to interact with this application. I used Midjourney to help me create a simple logo as well as Material UI to supplement my front end.



## React + Aleo + Leo

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/AleoHQ/sdk/tree/testnet3/create-aleo-app/template-react)

This template provides a minimal setup to get React and Aleo working in Vite
with HMR and some ESLint rules.

This template includes a Leo program that is loaded by the web app located in
the `helloworld` directory.

Note: Webpack is currently used for production builds due to a
[bug](https://github.com/vitejs/vite/issues/13367) with Vite related to nested
workers.

### Start in development mode

```bash
npm run dev
```

Your app should be running on http://localhost:5173/

### Build Leo program

1. Copy the `transcript_1g2cpw/.env.example` to `transcript_1g2cpw/.env` (this will be ignored
   by Git):

   ```bash
   cd helloworld
   cp .env.example .env
   ```

2. Replace `PRIVATE_KEY=user1PrivateKey` in the `.env` with your own key (you
   can use an existing one or generate your own at https://aleo.tools/account)

3. Follow instructions to install Leo here: https://github.com/AleoHQ/leo

4. You can edit `transcript_1g2cpw/src/main.leo` and run `leo run` to compile and update the
   Aleo instructions under `build` which are loaded by the web app.

## Deploy program from web app

> [!WARNING]  
> This is for demonstration purposes or local testing only, in production applications you
> should avoid building a public facing web app with private key information

Information on generating a private key, seeding a wallet with funds, and finding a spendable record can be found here
if you are unfamiliar: https://developer.aleo.org/testnet/getting_started/deploy_execute_demo

Aleo programs deployed require unique names, make sure to edit the program's name to something unique in `transcript_1g2cpw/src/main.leo`, `helloworld/program.json`, rename `helloworld/inputs/helloworld.in` and rebuild.

1. In the `worker.js` file modify the privateKey to be an account with available
   funds

   ```js
   // Use existing account with funds
   const account = new Account({
     privateKey: "user1PrivateKey",
   });
   ```

2. (Optional) Provide a fee record manually (located in commented code within `worker.js`)

   If you do not provide a manual fee record, the SDK will attempt to scan for a record starting at the latest block. A simple way to speed this up would be to make a public transaction to this account right before deploying.
   
3. Run the web app and hit the deploy button

## Production deployment

### Build

`npm run build`

Upload `dist` folder to your host of choice.

### ⚠️ Header warnings

`DOMException: Failed to execute 'postMessage' on 'Worker': SharedArrayBuffer transfer requires self.crossOriginIsolated`

If you get a warning similar to this when deploying your application, you need
to make sure your web server is configured with the following headers:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

We've included a `_headers` file that works with some web hosts (e.g. Netlify)
but depending on your host / server setup you may need to configure the headers
manually.
