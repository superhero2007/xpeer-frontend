<template lang="pug">
  button.bt-button(
    :class="[type, { disabled }, { icon }]"
    @click="e => $emit('click', e)"
  )
    slot
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'default',
      validator: value => {
        return ['danger', 'default'].indexOf(value) !== -1
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.bt-button {
  font-size: 14px;
  font-weight: 600;
  height: 3rem;
  padding: 0.5rem 2rem;
  background: #217edd;
  border-radius: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: auto;
  cursor: pointer;
  border: 1px solid rgb(200, 200, 200);
  outline: none;
  margin-right: 0.5rem;

  &:hover {
    background: darken(#217edd, 10);
  }

  &.danger {
    background: #dd4747;

    &:hover {
      background: darken(#dd4747, 10);
    }
  }

  &.icon {
    height: 2rem;
    width: 2rem;
    border-radius: 1rem;
    padding: 0;
  }
}
</style>
