import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { recalculate } from '../actions';

class Input extends React.Component {
  onButtonClick(e) {
    e.preventDefault();
    this.props.dispatch(recalculate(_.mapValues(this.refs, field => parseFloat(field.value))));
  }

  render() {
    const formFields = [{
      key: 'pc_count',
      label: 'Количество компьютеров (N)',
      value: 10
    }, {
      key: 't_work',
      label: 'Время наработки на отказ (Tно)',
      value: 10
    }, {
      key: 't_repair',
      label: 'Время восстановления (То)',
      value: 10
    }, {
      key: 'repairmen_count',
      label: 'Количество ремонтников (C)',
      value: 10
    }].map(field => {
      return (
          <div className="form-group" key={field.key}>
            <label htmlFor={'b-input-form__' + field.key} className="col-sm-6 control-label">{field.label}</label>
            <div className="col-sm-6">
              <input ref={field.key} type="number" className="form-control" id={'b-input-form__' + field.key} defaultValue={field.value} />
            </div>
          </div>
      );
    });

    return (
      <div className="b-input well">
        <h2>Входные параметры:</h2>
        <form className="b-input__form form-horizontal">
          {formFields}
          <button className="btn btn-primary" onClick={this.onButtonClick.bind(this)}>Вычислить</button>
        </form>
      </div>
    )
  }
}

Input.propTypes = {
  dispatch: PropTypes.func.isRequired
}

Input = connect()(Input)

export default Input;
