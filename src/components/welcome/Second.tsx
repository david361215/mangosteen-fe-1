import s from './welcome.module.scss';
import alarm from '../../assets/icons/alarm.svg';
import { FunctionalComponent } from 'vue';

export const Second: FunctionalComponent = () => {
  return <div class={s.card}>
    <img src={alarm} />
    <h2>每日提醒<br />不会遗漏每一笔账单</h2>
  </div>
}

Second.displayName = 'Second'