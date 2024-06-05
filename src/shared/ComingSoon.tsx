import { defineComponent, PropType } from 'vue'
import s from './ComingSoon.module.scss'
import { Center } from './components/Center'
import { Icon } from './components/Icon'
export const ComingSoon = defineComponent({
  setup: (props, context) => {
    return () => (
      <div>
        <Center class={s.pig_wrapper}>
          <Icon name="piggy" class={s.pig} />
        </Center>
        <p class={s.text}>敬请期待</p>
      </div>
    )
  }
})
