window.jQuery = require('jquery');
require('bootstrap-webpack');
require('normalize.css');
require('styles/App.css');

import React from 'react';
import Header from './Header';
import Input from './Input';
import Output from './Output';
import Reference from './Reference';
import Footer from './Footer';


class App extends React.Component {
  render() {
    return (
      <div className="b-container container-fluid">
        <Header />
        <div className="row">
          <div className="col-md-6">
            <Input />
          </div>
          <div className="col-md-6">
            <Output />
          </div>
        </div>
        <Reference />
        <Footer />
      </div>
    );
  }
}

App.defaultProps = {
};

export default App;
