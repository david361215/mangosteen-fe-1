import { defineComponent, PropType, ref } from 'vue'
import { Icon } from '../../shared/components/Icon'
import { DatetimePicker, Popup } from 'vant'
import { Time } from '../../shared/Time'
import s from './InputPad.module.scss'

export const InputPad = defineComponent({
  props: {
    happenAt: String,
    amount: Number,
    onSubmit: {
      type: Function as PropType<() => void>
    }
  },
  emits: ['update:happenAt', 'update:amount'],
  setup: (props, context) => {
    const refAmount = ref(props.amount ? (props.amount / 100).toString() : '0')
    const refDatePickerVisible = ref(false)
    const showDatePicker = () => (refDatePickerVisible.value = true)
    const hideDatePicker = () => (refDatePickerVisible.value = false)
    const setDate = (date: Date) => {
      context.emit('update:happenAt', date.toISOString())
      hideDatePicker()
    }
    const appendText = (n: number | string) => {
      const nString = n.toString()
      const dotIndex = refAmount.value.indexOf('.')
      if (refAmount.value.length >= 13) {
        return
      }
      if (dotIndex >= 0 && refAmount.value.length - dotIndex > 2) {
        return
      }
      if (dotIndex >= 0 && nString === '.') {
        return
      }
      if (refAmount.value === '0' && '0123456789'.indexOf(nString) >= 0) {
        refAmount.value = nString
        return
      }
      refAmount.value += nString
    }
    const removeText = () => {
      let length = refAmount.value.length
      if (length === 1) {
        refAmount.value = '0'
        return
      }
      refAmount.value = refAmount.value.substring(0, length - 1)
    }
    const buttons = [
      {
        text: '1',
        onclick: () => {
          appendText(1)
        }
      },
      {
        text: '2',
        onclick: () => {
          appendText(2)
        }
      },
      {
        text: '3',
        onclick: () => {
          appendText(3)
        }
      },
      {
        text: '4',
        onclick: () => {
          appendText(4)
        }
      },
      {
        text: '5',
        onclick: () => {
          appendText(5)
        }
      },
      {
        text: '6',
        onclick: () => {
          appendText(6)
        }
      },
      {
        text: '7',
        onclick: () => {
          appendText(7)
        }
      },
      {
        text: '8',
        onclick: () => {
          appendText(8)
        }
      },
      {
        text: '9',
        onclick: () => {
          appendText(9)
        }
      },
      {
        text: '.',
        onclick: () => {
          appendText('.')
        }
      },
      {
        text: '0',
        onclick: () => {
          appendText(0)
        }
      },
      {
        text: '清空',
        onclick: () => {
          refAmount.value = '0'
        }
      },
      {
        text: '提交',
        onclick: () => {
          context.emit('update:amount', parseFloat(refAmount.value) * 100)
          props.onSubmit?.()
        }
      },
      {
        text: '删除',
        onclick: () => {
          removeText()
        }
      }
    ]
    return () => (
      <>
        <div class={s.dateAndAmount}>
          <span class={s.date}>
            <Icon name="date" class={s.icon} />
            <span>
              <span onClick={showDatePicker}>{new Time(props.happenAt).format()}</span>
              <Popup position="bottom" v-model:show={refDatePickerVisible.value}>
                <DatetimePicker
                  modelValue={props.happenAt ? new Date(props.happenAt) : new Date()}
                  type="date"
                  title="选择年月日"
                  onConfirm={setDate}
                  onCancel={hideDatePicker}
                />
              </Popup>
            </span>
          </span>
          <span class={s.amount}>{refAmount.value}</span>
        </div>
        <div class={s.buttons}>
          {buttons.map((button) => (
            <button onClick={button.onclick}>{button.text}</button>
          ))}
        </div>
      </>
    )
  }
})
