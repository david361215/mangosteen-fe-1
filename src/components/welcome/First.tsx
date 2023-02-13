import s from './welcome.module.scss';
import piggy from '../../assets/icons/piggy.svg';
import { FunctionalComponent } from 'vue';

export const First: FunctionalComponent = () => {
  return <div class={s.card}>
    <img src={piggy} />
    <h2>会挣钱<br />还要会省钱</h2>
  </div>
}

First.displayName = 'First'