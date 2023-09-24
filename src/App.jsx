import { useState } from "react";
import reactLogo from "./assets/react.svg";
import aleoLogo from "./assets/aleo.svg";
import otterTranscriptLogo from "./assets/otterTranscriptLogo.png"
import "./App.css";
import '@fontsource/inter';
import {Button, Chip, Input, Stack} from "@mui/joy";
import transcript_program from "../transcript_1g2cpw/build/main.aleo?raw";
import {AleoNetworkClient} from "@aleohq/sdk";
import {AleoWorker} from "./workers/AleoWorker";
const aleoWorker = AleoWorker()
function App() {
  const [account, setAccount] = useState(null);
  const [submitted, setSubmitted] = useState(false)
  const [graduated, setGraduated] = useState(null)
  const [totalGpa, setTotalGpa] = useState(null)
  const [executing, setExecuting] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [result, setResult] = useState(0);

  async function execute() {
    setExecuting(true);
    const result = await aleoWorker.localProgramExecution(
        transcript_program,
        "issue_transcript",
        ["aleo1g2cpwwktyll47u22dy3uajvcdhlsum49zmhn4e69x5fypyzccu9stw65f8", "aleo1fjzaae5tj4xf93hq5f6y7p2cmv2cwp0nypcc7979yrgutmczhsgsnky9af", "365u16", "400u16", "true", "1695499890344i64"],
    );
    setExecuting(false);

    setResult(result);

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
      {account && submitted ?
      <div>
        <div>
          <div className="card">
            <Chip color="primary"
                   size="lg"
                   variant="soft" >Account Address: {account}</Chip>
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
        </div>
      </div> :
          <div>
            <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  console.log(formData.entries())
                }}
            >
              <Stack spacing={1}>
                <Input
                    color="primary"
                    placeholder="Add your address"
                    size="lg"
                    variant="outlined"
                    required
                    onChange={(event) =>
                        setAccount(event.target.value)
                    }
                />
                <Button type="submit" onClick={() => {setSubmitted(true)}}>Submit</Button>
              </Stack>
            </form>
          </div>
      }

    </>
  );
}

export default App;
