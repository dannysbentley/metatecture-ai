import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  // user name
  const [name, setName] = useState("");
  // image generator options 
  const [prompt, setPrompt] = useState("");
  const [vibe, setVibe] = useState("");
  const [flooring, setFlooring] = useState("");
  const [ceiling, setCeiling] = useState("");

  // generator result image
  const [result, setResult] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Spring in Rome Italy in light blue room with a gray kitten."
  );

  // API key 
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

// Open AI configuration 
  const openai = new OpenAIApi(configuration);

  // Generate an image using the form
  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: "very large bedroom suite and livingroom " + prompt + " " + vibe + " " + ceiling + " " + flooring + ", golden hour" + ", wide angle lens, 15mm" + ", highly detailed" + ", realistic" + ", 8k",
      n: 1,
      size: "512x512",
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };

  // Google Sheet API
  const handleSubmit = async e => {
    //alert("hello");
    e.preventDefault();
    try {
      await fetch("https://v1.nocodeapi.com/metatecture/google_sheets/iAgonfsHbfArJpJu?tabId=data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([[result, name, prompt]]),
      })
    } catch (err) {
      console.log("google apinocode. " + err)
    }
  }

  // Return the html website 
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
        <div className="app-form">          
          <img className= "app-img" src="https://i.ibb.co/SstZ80m/metatecture-BW.png" alt="metatecture-banner"/>
          <h2 className="intro">Introducing our</h2>
          <h3>AI Design Modeling System</h3>

          <h2>Email</h2>
          <textarea 
          className="app-input-name"
          placeholder="danny@dwpmetatecture.com"
          onChange={(e) => setName(e.target.value)}
          />
          <br></br>
          <p>
            Imagine your perfect holiday suite? 
            <br></br>
            location - room color - pets
            </p>
          <textarea
            className="app-input"
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value)}
            rows="10"
            cols="40"
          />
          <br></br>

          <h2>Style</h2>
          <input type="text" list="vibes1" className="app-list"
          onChange={(e) => setVibe(e.target.value)}/>
          <datalist id="vibes1">
            <option>chic modern design style</option>
            <option>classical design style</option>
            <option>timeless design style</option>
            <option>ultra modern minimalist design style</option>
            <option>modernist design style</option>
            <option>craft design style</option>
            <option>international design style</option>     
            </datalist>         
            
          <h2>Floor</h2>
          <input type="text" list="flooring" className="app-list"
          onChange={(e) => setFlooring(e.target.value)}/>
          <datalist id="flooring">
            <option>white marble flooring</option>
            <option>blond wood flooring</option>
            <option>walnut wood flooring</option>
            <option>gray stone flooring</option>
            <option>chevron flooring</option>
            <option>herringbone flooring</option>
            <option>carpet flooring</option>
            <option>decrotive tile flooring</option>
            </datalist>
          
            <h2>Ceiling</h2>
          <input type="text" list="ceiling" className="app-list"
          onChange={(e) => setCeiling(e.target.value)}/>
          <datalist id="ceiling">
            <option>High ceiling with artificial lighting</option>
            <option>vaulted ceiling with natural lighting</option>
            <option>cathedral ceiling with natural lighting</option>
            <option>coffered ceiling with artificial lighting</option>
            <option>tray ceiling with artificial lighting</option>
            <option>barrel vaulted ceiling with artificial lighting</option>
            <option>groin vault ceiling with artificial lighting</option>
            </datalist>
          
          <button className="app-button"
          onClick={generateImage}>Generate</button>
        </div>

        { result.length > 0 ? (
          <div className="result-text">{name}</div>) : ( <></> )
        }
        { result.length > 0 ? (
          <img onLoad={handleSubmit} className="result-image"  src={result} alt="result" />) : ( <></> )
        }       
        </>
      )}
    </div>
  );
}

export default App;