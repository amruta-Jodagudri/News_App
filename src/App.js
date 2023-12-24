import './App.css';

//rcc shortcut for class based component
// import React, { Component } from 'react';
// import Navbar from './components/Navbar';
// import News from './components/News';

// import reactRouterDom ,{
//   BrowserRouter as Router,
//   Routes,
//   Route
// } from "react-router-dom";

// export default class App extends Component {
//   pageSize = 5;
//   apikey = process.env.REACT_APP_NEWS_API;
//   render() {
//     return (
//       <div>
//         <Router>
//         <Navbar/>
//         <Routes>
//           <Route exact path="/"><News key="general" apikey={this.apikey} pageSize={this.pageSize} country="in" category="general"/></Route>
//           <Route exact path="/business"><News key="business" apikey={this.apikey} pageSize={this.pageSize} country="in" category="business"/></Route>
//           <Route exact path="/entertainment"><News key="entertainment" apikey={this.apikey} pageSize={this.pageSize} country="in" category="entertainment"/></Route>
//           <Route exact path="/general"><News key="general" apikey={this.apikey} pageSize={this.pageSize} country="in" category="general"/></Route>
//           <Route exact path="/health"><News key="health" apikey={this.apikey} pageSize={this.pageSize} country="in" category="health"/></Route>
//           <Route exact path="/science"><News key="science" apikey={this.apikey} pageSize={this.pageSize} country="in" category="science"/></Route>
//           <Route exact path="/sports"><News key="sports" apikey={this.apikey} pageSize={this.pageSize} country="in" category="sports"/></Route>
//           <Route exact path="/technology"><News key="technology" apikey={this.apikey} pageSize={this.pageSize} country="in" category="technology"/></Route>
//         </Routes>
//         </Router>
//       </div>
//     );
//   }
// }


import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component {
  pageSize = 5;

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={<News key="general" pageSize={this.pageSize} country="in" category="general" />}
            />
            <Route
              exact
              path="/business"
              element={<News key="business" apikey={this.apikey} pageSize={this.pageSize} country="in" category="business" />}
            />
            <Route
              exact
              path="/entertainment"
              element={<News key="entertainment" apikey={this.apikey} pageSize={this.pageSize} country="in" category="entertainment" />}
            />
            <Route
              exact
              path="/general"
              element={<News key="general" apikey={this.apikey} pageSize={this.pageSize} country="in" category="general" />}
            />
            <Route
              exact
              path="/health"
              element={<News key="health" apikey={this.apikey} pageSize={this.pageSize} country="in" category="health" />}
            />
            <Route
              exact
              path="/science"
              element={<News key="science" apikey={this.apikey} pageSize={this.pageSize} country="in" category="science" />}
            />
            <Route
              exact
              path="/sports"
              element={<News key="sports" apikey={this.apikey} pageSize={this.pageSize} country="in" category="sports" />}
            />
            <Route
              exact
              path="/technology"
              element={<News key="technology" apikey={this.apikey} pageSize={this.pageSize} country="in" category="technology" />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
