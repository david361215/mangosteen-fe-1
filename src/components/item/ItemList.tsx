import { ItemSummary } from './ItemSummary';
import { defineComponent } from 'vue';
import { TimeTabsLayout } from '../../layouts/TimeTabsLayout';

export const ItemList = defineComponent({
  setup: (props, context) => {
    return () => (
      <TimeTabsLayout component={ItemSummary} />
    )
  }
})