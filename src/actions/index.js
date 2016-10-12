import math from 'mathjs';
import config from 'config';
import _ from 'lodash';

export const RECALCULATE = 'RECALCULATE';

export const recalculate = (params) => {
  var parser = math.parser();

  // create a shortcut for all math functions
  const m = parser.eval.bind(parser);
  const g = parser.get.bind(parser);

  let d = _.noop;
  if (config.appEnv == 'dev')
    d = v => console.log(v, parser.get(v));  // eslint-disable-line no-console

  const getMathValue = name => {
    return parser.get(name).toFixed(params.decimal_places);
  }

  parser.set('N', params.pc_count);
  parser.set('C', params.repairmen_count);

  parser.set('t_no', params.t_work);
  parser.set('t_0', params.t_repair);

  parser.set('repairman_salary', params.repairman_salary);
  parser.set('downtime_cost', params.downtime_cost);

  parser.set('range_sum', (start, end, func) => {
    let sum = 0;
    for (let i = start; i < end + 1; i++) {
      sum += func(i);
    }
    return sum;
  });

  m('mu_no = 1/t_no');
  m('mu_0 = 1/t_0');

  m('psi = mu_no/mu_0');
  // 4.2
  m('Pk1(k) = (N!*psi^k)/(k!*(N-k)!)');

  // 4.3
  m('Pk2(k) = (N!*psi^k)/(C^(k-C)*C!*(N-k)!)');

  // 4.1
  m('P_0 = (range_sum(0, C, Pk1) + range_sum(C+1, N, Pk2))^(-1)')
  d('P_0');

  // 4.2, 4.3
  parser.set('Pk', (k) => {
      if (k <= m('C')) {
          return g('Pk1')(k) * g('P_0');
      } else {
          return g('Pk2')(k) * g('P_0');
      }
  })

  // 4.4
  m('k_C(k) = (k-C) * Pk(k)')
  m('Q = range_sum(C, N, k_C)')
  d('Q');

  // 4.5
  m('kPk(k) = k * Pk(k)');
  m('L = range_sum(1, N, kPk)');
  d('L');

  // 4.6
  m('U = L - Q');
  d('U');

  // 4.7
  m('ro_0 = U/C');
  d('ro_0');

  // 4.11
  m('Tp = (L * t_no) / (N - L)')
  d('Tp');

  //4.12
  m('W = Tp - t_0')
  d('W');

  // 4.13
  m('Tc = Tp + t_no')
  d('Tc');

  // 4.14
  m('ro_e = t_no/Tc')
  d('ro_e');

  // 4.15
  m('n = N - L')
  d('n');

  // 4.19
  m('load_koef = ro_e / ro_0');
  d('load_koef');

  m('losses = C * repairman_salary + L * downtime_cost');
  d('losses');

  return {
    type: RECALCULATE,
    data: [{
      key: 'P_0',
      label: 'Вероятность состояния (P<sub>0</sub>)',
      value: getMathValue('P_0')
    }, {
      key: 'Q',
      label: 'Заявок в очереди (Q)',
      value: getMathValue('Q')
    }, {
      key: 'L',
      label: 'Заявок в системе (L)',
      value: getMathValue('L')
    }, {
      key: 'U',
      label: 'Коэфициент использования (U)',
      value: getMathValue('U')
    }, {
      key: 'ro_0',
      label: 'Загрузка ремонтника (ρ<sub>0</sub>)',
      value: getMathValue('ro_0')
    }, {
      key: 'n',
      label: 'Работающих компьютеров (n)',
      value: getMathValue('n')
    }, {
      key: 'ro_e',
      label: 'Коэфициент готовности (ρ<sub>e</sub>)',
      value: getMathValue('ro_e')
    }, {
      key: 'W',
      label: 'Время ожидания (W)',
      value: getMathValue('W')
    }, {
      key: 'Tp',
      label: 'Время ремонта (T<sub>р</sub>)',
      value: getMathValue('Tp')
    }, {
      key: 'Tc',
      label: 'Время цикла (T<sub>ц</sub>)',
      value: getMathValue('Tc')
    }, {
      key: 'load_koef',
      label: 'Коэфициент загрузки (ρ<sub>e</sub> / ρ<sub>ц</sub>)',
      value: getMathValue('load_koef')
    }, {
      key: 'losses',
      label: 'Убытки (Y)',
      value: getMathValue('losses')
    }]
  }
}
