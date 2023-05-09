<script setup lang="ts">
import status from '../../../langMap.json'
const txt: string = JSON.stringify(status)
</script>

<template>
  <div style="padding: 0.5em 1em; margin-bottom: 1em; background-color: black;">
    {{ txt }}
  </div>
</template>
