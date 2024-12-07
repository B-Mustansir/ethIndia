import "./App.css";
import React, { useState } from "react";
import Landing from "./pages/Landing";
import { ReactLenis, useLenis } from "lenis/react";
import Upload from "./pages/Upload";
import { useConnect } from 'wagmi';

function App() {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });


  return (
    <>
      <ReactLenis root>
        {/* <Landing /> */}
        <Upload/>
      </ReactLenis>
    </>
  );
}

export default App;
