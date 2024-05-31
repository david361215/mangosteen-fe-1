import { defineComponent } from 'vue'
import { Button } from '../../shared/components/Button'
import { MainLayout } from '../../layouts/MainLayout'
import { TagForm } from './TagForm'
import { BackIcon } from '../../shared/BackIcon'
import s from './Tag.module.scss'
import { useRoute } from 'vue-router'
export const TagEdit = defineComponent({
  setup: (props, context) => {
    const route = useRoute()
    const numberId = parseInt(route.params.id!.toString())
    if (Number.isNaN(numberId)) {
      return () => <div>id 不存在</div>
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
                <Button level="danger" class={s.removeTags} onClick={() => {}}>
                  删除标签
                </Button>
                <Button
                  level="danger"
                  class={s.removeTagsAndItems}
                  onClick={() => {}}
                >
                  删除标签和记账
                </Button>
              </div>
            </>
          ),
        }}
      </MainLayout>
    )
  },
})
