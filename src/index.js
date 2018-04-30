import React from "react";
import {render} from "react-dom";
import App from "./components/App";
import SourceData from "./staticSourceData";
render(<App sourceData={SourceData} />, document.getElementById('container'));