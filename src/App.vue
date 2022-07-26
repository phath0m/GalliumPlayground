<script setup>
  import axios from "axios";
  import Gallium from "@/gallium";
  import CodeEditor from "@/components/CodeEditor";
  import XTerm from "@/components/XTerm";
  import useExamples from "./gallium.examples.js";
  import { ref, watch } from "vue";

  const gallium = new Gallium();
  const outputElem = ref(null);
  const code = ref('puts("Hello, World!")');
  const examples = useExamples();
  const example = ref(examples.value[0].url);
  const runCode = () => gallium.doString(code.value);
  
  watch(() => example.value, async () => {
    console.log(example.value);
    const resp = await axios.get(example.value);
    code.value = resp.data;
  }, { immediate: true });

  gallium.on('print', (text) => outputElem.value.write(text));
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: 100%;
  }

  .code-editor {
    flex-grow: 1;
    padding: 0px 10px 20px;
  }

  .button-area {
    padding: 10px 40px 10px;
    flex-shrink: 1;
    max-height: 40px;
  }

  .output-pane {
    padding: 0px 10px 20px;
    flex-shrink: 1;
  }
</style>

<template>
  <v-app>
      <v-app-bar
        color="deep-purple accent-4"
        dense
        dark
      >
        <v-toolbar-title>
          Gallium Playground
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon>
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main fill-height>
        <div class="container">
          <div class="code-editor">
            <CodeEditor v-model="code" />
          </div>
          <div class="button-area">
            <v-btn @click="runCode()">
              <v-icon>mdi-play</v-icon>
              Run
            </v-btn>
            &nbsp;
            <v-btn @click="outputElem.clear()">
              <v-icon>mdi-refresh</v-icon>
              Clear
            </v-btn>
            <v-select
              class="float-right"
              label="Examples"
              density="compact"
              v-model="example"
              item-title="name"
              item-value="url"
              :items="examples">
            </v-select>
          </div>
          <div class="output-pane">
            <p class="text-center">
              Output
            </p>
            <XTerm ref="outputElem" />
          </div>
        </div>
    </v-main>
  </v-app>
</template>