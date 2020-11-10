<template>
  <section class="app-editor">

    <div class="editor">
      <div
        class="editor__area"
        @click="click"
        @focus="focus"
        @blur="isEdit = false"
        @input="input"
        @keyup="onKeyup"
        @keydown="onKeydown"
        @paste="onPaste"
        ref="content"
        :contenteditable="isEdit"
        dir="auto"
        tabindex="4"
        :placeholder="$t('editor.placeholder')"></div>
			<div class="meta" :class="{ '--open': valid }">
				<span class="meta__item">ctrl + enter</span>
				<span class="meta__item --divider">{{ $t('editor.or') }}</span>
				<span class="meta__item"><a href="#" @click="save">{{ $t('editor.save') }}</a></span>
			</div>
    </div>
  </section>
</template>

<script>
import { uuid, cancelEvent } from '@/services/utils'

export default {
  name: 'NewStory',
  data() {
    return {
      isEdit: false,
      story: {
        content: ''
      }
    }
  },
  computed: {
    valid() {
      if (this.story.content == '')
        return false

      return true
    }
  },
  methods: {
    click() {
      this.isEdit = true
    },
    focus() {
      this.isEdit = true
      this.$nextTick(_ => {
        let element = this.$refs.content,
            selection = window.getSelection(),
            range = document.createRange()
          range.setStart(element, 0)
          range.setEnd(element, 0)
          selection.removeAllRanges()
          selection.addRange(range)
      })
    },
    input() {
      if (this.$refs.content.innerHTML == "<br>") {
        this.$refs.content.innerText = ''
      }
      this.story.content = this.$refs.content.innerText
    },
    onKeyup(e) {

    },
    onKeydown(e) {
      // markup
      if (e.ctrlKey || e.metaKey) {
          switch(e.keyCode) {
              case 66: //ctrl+B or ctrl+b
              case 98:
              case 73: //ctrl+I or ctrl+i
              case 105:
              case 85: //ctrl+U or ctrl+u
              case 117:
                return cancelEvent(e)
                break;
          }
      }

      // ctrl + enter - and we create comment
      if ((e.ctrlKey || e.metaKey) && e.keyCode == 13) {
        this.save(e)
        return cancelEvent(e)
      }

      // not div, but two br
      if (e.keyCode == 13) {
        document.execCommand('insertHTML', false, '<br><br>')
        return cancelEvent(e)
      }
    },
    onPaste(e) {
			let cData = (e.originalEvent || e).clipboardData,
					itemsText = cData.getData('text/plain')

      if (itemsText.length) {
        document.execCommand('insertText', false, itemsText)
        return cancelEvent(e)
      }

      return cancelEvent(e)
    },
    save(e) {
      e.preventDefault()
      if (!this.valid)
        return false

      this.story.uuid = uuid()
      this.story.created_at = Math.floor(+new Date() / 1000)
      this.story.edited_at = Math.floor(+new Date() / 1000)

      let copy = Object.assign({}, this.story)
      this.clean()
      this.$emit('created', copy)
    },
    clean() {
			this.$refs.content.innerText = ''
      this.story = {
        content: ''
      }
    }
  }
}
</script>

<style scoped lang="scss">

.editor {
	text-align: center;
  padding: 3rem 0;

  .meta {
    visibility: hidden;
    opacity: 0;
    transition: visibility .2s linear,
                opacity .2s linear;

    &.--open {
      visibility: visible;
      opacity:1;
    }
  }
}

.editor__area {
  outline: 0;
	width: 100%;
  margin: 0.4rem 0;
  overflow-y: auto;
  overflow-x: hidden;
  word-wrap: break-word;
  border: none;
  -webkit-font-smoothing: subpixel-antialiased;
  
  &:empty::before {
    content: attr(placeholder);
    display: block;
    opacity: .6;
    pointer-events: none;
    transition: opacity .3s;
  }
  &:empty:active::before,
  &:empty:focus::before {
    opacity: .4;
  }

  &[contenteditable=false] {
    cursor: text;
  }
}
</style>
