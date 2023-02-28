import { defineComponent, PropType, ref } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/components/Icon';
import { Tab, Tabs } from '../../shared/components/Tabs';
import { InputPad } from './InputPad';
import s from './ItemCreate.module.scss';

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const refKind = ref('支出')
    const refExpensesTags = ref([
      { id: 1, name: '餐费', sign: '￥', category: 'expenses' },
      { id: 2, name: '打车', sign: '￥', category: 'expenses' },
      { id: 3, name: '聚餐', sign: '￥', category: 'expenses' },
      { id: 4, name: '打车', sign: '￥', category: 'expenses' },
      { id: 5, name: '聚餐', sign: '￥', category: 'expenses' },
      { id: 6, name: '打车', sign: '￥', category: 'expenses' },
      { id: 7, name: '聚餐', sign: '￥', category: 'expenses' },
      { id: 8, name: '聚餐', sign: '￥', category: 'expenses' },
      { id: 9, name: '打车', sign: '￥', category: 'expenses' },
      { id: 10, name: '聚餐', sign: '￥', category: 'expenses' },
    ])
    const refIncomeTags = ref([
      { id: 11, name: '工资', sign: '￥', category: 'income' },
      { id: 12, name: '彩票', sign: '￥', category: 'income' },
      { id: 13, name: '滴滴', sign: '￥', category: 'income' },
      { id: 14, name: '私活', sign: '￥', category: 'income' },
      { id: 15, name: '朴朴', sign: '￥', category: 'income' },
      { id: 16, name: '美团', sign: '￥', category: 'income' },
      { id: 17, name: '家政', sign: '￥', category: 'income' },
      { id: 18, name: '家教', sign: '￥', category: 'income' },
      { id: 19, name: '黄牛', sign: '￥', category: 'income' },
      { id: 20, name: '创业', sign: '￥', category: 'income' },
      { id: 11, name: '工资', sign: '￥', category: 'income' },
      { id: 12, name: '彩票', sign: '￥', category: 'income' },
      { id: 13, name: '滴滴', sign: '￥', category: 'income' },
      { id: 14, name: '私活', sign: '￥', category: 'income' },
      { id: 15, name: '朴朴', sign: '￥', category: 'income' },
      { id: 16, name: '美团', sign: '￥', category: 'income' },
      { id: 17, name: '家政', sign: '￥', category: 'income' },
      { id: 18, name: '家教', sign: '￥', category: 'income' },
      { id: 19, name: '黄牛', sign: '￥', category: 'income' },
      { id: 20, name: '创业', sign: '￥', category: 'income' },
      { id: 11, name: '工资', sign: '￥', category: 'income' },
      { id: 12, name: '彩票', sign: '￥', category: 'income' },
      { id: 13, name: '滴滴', sign: '￥', category: 'income' },
      { id: 14, name: '私活', sign: '￥', category: 'income' },
      { id: 15, name: '朴朴', sign: '￥', category: 'income' },
      { id: 16, name: '美团', sign: '￥', category: 'income' },
      { id: 17, name: '家政', sign: '￥', category: 'income' },
      { id: 18, name: '家教', sign: '￥', category: 'income' },
      { id: 19, name: '黄牛', sign: '￥', category: 'income' },
      { id: 20, name: '创业', sign: '￥', category: 'income' },
      { id: 11, name: '工资', sign: '￥', category: 'income' },
      { id: 12, name: '彩票', sign: '￥', category: 'income' },
      { id: 13, name: '滴滴', sign: '￥', category: 'income' },
      { id: 14, name: '私活', sign: '￥', category: 'income' },
      { id: 15, name: '朴朴', sign: '￥', category: 'income' },
      { id: 16, name: '美团', sign: '￥', category: 'income' },
      { id: 17, name: '家政', sign: '￥', category: 'income' },
      { id: 18, name: '家教', sign: '￥', category: 'income' },
      { id: 19, name: '黄牛', sign: '￥', category: 'income' },
      { id: 20, name: '创业', sign: '￥', category: 'income' },
    ])
    return () => (
      <MainLayout>{
        {
          title: () => '记一笔',
          icon: () => <Icon name="left" class={s.navIcon} />,
          default: () => <>
            <div class={s.wrapper}>
              <Tabs v-model:selected={refKind.value} class={s.tabs}>
                <Tab name="支出" class={s.tags_wrapper}>
                  <div class={s.tag}>
                    <div class={s.sign}>
                      <Icon name="add" class={s.createTag} />
                    </div>
                    <div class={s.name}>
                      新增
                    </div>
                  </div>
                  {refExpensesTags.value.map(tag =>
                    <div class={[s.tag, s.selected]}>
                      <div class={s.sign}>
                        {tag.sign}
                      </div>
                      <div class={s.name}>
                        {tag.name}
                      </div>
                    </div>
                  )}
                </Tab>
                <Tab name="收入" class={s.tags_wrapper}>
                  <div class={s.tag}>
                    <div class={s.sign}>
                      <Icon name="add" class={s.createTag} />
                    </div>
                    <div class={s.name}>
                      新增
                    </div>
                  </div>
                  {refIncomeTags.value.map(tag =>
                    <div class={[s.tag, s.selected]}>
                      <div class={s.sign}>
                        {tag.sign}
                      </div>
                      <div class={s.name}>
                        {tag.name}
                      </div>
                    </div>
                  )}
                </Tab>
              </Tabs>
              <div class={s.inputPad_wrapper}>
                <InputPad />
              </div>
            </div>
          </>
        }
      }</MainLayout>
    )
  }
})