import { defineComponent, reactive } from 'vue';
import { Button } from '../../shared/components/Button';
import { Icon } from '../../shared/components/Icon';
import { MainLayout } from '../../layouts/MainLayout';
import { Rules, validate } from '../../shared/validate';
import { TagForm } from './TagForm';
import s from './Tag.module.scss';
export const TagEdit = defineComponent({
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
      <MainLayout>{{
        title: () => '标签详情',
        icon: () => <Icon name="left" />,
        default: () => <>
          <TagForm />
          <div class={s.actions}>
            <Button level='danger' class={s.removeTags} onClick={() => { }}>删除标签</Button>
            <Button level='danger' class={s.removeTagsAndItems} onClick={() => { }}>删除标签和记账</Button>
          </div>
        </>
      }}</MainLayout>
    )
  }
})