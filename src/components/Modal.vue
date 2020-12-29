<template>
  <teleport to="body">
    <div
      v-if="showModal"
      class="modal"
    >
      <div class="modal__container">
        <span class="modal__message">{{ button.confirmation_message }}</span>
        <div class="modal__button-container">
          <button @click="$emit('close')">Cancel</button>
          <button @click="$emit('action', button.type )">{{ button.label }}</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Button } from '@/types/FormConfig';

class Props {
  readonly show!: string;

  readonly button!: Button;
}

// eslint-disable-next-line no-use-before-define
@Options<Modal>({
  name: 'Tooltip',
  emits: ['close', 'action'],
  watch: {
    show(val) {
      this.showModal = val === `show-${this.button.type}`;
    },
  },
})
export default class Modal extends Vue.with(Props) {
  showModal = false;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .modal {
    background-color: lightslategray;
    bottom: 0;
    left: 0;
    opacity: 0.5;
    position: absolute;
    right: 0;
    top: 0;
  }
  .modal__container {
    background-color: white;
    margin: 0 auto;
    max-width: 500px;
    padding: 20px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .modal__message {
    display: block;
    margin-bottom: 20px;
    text-align: center;
    width: 100%;
  }
  .modal__button-container {
    display: flex;
    justify-content: space-around;
  }
</style>
