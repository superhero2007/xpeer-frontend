<template lang="pug">
portal(to="dialog")
  .dialog
    .dialog__overlay(@click="onClose")
    .dialog__inner
      .dialog__inner__message {{msg}}
      .dialog__inner__button-group
        bt-button(@click="onConfirm" type="danger") Ok
        bt-button(@click="onClose") Cancel
</template>

<script>
import BtButton from '../../components/BtButton/BtButton'
import { mapState } from 'vuex'

export default {
  name: 'ConfirmDialog',
  components: { BtButton },
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState('cards', ['confirmDialogButtonClick']),
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
    onConfirm() {
      if (this.confirmDialogButtonClick) {
        this.confirmDialogButtonClick()
      }
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.dialog {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  overflow: hidden;
  z-index: 200;
  margin: 0 1rem;

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    background-color: rgba(200, 200, 200, 0.9);
    z-index: 1;
  }

  &__inner {
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 800px;
    width: 100%;
    background-color: white;
    padding: 20px;
    border: 1px solid black;
    border-radius: 1rem;
    margin: auto;
    z-index: 200;

    &__message {
      font-size: 26px;
      text-align: center;
    }

    &__button-group {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }
  }
}
</style>
