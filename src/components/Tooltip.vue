<template>
  <div class="tooltip">
    <span class="tooltip__icon">&#9432;
      <span class="tooltip__text">{{ text }}</span>
    </span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

class Props {
  readonly text!: string;
}

@Options({
  name: 'Tooltip',
})
export default class ToolTip extends Vue.with(Props) {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.tooltip__icon {
  cursor: pointer;
  position: relative;
  display: inline-block;
  margin-left: 5px;
}
.tooltip__icon:hover .tooltip__text {
  visibility: visible;
  opacity: 1;
}
/* Tooltip text */
.tooltip__text {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Tooltip arrow */
.tooltip__text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}
</style>
