import { defineComponent, ref } from "vue";

export const App = defineComponent({
  setup() {
    const redCount = ref(0)
    const onClick = () => {
      redCount.value +=1
    }
    return () => <>
      <div>
        {redCount.value}
      </div>
      <div>
        <button onClick={onClick}>+1</button>
      </div>
    </>
  }
})