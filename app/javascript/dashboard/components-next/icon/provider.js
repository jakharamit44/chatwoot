import { computed } from 'vue';
import { isVoiceCallEnabled } from 'dashboard/helper/inbox';

const channelTypeIconMap = {
  'Channel::Api': 'i-woot-api',
  'Channel::Email': 'i-woot-mail',
  'Channel::FacebookPage': 'i-woot-messenger',
  'Channel::Line': 'i-woot-line',
  'Channel::Sms': 'i-woot-sms',
  'Channel::Telegram': 'i-woot-telegram',
  'Channel::TwilioSms': 'i-woot-sms',
  'Channel::TwitterProfile': 'i-woot-x',
  'Channel::WebWidget': 'i-woot-website',
  'Channel::Whatsapp': 'i-woot-whatsapp',
  'Channel::Instagram': 'i-woot-instagram',
  'Channel::Tiktok': 'i-woot-tiktok',
};

const providerIconMap = {
  microsoft: 'i-woot-outlook',
  google: 'i-woot-gmail',
};

// Branded image variants. Channels not listed here have no image and callers
// should fall back to the icon class via useChannelIcon.
const channelImageBase = '/dashboard/images/channels';
const channelTypeImageMap = {
  'Channel::FacebookPage': `${channelImageBase}/facebook.webp`,
  'Channel::Line': `${channelImageBase}/line.webp`,
  'Channel::Telegram': `${channelImageBase}/telegram.webp`,
  'Channel::Whatsapp': `${channelImageBase}/whatsapp.webp`,
  'Channel::Instagram': `${channelImageBase}/instagram.webp`,
  'Channel::Tiktok': `${channelImageBase}/tiktok.webp`,
};

const providerImageMap = {
  microsoft: `${channelImageBase}/outlook.webp`,
  google: `${channelImageBase}/gmail.webp`,
};

const resolveInbox = inbox => inbox?.value ?? inbox;

export function useChannelIcon(inbox) {
  const channelIcon = computed(() => {
    const inboxDetails = resolveInbox(inbox);
    const type = inboxDetails.channel_type;
    let icon = channelTypeIconMap[type];

    if (type === 'Channel::Email' && inboxDetails.provider) {
      if (Object.keys(providerIconMap).includes(inboxDetails.provider)) {
        icon = providerIconMap[inboxDetails.provider];
      }
    }

    // Special case for Twilio whatsapp
    if (type === 'Channel::TwilioSms' && inboxDetails.medium === 'whatsapp') {
      icon = 'i-woot-whatsapp';
    }

    // Special case for voice-enabled inboxes (Twilio, WhatsApp, etc.)
    if (isVoiceCallEnabled(inboxDetails)) {
      icon = 'i-woot-voice';
    }

    return icon ?? 'i-ri-global-fill';
  });

  return channelIcon;
}

export function useChannelImage(inbox) {
  return computed(() => {
    const inboxDetails = resolveInbox(inbox);
    const type = inboxDetails.channel_type;
    let image = channelTypeImageMap[type];

    if (type === 'Channel::Email' && inboxDetails.provider) {
      if (Object.keys(providerImageMap).includes(inboxDetails.provider)) {
        image = providerImageMap[inboxDetails.provider];
      }
    }

    if (type === 'Channel::TwilioSms' && inboxDetails.medium === 'whatsapp') {
      image = channelTypeImageMap['Channel::Whatsapp'];
    }

    return image ?? null;
  });
}
