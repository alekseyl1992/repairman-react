require('normalize.css');
require('styles/App.css');

import React from 'react';
import Header from './Header';
import Input from './Input';
import Button from './Button';
import Output from './Output';
import Reference from './Reference';
import Footer from './Footer';


class App extends React.Component {
  render() {
    return (
      <div className="b-container">
        <Header />
        <Input />
        <Button />
        <Output />
        <Reference />
        <Footer />
      </div>
    );
  }
}

App.defaultProps = {
};

export default App;
