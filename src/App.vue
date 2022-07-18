<template>
  <div id="app">
    <AutoScrollBox
      :data="[
        { title: '公告1111111111111111111111111111', id: 'lajkdfl5kjaskl' },
        { title: '公告222222222222222222222222222', id: 'lajkdf33lkjaskl' },
        { title: '公告3333333333333333', id: 'lajkdf3lkj33askl' },
        { title: '公告44444444444444444444444444', id: 'lajkdf44lkjaskl' },
        { title: '公告5555555555555555555555555', id: 'lajk44dflkjaskl' },
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
