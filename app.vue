<template>
  <NuxtLoadingIndicator color="#2563eb" /> 
  <NotificationStack />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const appName = "Registry";

useHead({
  titleTemplate: (title) => (title ? `${title} - ${appName}` : `${appName}`),
});
</script>
