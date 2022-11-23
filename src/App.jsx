import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  // user name
  const [name, setName] = useState("");
  // image generator options 
  const [prompt, setPrompt] = useState("");
  const [vibe, setVibe] = useState("");
  const [photo, setPhoto] = useState("");
  const [camera, setCamera] = useState("");
  const [light, setLight] = useState("");

  // generator result image
  const [result, setResult] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "cyber punk light purple dinning room with white cat"
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
      prompt: prompt + " " + vibe + " " + photo + " " + camera + " " + light,
      n: 1,
      size: "512x512",
    });
    console.log(res)
    setLoading(false);
    setResult(res.data.data[0].url);
  };

  // Google Sheet API
  

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

          <h2>Name</h2>
          <textarea 
          className="app-input-name"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
          />
          
          <h2>Imagine a design</h2>
          <textarea
            className="app-input"
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value)}
            rows="10"
            cols="40"
          />
          <br></br>
          <h2>Optional - Vibe</h2>
          <input type="text" list="vibes1" className="app-list"
          onChange={(e) => setVibe(e.target.value)}/>
          <datalist id="vibes1">
            <option>Isometric 3D</option>
            <option>3D render</option>
            <option>Pixel Art</option>
            <option>Cyberpunk</option>
            <option>Afrofuturism</option>
            <option>Vaporwave</option>
            <option>Post-apocalyptic</option>
            <option>Kodachrome</option>
            <option>Autochrome</option>
            <option>Lomography</option>
            <option>Polaroid</option>
            <option>Black and white, Tri-X 400TX</option>
            <option>Infrared photography</option>
            <option>Instagram, Hipstamatic</option>
            </datalist>

          <h2>Optional - Photography Style</h2>
          <input type="text" list="photography" className="app-list"
          onChange={(e) => setPhoto(e.target.value)}/>
          <datalist id="photography">
            <option>wide shot</option>
            <option>close-up</option>
            <option>medium shot</option>
            <option>long shot</option>
            <option>Overhead view</option>
            <option>low angle</option>
            <option>aerial view</option>
            <option>titled frame</option>
            <option>over-the-shoulder</option>
            </datalist>
            
          <h2>Optional - Camera Type</h2>
          <input type="text" list="camera" className="app-list"
          onChange={(e) => setCamera(e.target.value)}/>
          <datalist id="camera">
            <option>Sigma 85 mm</option>
            <option>Fast shutter speed</option>
            <option>Slow shutter speed</option>
            <option>Bokeh</option>
            <option>Tilt shift photography</option>
            <option>Macro lens</option>
            <option>Wide angle lens, 15mm</option>
            <option>Deep depth of field,</option>
            </datalist>
          
            <h2>Optional - Lighting Settings</h2>
          <input type="text" list="lighting" className="app-list"
          onChange={(e) => setLight(e.target.value)}/>
          <datalist id="lighting">
            <option>Warm lighting</option>
            <option>Low-key lighting</option>
            <option>Backlighting, backlit </option>
            <option>Studio lighting</option>
            <option>High-key lighting</option>
            <option>Golden hour</option>
            <option>Blue hour</option>
            <option>Midday</option>
            <option>shadow & silhouette</option>
            </datalist>
          
          <button className="app-button"
          onClick={generateImage}>Generate</button>
        </div>
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