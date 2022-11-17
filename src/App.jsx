import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Cat eating pizza on the moon"
  );
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });
  console.log(import.meta.env.VITE_Open_AI_Key)
  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "516x516",
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };
  return (
    <div className="app-main">
      {loading ? (
        <>
          <h3>Generating..Please Wait..</h3>
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
        <form className="app-form">          
          <img src="./img/metatecture_banner.png"/>
          <h3>AI | Design</h3>
          <h2>Name</h2>
          <textarea 
          className="app-input-name"
          placeholder="First Name"
          onChange={(e) => setName(e.target.value)}
          />
          <h2>Imagine a design</h2>
          <textarea
            className="app-input"
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value.concat(" 4k, realistic, cinematic, photorealistic") )}
            rows="10"
            cols="40"
          />
          <button className="app-button"
          onClick={generateImage}>Generate</button>
        </form>
        {
        result.length > 0 ? (
          <div className="result-text">{name}</div>) : ( <></> )
        }
        {
        result.length > 0 ? (
          <img className="result-image"  src={result} alt="result" />) : ( <></> )
        }
        </>
      )}
    </div>
  );
}

export default App;