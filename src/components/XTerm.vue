<script setup>
  import { defineEmits, defineExpose, ref, onMounted } from "vue";
  import { Terminal } from "xterm";

  import("xterm/css/xterm.css");

  const terminalElem = ref(null);
  const terminal = new Terminal({
    rows: 12,
    theme: {
      background: '#1d1f21'
    }
  });
  const emit = defineEmits(["key"]); 

  onMounted(() => {
    terminal.open(terminalElem.value);
    terminal.onKey((ev) => {
      emit("key", ev.key.charCodeAt(0));
      if (ev.key.charCodeAt(0) == 13) {
        terminal.write("\n");
      }
      terminal.write(ev.key);
    });
  });

  const write = (text) => terminal.write(text);
  const clear = () => terminal.clear();

  defineExpose({ clear, write });
</script>

<template>
  <div ref="terminalElem" />
</template>