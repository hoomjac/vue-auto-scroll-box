<template>
  <div id="app">
    <AutoScrollBox
      :data="[
        { title: '公告1111111111111111111111111111' },
        { title: '公告222222222222222222222222222' },
        { title: '公告3333333333333333' },
        { title: '公告44444444444444444444444444' },
        { title: '公告5555555555555555555555555' },
      ]"
      @click="handleClick"
      itemKeyName="title"
      :height="30"
      :interval="2000"
    >
      <template v-slot:item="{ itemData }">
        <p style="margin: 0" :key="itemData.id">
          {{ itemData.title }}
        </p>
      </template>
    </AutoScrollBox>
  </div>
</template>

<script>
import AutoScrollBox from './components/AutoScrollBox/index.vue';

export default {
  name: 'App',
  data() {
    return {
      items: [],
    };
  },
  components: { AutoScrollBox },
  methods: {
    handleClick(data) {
      console.log(data);
    },
  },
};
</script>
