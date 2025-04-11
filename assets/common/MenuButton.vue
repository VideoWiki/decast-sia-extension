<template>
  <svg fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 290 290" xml:space="preserve" :width="width"
    :height="height">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <g>
        <rect x="110" y="220" width="70" height="70"></rect>
        <rect x="110" y="110" width="70" height="70"></rect>
        <rect x="110" width="70" height="70"></rect>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: "MenuButton",
  props: {
    color: {
      type: String,
      default: "#ffffff",
    },
    width: {
      type: String,
      default: "24",
    },
    height: {
      type: String,
      default: "24",
    },
  },
};
</script>
