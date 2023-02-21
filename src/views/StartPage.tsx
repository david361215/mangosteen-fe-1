import { defineComponent, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../shared/components/Button';
import { Center } from '../shared/components/Center';
import { FloatButton } from '../shared/components/FloatButton';
import { Icon } from '../shared/components/Icon';
import { Overlay } from '../shared/components/Overlay';
import s from './StartPage.module.scss';

export const StartPage = defineComponent({
  setup: (props, context) => {
    const overlayVisible = ref(false)
    const onClickMenu = () => {
      overlayVisible.value = !overlayVisible.value
    }
    return () => (
      <MainLayout>{
        {
          default: () => <>
            <Center class={s.piggy_wrapper}>
              <Icon name="piggy" class={s.piggy} />
            </Center>
            <div class={s.button_wrapper}>
              <RouterLink to="/items/create">
                <Button class={s.button} >开始记账</Button>
              </RouterLink>
            </div>
            <RouterLink to="/items/create">
              <FloatButton iconName='add' />
            </RouterLink>
            {overlayVisible.value &&
              <Overlay onClose={() => { overlayVisible.value = false }} />}
          </>,
          title: () => '山竹记账',
          icon: () => <Icon name="menu" class={s.navIcon} onClick={onClickMenu} />
        }
      }</MainLayout>
    )
  }
})