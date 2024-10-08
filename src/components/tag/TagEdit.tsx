import { defineComponent } from 'vue'
import { Button } from '../../shared/components/Button'
import { MainLayout } from '../../layouts/MainLayout'
import { TagForm } from './TagForm'
import { BackIcon } from '../../shared/BackIcon'
import s from './Tag.module.scss'
import { useRoute, useRouter } from 'vue-router'
import { httpClient } from '../../shared/HttpClient'
import { Dialog } from 'vant'
export const TagEdit = defineComponent({
  setup: (props, context) => {
    const route = useRoute()
    const numberId = parseInt(route.params.id!.toString())
    if (Number.isNaN(numberId)) {
      return () => <div>id 不存在</div>
    }
    const router = useRouter()
    const onError = () => {
      Dialog.alert({ title: '提示', message: '删除失败' })
    }
    const onDelete = async () => {
      await Dialog.confirm({
        title: '确认',
        message: '你真的要删除吗？'
      })
      await httpClient
        .delete(
          `/tags/${numberId}`,{},
          { _autoLoading: true }
        )
        .catch(onError)
      router.back()
    }
    return () => (
      <MainLayout>
        {{
          title: () => '标签详情',
          icon: () => <BackIcon />,
          default: () => (
            <>
              <TagForm id={numberId} />
              <div class={s.actions}>
                <Button level="danger" class={s.removeTagsAndItems} onClick={() => onDelete()}>
                  删除标签（对应记账也会被删除）
                </Button>
              </div>
            </>
          )
        }}
      </MainLayout>
    )
  }
})
