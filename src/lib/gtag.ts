export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

export const isGAEnabled = GA_MEASUREMENT_ID && process.env.NODE_ENV === 'production';

// 페이지 뷰 추적
export const pageview = (url: string) => {
  if (isGAEnabled && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// 이벤트 추적
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (isGAEnabled && GA_MEASUREMENT_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackButtonClick = (buttonName: string) => {
  event({
    action: 'click',
    category: 'Button',
    label: buttonName,
  });
};

export const trackPageView = (pageName: string) => {
  event({
    action: 'page_view',
    category: 'Page',
    label: pageName,
  });
};

export const trackModalOpen = (modalName: string) => {
  event({
    action: 'modal_open',
    category: 'Modal',
    label: modalName,
  });
};

export const trackFormSubmit = (formName: string) => {
  event({
    action: 'form_submit',
    category: 'Form',
    label: formName,
  });
};
