import { defineComponent, PropType } from 'vue'
import s from './ComingSoon.module.scss'
import { Center } from './components/Center'
import { Icon } from './components/Icon'
import { Button } from './components/Button'
import { useRouter } from 'vue-router'
export const ComingSoon = defineComponent({
  setup: (props, context) => {
    const router = useRouter()
    const onClick = () => {
      router.back()
    }
    return () => (
      <div>
        <Center class={s.pig_wrapper}>
          <Icon name="piggy" class={s.pig} />
        </Center>
        <p class={s.text}>敬请期待</p>
        <p class={s.link}>
          <Button onClick={onClick}>返回</Button>
        </p>
      </div>
    )
  }
})
