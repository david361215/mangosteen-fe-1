import { defineComponent, onMounted, PropType, reactive, ref } from 'vue'
import { MainLayout } from '../../layouts/MainLayout'
import { Tab, Tabs } from '../../shared/components/Tabs'
import { InputPad } from './InputPad'
import s from './ItemCreate.module.scss'
import { Tags } from './Tags'
import { useRouter } from 'vue-router'
import { AxiosError } from 'axios'
import { Dialog } from 'vant'
import { httpClient } from '../../shared/HttpClient'
import { BackIcon } from '../../shared/BackIcon'

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const formData = reactive({
      kind: '支出',
      tags_id: [],
      amount: 0,
      happen_at: new Date().toISOString()
    })
    const router = useRouter()
    const onError = (error: AxiosError<ResourceError>) => {
      if (error.response?.status === 422) {
        Dialog.alert({
          title: '出错',
          message: Object.values(error.response.data.errors).join('\n')
        })
      }
      throw error
    }
    const onSubmit = async () => {
      await httpClient
        .post<Resource<Item>>('/items', formData, { _mock: 'itemCreate', _autoLoading: true })
        .catch(onError)
      router.push('/items')
    }
    return () => (
      <MainLayout>
        {{
          title: () => '记一笔',
          icon: () => <BackIcon />,
          default: () => (
            <>
              <div class={s.wrapper}>
                <Tabs v-model:selected={formData.kind} class={s.tabs}>
                  <Tab name="支出">
                    <Tags kind="expenses" v-model:selected={formData.tags_id[0]} />
                  </Tab>
                  <Tab name="收入">
                    <Tags kind="income" v-model:selected={formData.tags_id[0]} />
                  </Tab>
                </Tabs>
                <div class={s.inputPad_wrapper}>
                  <InputPad
                    v-model:happenAt={formData.happen_at}
                    v-model:amount={formData.amount}
                    onSubmit={onSubmit}
                  />
                </div>
              </div>
            </>
          )
        }}
      </MainLayout>
    )
  }
})
