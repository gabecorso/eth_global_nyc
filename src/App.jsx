import { useState } from "react";
import reactLogo from "./assets/react.svg";
import aleoLogo from "./assets/aleo.svg";
import otterTranscriptLogo from "./assets/otterTranscriptLogo.png"
import "./App.css";
import transcript_program from "../transcript_1g2cpw/build/main.aleo?raw"
import { AleoWorker } from "./workers/AleoWorker.js";

import { AleoKeyProvider, AleoNetworkClient, NetworkRecordProvider, ProgramManager, KeySearchParams} from '@aleohq/sdk';



const aleoWorker = AleoWorker();
function App() {
  const [graduated, setGraduated] = useState(null)
  const [totalGpa, setTotalGpa] = useState(null)
  const [account, setAccount] = useState(null);
  const [executing, setExecuting] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [result, setResult] = useState(0);
  
  async function execute() {
    setExecuting(true);

    // Create a key provider that will be used to find public proving & verifying keys for Aleo programs
    const keyProvider = new AleoKeyProvider();
    keyProvider.useCache = true;

// Create a record provider that will be used to find records and transaction data for Aleo programs
    const networkClient = new AleoNetworkClient("https://vm.aleo.org/api");
    const recordProvider = new NetworkRecordProvider("APrivateKey1zkpG5tQQD2ar6o7FjJrrLwxVMG5pQwmUyaKajFbXxjcJjKu", networkClient);

// Initialize a program manager to talk to the Aleo network with the configured key and record providers
    const programManager = new ProgramManager("https://vm.aleo.org/api", keyProvider, recordProvider);

// Provide a key search parameter to find the correct key for the program if they are stored in a memory cache
    const keySearchParams = { "cacheKey": "hello_hello:hello" };
    const tx_id = await programManager.execute(transcript_program, "issue_transcript", 0.020, ["aleo1g2cpwwktyll47u22dy3uajvcdhlsum49zmhn4e69x5fypyzccu9stw65f8", "aleo1fjzaae5tj4xf93hq5f6y7p2cmv2cwp0nypcc7979yrgutmczhsgsnky9af", "365u16", "400u16", "true", "1695499890344i64"],
        undefined, undefined, undefined, keySearchParams);
    const transaction = await programManager.networkClient.getTransaction(tx_id);

    setExecuting(false);

    setResult(transaction);

    alert(JSON.stringify(result));
  }

  async function check_graduation() {
    setExecuting(true);
    const result = await aleoWorker.localProgramExecution(
        transcript_program,
        "check_is_graduated",
        ["aleo1g2cpwwktyll47u22dy3uajvcdhlsum49zmhn4e69x5fypyzccu9stw65f8"],
    );
    setExecuting(false);

    setGraduated(result);

    alert(JSON.stringify(result));
  }

  async function check_total_gpa() {

    const networkClient = new AleoNetworkClient("https://vm.aleo.org/api");
    let mappingValue = networkClient.getMappingValue("main.aleo", "account", "aleo1g2cpwwktyll47u22dy3uajvcdhlsum49zmhn4e69x5fypyzccu9stw65f8");


    setExecuting(true);
    setExecuting(false);

    setTotalGpa(mappingValue);

    alert(JSON.stringify(result));
  }

  async function deploy() {
    setDeploying(true);
    try {
      const result = await aleoWorker.deployProgram(transcript_program);
      console.log("Transaction:")
      console.log("https://explorer.hamp.app/transaction?id=" + result)
      alert("Transaction ID: " + result);
    } catch (e) {
      console.log(e)
      alert("Error with deployment, please check console for details");
    }
    setDeploying(false);
  }

  return (
    <>
      <div>
        <div className={"image-crop"}>
          <img src={otterTranscriptLogo} className={'logo otter-logo'} alt={'my transcript logo'} />
        </div>
        <a href="https://aleo.org" target="_blank">
          <img src={aleoLogo} className="logo" alt="Aleo logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>OtterTranscript <br/> (powered by Aleo and React)</h1>
      <div className="card">
        <p>
          <button onClick={generateAccount}>
            {account
              ? `Account is ${JSON.stringify(account)}`
              : `Click to generate account`}
          </button>
        </p>
        <p>
          <button disabled={executing} onClick={execute}>
            {executing
              ? `Executing...check console for details...`
              : `Issue a Transcript`}
          </button>
        </p>


        <p>
          Result of transcript: {result}
        </p>


        <p>
          <button disabled={executing} onClick={check_graduation}>
            {executing
                ? `Executing...check console for details...`
                : `Check is Graduated`}
          </button>
        </p>

        <p>
          Is graduated: {graduated}
        </p>


        <p>
          <button disabled={executing} onClick={check_total_gpa}>
            {executing
                ? `Executing...check console for details...`
                : `Check total GPA`}
          </button>
        </p>

        <p>
          Total GPA: {totalGpa}
        </p>

        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      {/* Advanced Section */}
      <div className="card">
        <h2>Advanced Actions</h2>
        <p>
          Deployment on Aleo requires certain prerequisites like seeding your
          wallet with credits and retrieving a fee record. Check README for more
          details.
        </p>
        <p>
          <button disabled={deploying} onClick={deploy}>
            {deploying
              ? `Deploying...check console for details...`
              : `Deploy transcript.aleo`}
          </button>
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Aleo and React logos to learn more
      </p>
    </>
  );
}

export default App;
