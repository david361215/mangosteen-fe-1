import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { MainLayout } from '../layouts/MainLayout'
import { Button } from '../shared/components/Button'
import { Center } from '../shared/components/Center'
import { FloatButton } from '../shared/components/FloatButton'
import { Icon } from '../shared/components/Icon'
import { OverlayIcon } from '../shared/components/Overlay'
import s from './StartPage.module.scss'

export const StartPage = defineComponent({
  setup: (props, context) => {
    return () => (
      <MainLayout>
        {{
          title: () => '山竹记账',
          icon: () => <OverlayIcon />,
          default: () => (
            <>
              <Center class={s.piggy_wrapper}>
                <Icon name="piggy" class={s.piggy} />
              </Center>
              <div class={s.button_wrapper}>
                <RouterLink to="/items/create">
                  <Button class={s.button}>开始记账</Button>
                </RouterLink>
              </div>
              <RouterLink to="/items/create">
                <FloatButton iconName="add" />
              </RouterLink>
            </>
          )
        }}
      </MainLayout>
    )
  }
})
