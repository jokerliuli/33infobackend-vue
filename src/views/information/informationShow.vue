<template>
  <div>
    <div id="html" v-html="compiledMarkdown"/>
  </div>
</template>

<script>
const marked = require('marked')
const hljs = require('highlight.js')
import 'highlight.js/styles/default.css'
import 'codemirror/lib/codemirror.css' // codemirror
import 'tui-editor/dist/tui-editor.css' // editor ui
import 'tui-editor/dist/tui-editor-contents.css' // editor content

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code, true).value
    } else {
      return hljs.highlightAuto(code).value
    }
  }
})

export default {
  name: 'InformationShow',

  data() {
    return {
      value: '![image.png](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAATCAYAAABFnvn4AAAEAklEQVRoBe2YbW7qOBSGnzuaNRgktuCiW7ZABVlElVVEWYTlVVgsIqCyhbai3gISeBMd2fnACYH2Tu9o1Fz4ZU6Oj32+3+Mf7+/v79x+g7PAX4PT6KZQsMDNsQMNhJtjb44dqAUGqtbfvXq5LVqvcb0fLxElqUqR4bNjqzX7RJGWhGiTxeQFkyxjLiJytHRPGv16T5bNiVkCfQPLK3sJd9+TVHcp91zQRCzPzoiu8a2X/Y4VczI1rxS74KSOAdtWcOydYBJ7pZb2VGCnCWnPt5LFUmwEqfJO9UFgsG3hrHXOuqHFAQVu94KbJlWAVUzTFPXYiTBryItGyOAW/Y79qpruiEMwO3OepQiZWBrZrnLMoZ01dmUgVZFjxJUM9Y5/DrdtZ6Yhzz1ZslwAu/p/RzEx6RCG8/c3O7adYaa0LlQZY1cFkzRryqt8zFhqjXm6I3sQYA2GFCXLKrEey8jB140uHjLUdIv2cdEp4fOH63uH+PU3O9aXRYXPHu8g76yQSQeC0wrv0lYZrUy6MWynGaNXCzvbZFuazXjOTaf0dt0gmVUku1kjkow3nZf9XXwCKwy0z/Y6duuN38UbJidUt45dm6z09JCZgrdXh0jKOuwODjE+YowNYEwsMpTPzugXSvLGoh4VKvRVD648ELM8c60UR0LclmInSR7hWPdOjxXSPXkxOQdJocf20COR33n54+MnRV8WQ31ro9iL4Knse7OASi8ArysW8xlejLMKTXtZBUzB7rqRdhIiU0Vy0OhNl0eSpoSgOnFHq4Fmq9ewN2Mj1QGPcOHTMMM+Y8WEJAjxeyUzSVmSzwxfnVQb2G0xG4ejrA5ysQwg7H7s4KcixaAPCdmDw+gjSXbHmx+rgNBjQy/tBJM1UMuPFfvjUfFFhBtbKVrLhGWh0asR2bgabUJ41KX6ytjh9qFc+wwM8683fiT6Xy/dGp2fBqRGzp+MinvnwsYyfQvBPFOMVjl6A/L8haJvU0mTKUqdPvv+jLhnhGPd9HhLvil5bOWsVqi4N14cuMAvWC7ELWNPJq1WoTT6l56W6c7YzgmOo0fCAQxrtlnG3TnTGSWAqF2bLBZ3CF4IWXylFDd7hUR6X9avXtZEjxndlmDRmghY1ePaZcBWn+NBYBjR2tc9tZy+R5EO73/593KP9WXQ2GDQS09//RerjOMV8wER5GwZ/fz4oUAGVFxJDfsg8Qj6qf+kmHra63usDX339Ghhm1IcULkqZ+ZetBwL/cbrfsdWRvUz6a/lao2gFare6MtrAE8vzUNFy17+rHo8iT7Y1zKovJgG68qUsngIZmNTOUuwbE9PjZQToGpIHyzKOfwa0ymA+rl+/cx+OV+lfmLc+eoRt/3/hwX+AUoS8FAu9IyzAAAAAElFTkSuQmCC)\n' +
        '\n' +
        '```java\n' +
        'import { marked } from \'marked\'\n' +
        'import * as hljs from \'mavon-editor/resources/highlight.js-9.12.0/highlight.min\'\n' +
        '\n' +
        'marked.setOptions({\n' +
        '  renderer: new marked.Renderer(),\n' +
        '  gfm: true,\n' +
        '  tables: true,\n' +
        '  breaks: false,\n' +
        '  pedantic: false,\n' +
        '  sanitize: false,\n' +
        '  smartLists: true,\n' +
        '  smartypants: false,\n' +
        '  highlight: function(code, lang) {\n' +
        '    if (lang && hljs.getLanguage(lang)) {\n' +
        '      return hljs.highlight(lang, code, true).value\n' +
        '    } else {\n' +
        '      return hljs.highlightAuto(code).value\n' +
        '    }\n' +
        '  }\n' +
        '})\n' +
        '```\n' +
        '|column1|column2|column3|\n' +
        '|-|-|-|\n' +
        '|content1|content2|content3|'
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.value)
    }
  }
}
</script>

<style scoped>
  #html > table {
  background-color: #3A3A3A;
}
</style>
