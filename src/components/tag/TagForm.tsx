import { defineComponent, onMounted, PropType, reactive } from 'vue'
import { Form, FormItem } from '../../shared/components/Form'
import { Button } from '../../shared/components/Button'
import { hasError, Rules, validate } from '../../shared/validate'
import s from './Tag.module.scss'
import { useRoute, useRouter } from 'vue-router'
import { httpClient } from '../../shared/HttpClient'
import { onFormError } from '../../shared/onFormError'
export const TagForm = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    },
    id: Number
  },
  setup: (props, context) => {
    const route = useRoute()
    const router = useRouter()
    const formData = reactive<Partial<Tag>>({
      id: undefined,
      name: '',
      sign: '',
      kind: route.query.kind!.toString()
    })
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})
    const onSubmit = async (e: Event) => {
      //取消提交表单
      e.preventDefault()
      const rules: Rules<typeof formData> = [
        { key: 'name', type: 'required', message: '必填' },
        {
          key: 'name',
          type: 'pattern',
          regex: /^[\u4e00-\u9fa5]{1,4}$/,
          message: '只能填 1 到 4 个汉字'
        },
        { key: 'sign', type: 'required', message: '必填' }
      ]
      //清空 errors，否则每次都展示同样内容
      Object.assign(errors, {
        name: [],
        sign: []
      })
      //因为 errors 是常量，所以不能直接把 validate(formData, rules) 赋值给 errors
      Object.assign(errors, validate(formData, rules))
      if (!hasError(errors)) {
        const promise = (await formData.id)
          ? httpClient.patch(`/tags/${formData.id}`, formData, {
              _mock: 'tagEdit',
              _autoLoading: true
            })
          : httpClient.post('/tags', formData, {
              _mock: 'tagCreate',
              _autoLoading: true
            })
        await promise.catch((error) => onFormError(error, (data) => Object.assign(errors, data.errors)))
        router.back()
      }
    }
    onMounted(async () => {
      if (!props.id) {
        return
      }
      const response = await httpClient.get<Resource<Tag>>(
        `/tags/${props.id}`,
        {},
        {
          _mock: 'tagShow'
        }
      )
      Object.assign(formData, response.data.resource)
    })
    return () => (
      <Form onSubmit={onSubmit}>
        <FormItem label="标签名（最多 4 个字符）" type="text" v-model={formData.name} error={errors['name']?.[0]} />
        <FormItem
          label={'符号' + formData.sign}
          type="emojiSelect"
          v-model={formData.sign}
          error={errors['sign']?.[0]}
        />
        <FormItem>
          <p class={s.tips}>记账时长按标签即可进行编辑</p>
        </FormItem>
        <FormItem>
          <Button type="submit" class={s.button}>
            确定
          </Button>
        </FormItem>
      </Form>
    )
  }
})
