<template>
  <svg :width="width" :height="height" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.2087 1.53345H8.40866V10.635L2.27533 10.7334V21.4668H13.0087V15.3334H22.2087V1.53345Z" fill="black" />
    <path d="M0.741943 21.4667H2.27528V10.7333H0.741943V21.4667Z" :fill="color" />
    <path d="M8.40861 1.53333H6.87528V9.2H2.27528V10.7333H6.87528V15.3333H8.40861V1.53333Z" :fill="color" />
    <path d="M13.0086 21.4667H14.5419V16.8667H22.2086V15.3333H8.40861V16.8667H13.0086V21.4667Z" :fill="color" />
    <path d="M2.27528 21.4667V23H13.0086V21.4667H2.27528Z" :fill="color" />
    <path d="M23.7419 1.53333H22.2086V15.3333H23.7419V1.53333Z" :fill="color" />
    <path d="M8.40861 0V1.53333H22.2086V0H8.40861Z" :fill="color" />
  </svg>
</template>

<script>
export default {
  name: 'CopyButton',
  props: {
    color: {
      type: String,
      default: '#A1A1A1',
    },
    width: {
      type: String,
      default: '18',
    },
    height: {
      type: String,
      default: '18',
    },
  },
};
</script>