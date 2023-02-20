import { defineComponent, ref } from 'vue';
import { Button } from '../shared/components/Button';
import { Center } from '../shared/components/Center';
import { FloatButton } from '../shared/components/FloatButton';
import { Icon } from '../shared/components/Icon';
import { Navbar } from '../shared/components/Navbar';
import { Overlay } from '../shared/components/Overlay';
import s from './StartPage.module.scss';

export const StartPage = defineComponent({
  setup: (props, context) => {
    const overlayVisible = ref(false)
    const onClickMenu = () => {
      overlayVisible.value = !overlayVisible.value
    }
    return () => (
      <div>
        <Navbar>{
          {
            default: () => '山竹记账',
            icon: () => <Icon name="menu" class={s.navIcon} onClick={onClickMenu} />
          }
        }</Navbar>
        <Center class={s.piggy_wrapper}>
          <Icon name="piggy" class={s.piggy} />
        </Center>
        <div class={s.button_wrapper}>
          <Button class={s.button} >开始记账</Button>
        </div>
        <FloatButton iconName='add' />
        {overlayVisible.value &&
          <Overlay onClose={() => { overlayVisible.value = false }} />}
      </div>
    )
  }
})