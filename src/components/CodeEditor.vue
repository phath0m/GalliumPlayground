<script setup>
  import ace from "brace";
  import { defineEmits, defineProps, watch, ref, onMounted } from "vue";

  const props = defineProps({ modelValue: String });
  const editor = ref(null);
  const emit = defineEmits(["update:modelValue"]);

  onMounted(() => {
    const theme = "tomorrow_night";
    require("../gallium.ace_highlighting.js");
    require(`brace/theme/${theme}`);
    const editorInstance = ace.edit(editor.value);
    editorInstance.setShowPrintMargin(false);
    editorInstance.getSession().setMode("ace/mode/gallium");
    editorInstance.setTheme(`ace/theme/${theme}`);
    editorInstance.setValue(props.modelValue);
    editorInstance.on('change', () => {
      emit("update:modelValue", editorInstance.getValue());
    });

    watch(() => props.modelValue, () => {
      /* prevent feedback loop. */
      if (props.modelValue !== editorInstance.getValue())
        editorInstance.setValue(props.modelValue);
    });
  });
</script>

<style scoped>
  .editor {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>

<template>
  <div class="editor" ref="editor" />
</template>