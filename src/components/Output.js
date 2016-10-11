import React from 'react'

class Output extends React.Component {
  render() {
    const results = [{
      name: 'P0',
      value: 10
    }, {
      name: 'P0',
      value: 10
    }, {
      name: 'P0',
      value: 10
    }, {
      name: 'P0',
      value: 10
    }, {
      name: 'P0',
      value: 10
    }, {
      name: 'P0',
      value: 10
    }, {
      name: 'P0',
      value: 10
    }].map(result => {
      return (<li>{result.name}: {result.value}</li>);
    });

    return (
      <div class="b-output">
        <ul>
          {results}
        </ul>
      </div>
    );
  }
}

export default Output;
