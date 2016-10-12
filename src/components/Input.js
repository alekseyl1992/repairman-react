import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { recalculate } from '../actions';

class Input extends React.Component {
  componentDidMount() {
    this.props.dispatch(recalculate(_.mapValues(this.refs, field => parseFloat(field.value))));
  }

  onButtonClick(e) {
    e.preventDefault();

    let decimal_places = parseInt(this.refs.decimal_places.value);
    if (decimal_places < 0)
      this.refs.decimal_places.value = 0;
    else if (decimal_places > 20)
      this.refs.decimal_places.value = 20;

    this.props.dispatch(recalculate(_.mapValues(this.refs, field => parseFloat(field.value))));
  }

  render() {
    const formFields = [{
      key: 'pc_count',
      label: 'Количество компьютеров (N)',
      value: 15
    }, {
      key: 't_work',
      label: 'Время наработки на отказ (T<sub>но</sub>)',
      value: 600
    }, {
      key: 't_repair',
      label: 'Время восстановления (Т<sub>о</sub>)',
      value: 8
    }, {
      key: 'repairmen_count',
      label: 'Количество ремонтников (C)',
      value: 2
    }, {
      key: 'repairman_salary',
      label: 'Заработная плата ремонтника (S<sub>1</sub>)',
      value: 400
    }, {
      key: 'downtime_cost',
      label: 'Стоимость простоя (S)',
      value: 500
    }, {
      key: 'decimal_places',
      label: 'Число знаков после запятой (D)',
      value: 4
    }].map(field => {
      return (
          <div className="form-group" key={field.key}>
            <label htmlFor={'b-input-form__' + field.key}
                   className="col-sm-6 control-label"
                   dangerouslySetInnerHTML={{__html: field.label}} />
            <div className="col-sm-6">
              <input ref={field.key} type="number" className="form-control" id={'b-input-form__' + field.key} defaultValue={field.value} />
            </div>
          </div>
      );
    });

    return (
      <div className="b-input well text-center">
        <h2>Входные параметры</h2>
        <form className="b-input__form form-horizontal">
          {formFields}
          <button className="btn btn-lg btn-primary" onClick={this.onButtonClick.bind(this)}>Вычислить</button>
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
