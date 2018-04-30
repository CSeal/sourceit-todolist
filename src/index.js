import React from "react";
import {render} from "react-dom";
import App from "./components/App";
import {BrowserRouter} from 'react-router-dom';
import SourceData from "./staticSourceData";
render((<BrowserRouter>
            <App sourceData={SourceData} />
        </BrowserRouter>
    ),document.getElementById('container'));