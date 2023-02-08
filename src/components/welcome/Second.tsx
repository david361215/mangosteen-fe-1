import s from './WelcomeLayout.module.scss';
import alarm from '../../assets/icons/alarm.svg';
import { RouterLink } from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';

export const Second = () => (
  <WelcomeLayout>
    {{
      icon: () => <img src={alarm} />,
      title: () => <h2>每日提醒<br />不会遗漏每一笔账单</h2>,
      buttons: () => <>
        <RouterLink class={s.fake} to='/start'>跳过</RouterLink>
        <RouterLink to='/welcome/3'>下一页</RouterLink>
        <RouterLink to='/start'>跳过</RouterLink>
      </>
    }}
  </WelcomeLayout>
)

Second.displayName = 'Second'