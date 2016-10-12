import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class Output extends React.Component {
  render() {
    const formFields = this.props.results.map(field => (
      <div className="form-group" key={field.key}>
        <label htmlFor={'b-output-form__' + field.key}
               className="col-sm-6 control-label"
               dangerouslySetInnerHTML={{__html: field.label}}></label>
        <div className="col-sm-6">
          <input ref={field.key}
                 type="number"
                 className="form-control"
                 id={'b-output-form__' + field.key}
                 value={field.value}
                 readOnly="true" />
        </div>
      </div>
    ));

    return (
      <div className="b-output well text-center">
        <h2>Результаты</h2>
        <form className="b-output__form form-horizontal">
          {formFields}
        </form>
      </div>
    );
  }
}

Output.propTypes = {
  results: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    results: state.updateResults.results || []
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

Output = connect(mapStateToProps, mapDispatchToProps)(Output);

export default Output;
