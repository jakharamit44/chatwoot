<script setup>
import { toRef, computed } from 'vue';
import { useChannelIcon, useChannelImage } from './provider';
import Icon from 'next/icon/Icon.vue';

const props = defineProps({
  inbox: {
    type: Object,
    required: true,
  },
  // When true, render the brand image (when available for the channel type)
  // and fall back to the monochrome icon otherwise.
  useImage: {
    type: Boolean,
    default: false,
  },
});

const inboxRef = toRef(props, 'inbox');
const channelIcon = useChannelIcon(inboxRef);
const channelImage = useChannelImage(inboxRef);

const showImage = computed(() => props.useImage && channelImage.value);
</script>

<template>
  <img
    v-if="showImage"
    :src="channelImage"
    :alt="inbox.name || ''"
    class="object-contain"
  />
  <Icon v-else :icon="channelIcon" />
</template>
