import { faker } from '@faker-js/faker'
import { AxiosRequestConfig } from 'axios'

type Mock = (config: AxiosRequestConfig) => [number, any]

faker.setLocale('zh_CN')

export const mockItemSummary: Mock = (config) => {
  const { group_by, kind } = config.params
  if (group_by === 'happened_at' && kind === 'expense') {
    return [
      200,
      {
        groups: [
          { happened_at: '2024-08-18T00:00:00.000+0800', amount: 100 },
          { happened_at: '2024-08-22T00:00:00.000+0800', amount: 300 },
          { happened_at: '2024-08-29T00:00:00.000+0800', amount: 200 }
        ],
        total: 600
      }
    ]
  } else if (group_by === 'happened_at' && kind === 'income') {
    return [
      200,
      {
        groups: [
          { happened_at: '2024-08-08T00:00:00.000+0800', amount: 100 },
          { happened_at: '2024-08-12T00:00:00.000+0800', amount: 300 },
          { happened_at: '2024-08-19T00:00:00.000+0800', amount: 200 }
        ],
        total: 600
      }
    ]
  } else if (group_by === 'tag_id' && kind === 'expense') {
    return [
      200,
      {
        groups: [
          { tag_id: 1, tag: { id: 1, name: '交通', sign: faker.internet.emoji() }, amount: 100 },
          { tag_id: 2, tag: { id: 2, name: '吃饭', sign: faker.internet.emoji() }, amount: 300 },
          { tag_id: 3, tag: { id: 3, name: '购物', sign: faker.internet.emoji() }, amount: 200 }
        ],
        total: 600
      }
    ]
  } else {
    return [
      200,
      {
        groups: [
          { tag_id: 1, tag: { id: 1, name: '交通', sign: faker.internet.emoji() }, amount: 400 },
          { tag_id: 2, tag: { id: 2, name: '吃饭', sign: faker.internet.emoji() }, amount: 300 },
          { tag_id: 3, tag: { id: 3, name: '购物', sign: faker.internet.emoji() }, amount: 200 }
        ],
        total: 900
      }
    ]
  }
}
export const mockItemIndexBalance: Mock = (config) => {
  return [
    200,
    {
      expense: 9900,
      income: 9900,
      balance: 0
    }
  ]
}

export const mockItemIndex: Mock = (config) => {
  const { kind, page } = config.params
  const per_page = 25
  const count = 26
  const createPager = (page = 1) => ({
    page,
    per_page,
    count
  })
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: 'expense',
    ...attrs
  })
  const createItem = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(
      () =>
        ({
          id: createId(),
          user_id: createId(),
          amount: Math.floor(Math.random() * 10000),
          tag_ids: [createId()],
          tags: [createTag()],
          happened_at: faker.date.past().toISOString(),
          kind: config.params.kind
        }) as Item
    )
  const createBody = (n = 1, attrs?: any) => ({
    resources: createItem(n),
    pager: createPager(page)
  })
  if (!page || page === 1) {
    return [200, createBody(25)]
  } else if (page === 2) {
    return [200, createBody(1)]
  } else {
    return [200, {}]
  }
}
export const mockTagShow: Mock = (config) => {
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: 'expense',
    ...attrs
  })
  return [200, { resource: createTag() }]
}

export const mockItemCreate: Mock = (config) => {
  return [
    200,
    {
      resource: {
        id: 2264,
        user_id: 1312,
        amount: 9900,
        note: null,
        tag_ids: [3508],
        happened_at: '2020-10-29T16:00:00.000Z',
        created_at: '2022-07-03T15:35:56.301Z',
        updated_at: '2022-07-03T15:35:56.301Z',
        kind: 'expense'
      } as Item
    }
  ]
}

export const mockTagEdit: Mock = (config) => {
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: 'expense',
    ...attrs
  })
  return [200, { resource: createTag() }]
}

export const mockTagCreate: Mock = (config) => {
  return [
    200,
    {
      resource: {
        id: 141,
        user_id: 75,
        name: 'x',
        sign: 'x',
        kind: 'expense',
        deleted_at: null,
        created_at: '2024-05-16T08:31:20.635Z',
        updated_at: '2024-05-16T08:31:20.635Z'
      }
    }
  ]
}

export const mockSession: Mock = (config) => {
  return [
    200,
    {
      jwt: faker.random.word()
    }
  ]
}

let id = 0
const createId = () => {
  id += 1
  return id
}

export const mockTagIndex: Mock = (config) => {
  const { kind, page } = config.params
  const per_page = 25
  const count = 26

  const createPager = (page = 1) => ({
    page,
    per_page,
    count
  })
  const createTag = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: config.params.kind,
      ...attrs
    }))
  const createBody = (n = 1, attrs?: any) => ({
    resources: createTag(n),
    pager: createPager(page)
  })
  if (kind === 'expense' && (!page || page === 1)) {
    return [200, createBody(24)]
  } else if (kind === 'expense' && page === 2) {
    return [200, createBody(1)]
  } else if (kind === 'income' && (!page || page === 1)) {
    return [200, createBody(24)]
  } else {
    return [200, createBody(1)]
  }
}
