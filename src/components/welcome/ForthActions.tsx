import s from './welcome.module.scss';
import { FunctionalComponent } from 'vue';
import { RouterLink } from 'vue-router';

export const ForthActions: FunctionalComponent = () => {
  return <div class={s.actions}>
    <RouterLink class={s.fake} to='/start'>跳过</RouterLink>
    <RouterLink to='/start'>开启应用</RouterLink>
    <RouterLink class={s.fake} to='/start'>跳过</RouterLink>
  </div>
}

ForthActions.displayName = 'ForthActions'