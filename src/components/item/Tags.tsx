import { defineComponent, PropType } from 'vue';
import s from './Tags.module.scss';
import { Icon } from '../../shared/components/Icon';
import { uesTags } from '../../shared/useTags';
import { httpClient } from '../../shared/HttpClient';
import { Button } from '../../shared/components/Button';
import { RouterLink } from 'vue-router';

export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<string>,
      required: true,
    },
    selected: Number,
  },
  emits: ['update:selected'],
  setup: (props, context) => {
    const onSelect = (tag: Tag) => {
      context.emit('update:selected', tag.id);
    };
    const { tags, hasMore, fetchTags } = uesTags((page) => {
      return httpClient.get<Resources<Tag>>('/tags', {
        kind: props.kind,
        page: page + 1,
        _mock: 'tagIndex',
      });
    });
    return () => (
      <>
        <div class={s.tags_wrapper}>
          <RouterLink to={`/tags/create?kind=${props.kind}`} class={s.tag}>
            <div class={s.sign}>
              <Icon name="add" class={s.createTag} />
            </div>
            <div class={s.name}>新增</div>
          </RouterLink>
          {tags.value.map((tag) => (
            <div
              class={[s.tag, props.selected === tag.id ? s.selected : '']}
              onClick={() => onSelect(tag)}
            >
              <div class={s.sign}>{tag.sign}</div>
              <div class={s.name}>{tag.name}</div>
            </div>
          ))}
        </div>
        <div class={s.more}>
          {hasMore.value ? (
            <Button class={s.loadMore} onClick={fetchTags}>
              加载更多
            </Button>
          ) : (
            <span class={s.noMore}>没有更多</span>
          )}
        </div>
      </>
    );
  },
});
