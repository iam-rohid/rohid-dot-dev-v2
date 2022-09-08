export const GA_TRACKING_ID = "G-989F7PZJ09";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL): void => {
  gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (gTagEvent: GTagEvent): void => {
  const { action, category, label, value } = gTagEvent;
  gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
