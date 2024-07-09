<template>
    <svg :width="width" :height="height" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 1.49999H0V16.5H1.5V1.49999Z" fill="black" />
        <path d="M1.50004 0L1.5 1.49999L4.50002 1.5V0H1.50004Z" fill="black" />
        <path d="M4.50002 1.5L4.5 3.00001L7.50002 2.99999L7.50004 1.50001L4.50002 1.5Z" fill="black" />
        <path d="M7.50002 2.99999V4.49999L10.5 4.5L10.5 2.99999H7.50002Z" fill="black" />
        <path d="M10.5 4.5V6L13.5 6.00001L13.5 4.5H10.5Z" fill="black" />
        <path d="M13.5 6.00001V7.50001L16.5 7.49999L16.5 6.00001H13.5Z" fill="black" />
        <path d="M16.5 10.5H18V7.49999H16.5V10.5Z" fill="black" />
        <path d="M13.5 10.5V12H16.5L16.5 10.5L13.5 10.5Z" fill="black" />
        <path d="M10.5 12V13.5H13.5L13.5 12L10.5 12Z" fill="black" />
        <path d="M7.50002 13.5V15H10.5L10.5 13.5L7.50002 13.5Z" fill="black" />
        <path d="M4.5 15L4.50002 16.5L7.50004 16.5L7.50002 15L4.5 15Z" fill="black" />
        <path d="M1.5 16.5L1.50004 18H4.50002V16.5L1.5 16.5Z" fill="black" />
        <path
            d="M4.5 1.49976H1.5V16.4998H4.5V14.9998H7.5V13.4998H10.5V11.9998H13.5V10.4998H16.5V7.49976H13.5V5.99976H10.5V4.49976H7.5V2.99976H4.5V1.49976Z"
            :fill="color" />
    </svg>
</template>

<script>
export default {
  name: 'StartButton',
  props: {
    color: {
      type: String,
      default: '#D7DF23',
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

