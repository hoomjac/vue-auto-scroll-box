# vue searchbox mobile

搜索并展示无限滚动列表

## 安装

**yarn:**

```
yarn add vue-searchbox-mobile
```

**npm:**

```
npm install vue-searchbox-mobile
```

## 快速起步

### 全局注册

```javascript
// main.js
import VueSearchBox from 'vue-searchbox-mobile';

Vue.use(VueSearchBox);
```

### 使用

```vue
<template>
  <VueSearchBox
    :dataKey="'id'"
    :dataSources="dataSources"
    :hasMore="hasMore"
    searchPlaceholder="输入药品名搜索"
    @toBottom="loadMore"
    @onItemClick="handleClick"
    @onSearch="handleSearch"
  >
    <template v-slot:handler>
      <Button type="primary">open</Button>
    </template>
    <template v-slot:dataComponent="{ source }">
      <div>{{ source }}</div>
    </template>
    <template v-slot:footer><Loading /></template>
  </VueSearchBox>
</template>

<script>
import Loading from './Loading.vue';

export default {
  name: 'ScrollDemo',
  data() {
    return {
      items: [],
      hasMore: true,
    };
  },
  components: {
    Button,
    Loading,
  },
  methods: {
    loadMore() {
      // 加载更多(分页)数据
      const newData = getData(10);
      this.items = this.items.concat(newData);
    },
    handleClick({ data, closeModal }) {
      console.log('click data:', data);
      console.log('关闭弹窗的方法 -->', closeModal);
    },
    handleSearch(value) {
      console.log('-----search------', value);
      // 拿到搜索词，发起请求
      if (!value) {
        this.items = [];
        return;
      }
      const newData = getData(50);
      this.items = newData;
    },
  },
};
</script>
```

### props 说明

| prop              | 类型               | 描述                                       | 必填 |
| ----------------- | ------------------ | ------------------------------------------ | ---- |
| dataSources       | Array<Object>      | 列表的数据源                               | 是   |
| dataKey           | String ｜ Funcrion | 列表项的 key，需要为列表数据源中的唯一字段 | 是   |
| hasMore           | Boolean            | （分页）数据是否有更多，无数据时传入 false | 是   |
| searchPlaceholder | String             | 搜索框的 Placeholder                       | 否   |

## 无限加载

当列表滚动到底部时，会向上 emit 一个 `toBottom` 事件，在事件处理函数中加载新数据，并拼接到 dataSources 中，没有新的数据时（分页数据结束），把 `hasMore` props 改为 false。通过添加 footer 插槽，在加载数据的时候加 loading 样式，会自动添加到列表底部，没数据时移除插槽。

## slots 插槽说明

### handler

弹出框的触发组件，点击时弹出搜索列表组件。此部分支持自定义，可以传入输入框，按钮等任何东西。点击后自动弹出组件

### dataComponent

自定义搜索结果列表的组件，即搜索出来的每一项长什么样子。渲染时接收 source 作为 slotProps，即当前项数据。

### footer

自定义列表尾部的样式，一般放置一个加载（Loading）图标。列表拉到底部，正在加载数据时显示。

### 事件

### toBottom

列表拉到底部时触发，可在事件处理函数中加载新数据，并拼接到 dataSources 中

### onItemClick

列表项（搜索结果）被点击时，触发的事件，接收的数据是一个对象：

```
{
	data: any, // 被点击项的数据
	closeModal: Fn // 方法，调用关闭弹窗
}
```

### onSearch

用户输入搜索词的时候触发，可在此事件处理函数中触发请求搜索
