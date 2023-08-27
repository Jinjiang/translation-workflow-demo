<script setup lang="ts">
import status from '../../../langMap.json'
const txt: string = JSON.stringify(status)
</script>

<template>
  <div style="
    padding: 20px 24px;
    margin-bottom: 16px;
    border-radius: 8px;
    color: silver;
    background-color: black;
  ">
    {{ txt }}
  </div>
</template>
