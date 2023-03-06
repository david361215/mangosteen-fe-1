import { defineComponent, PropType, reactive } from 'vue';
import { Form, FormItem } from '../../shared/components/Form';
import { Button } from '../../shared/components/Button';
import { EmojiSelect } from '../../shared/components/EmojiSelect';
import { Rules, validate } from '../../shared/validate';
import s from './Tag.module.scss';
export const TagForm = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const formData = reactive({
      name: '',
      sign: '',
    })
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})
    const onSubmit = (e: Event) => {
      const rules: Rules<typeof formData> = [
        { key: 'name', type: 'required', message: '必填' },
        { key: 'name', type: 'pattern', regex: /^[\u4e00-\u9fa5]{1,4}$/, message: '只能填 1 到 4 个汉字' },
        { key: 'sign', type: 'required', message: '必填' },
      ]
      //清空 errors，否则每次都展示同样内容
      Object.assign(errors, {
        name: undefined,
        sign: undefined
      })
      //因为 errors 是常量，所以不能直接把 validate(formData, rules) 赋值给 errors
      Object.assign(errors, validate(formData, rules))
      //取消提交表单
      e.preventDefault()
    }
    return () => (
      <Form onSubmit={onSubmit}>
        <FormItem
          label='标签名'
          type='text'
          v-model={formData.name}
          error={errors['name'] ? errors['name'][0] : '　'} />
        <FormItem
          label={'符号' + formData.sign}
          type='emojiSelect'
          v-model={formData.sign}
          error={errors['sign'] ? errors['sign'][0] : '　'} />
        <FormItem>
          <p class={s.tips}>记账时长按标签即可进行编辑</p>
        </FormItem>
        <FormItem>
          <Button class={s.button}>确定</Button>
        </FormItem>
      </Form>
    )
  }
})

