<template>
    <svg :width="width" :height="height" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.09961 26.2758V2.47583H25.8996V26.2758H2.09961Z" :fill="color" />
            <path d="M28 2.47598H25.9V26.276H28V2.47598Z" fill="black" />
            <path d="M2.1 0.375977V2.47598H25.9V0.375977H2.1Z" fill="black" />
            <path d="M0 26.276H2.1V2.47598H0V26.276Z" fill="black" />
            <path d="M2.1 26.276V28.376H25.9V26.276H2.1Z" fill="black" />
        </svg>
    </svg>
</template>

<script>
export default {
  name: 'LiveButton',
  props: {
    color: {
      type: String,
      default: '#FF4646',
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