import React from 'react'

class Input extends React.Component {
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
            <label htmlFor={'b-input-form__' + field.key} className="col-sm-2 control-label">{field.label}</label>
            <div className="col-sm-10">
              <input ref={field.key} type="number" className="form-control" id={'b-input-form__' + field.key} defaultValue={field.value} />
            </div>
          </div>
      );
    });

    return (
      <div className="b-input">
        <form className="b-input__form form-horizontal">
          {formFields}
        </form>
      </div>
    )
  }
}

export default Input;
