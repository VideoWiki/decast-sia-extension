<template>
    <svg fill="#ffffff" :width="width" :height="height" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"
        id="memory-plus-box">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M12,16H10V12H6V10H10V6H12V10H16V12H12ZM18,20H4V19H3V18H2V4H3V3H4V2H18V3H19V4H20V18H19V19H18ZM17,18V17H18V5H17V4H5V5H4V17H5V18Z">
            </path>
        </g>
    </svg>
</template>

<script>
export default {
  name: 'CreateButton',
  props: {
    color: {
      type: String,
      default: '#A1A1A1',
    },
    width: {
      type: String,
      default: '24',
    },
    height: {
      type: String,
      default: '24',
    },
  },
};
</script>
