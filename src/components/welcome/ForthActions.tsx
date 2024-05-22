import s from './welcome.module.scss';
import { FunctionalComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { SkipFeatures } from '../../shared/SkipFeatures';
const onclick = () => {
  localStorage.setItem('skipFeatures', 'yes')
}
export const ForthActions: FunctionalComponent = () => {
  return <div class={s.actions}>
    <SkipFeatures class={s.fake} />
    <span onClick={onclick}>
      <RouterLink to='/start'>开启应用</RouterLink>
    </span>
    <SkipFeatures class={s.fake} />
  </div>
}

ForthActions.displayName = 'ForthActions'