import { sendGTMEvent } from '@next/third-parties/google';

import type {
  AnalyticsEventParams,
  EcommerceItem,
  GTMEventData,
  UserProperties,
} from '@/types/analytics';

const sendClarityEvent = (eventName: string, parameters?: AnalyticsEventParams): void => {
  if (typeof window !== 'undefined' && window.clarity) {
    // Clarity에 이벤트 전송
    window.clarity('event', eventName);

    // 추가 데이터가 있으면 set으로 전송
    if (parameters) {
      Object.entries(parameters).forEach(([key, value]) => {
        if (window.clarity) {
          window.clarity('set', key, String(value));
        }
      });
    }
  }
};

export const analytics = {
  // 페이지뷰
  pageview: (url: string): void => {
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('set', 'page', url);
    }
  },

  event: (eventName: string, parameters?: AnalyticsEventParams): void => {
    // GTM으로 전송
    const gtmData: GTMEventData = {
      event: eventName,
      ...parameters,
    };
    sendGTMEvent(gtmData);

    sendClarityEvent(eventName, parameters);
  },

  // 사용자 식별
  identifyUser: (userId: string, userProperties?: UserProperties): void => {
    if (typeof window !== 'undefined' && window.clarity) {
      const sanitizedProps: Record<string, string | number | boolean> | undefined = userProperties
        ? Object.fromEntries(
            Object.entries(userProperties)
              .filter(([, value]) => value !== undefined)
              .map(([key, value]) => [key, value as string | number | boolean]),
          )
        : undefined;

      window.clarity('identify', userId, sanitizedProps);
    }
  },

  track: {
    signUp: (method = 'email'): void => {
      analytics.event('sign_up', { method });
    },

    login: (method = 'email', userId?: string): void => {
      analytics.event('login', { method });

      // 로그인 시 사용자 식별
      if (userId) {
        analytics.identifyUser(userId, { login_method: method });
      }
    },

    purchase: (
      transactionId: string,
      value: number,
      items: EcommerceItem[],
      userId?: string,
      currency = 'KRW',
    ): void => {
      analytics.event('purchase', {
        transaction_id: transactionId,
        value: value,
        currency: currency,
        items: items,
      });

      if (userId) {
        analytics.identifyUser(userId, {
          last_purchase_value: value,
          last_purchase_date: new Date().toISOString(),
        });
      }
    },

    buttonClick: (buttonName: string, location?: string): void => {
      analytics.event('button_click', {
        button_name: buttonName,
        page_location: location || (typeof window !== 'undefined' ? window.location.pathname : ''),
      });
    },

    search: (searchTerm: string): void => {
      analytics.event('search', {
        search_term: searchTerm,
      });
    },

    formInteraction: (formName: string, action: 'start' | 'complete' | 'abandon'): void => {
      analytics.event('form_interaction', {
        form_name: formName,
        form_action: action,
      });
    },

    errorOccurred: (errorType: string, errorMessage: string): void => {
      analytics.event('error_occurred', {
        error_type: errorType,
        error_message: errorMessage,
      });
    },

    featureUsed: (featureName: string, context?: string): void => {
      analytics.event('feature_used', {
        feature_name: featureName,
        feature_context: context || '',
      });
    },
  },
};
