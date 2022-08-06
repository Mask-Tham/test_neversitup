<template>
  <component :is="componentId"></component>
</template>

<script>
import LayoutBlank from "./layouts/LayoutBlank/LayoutBlank.vue";
import LayoutContent from "./layouts/LayoutContent/LayoutContent.vue";

export default {
  name: "App",
  components: {
    LayoutBlank,
    LayoutContent,
  },
  computed: {
    componentId() {
      if (this.$route.meta.layout == "blank") {
        return "layout-blank";
      }
      return "layout-content";
    },
  },
};
</script>
