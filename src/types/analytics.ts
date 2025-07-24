export interface ClarityInstance {
  (action: 'init', projectId: string): void;
  (
    action: 'identify',
    userId: string,
    userProperties?: Record<string, string | number | boolean>,
  ): void;
  (action: 'set', key: string, value: string): void;
  (action: 'event', eventName: string): void;
}

export interface GTMEventData {
  event: string;
  [key: string]: string | number | boolean | object;
}

export interface AnalyticsEventParams {
  [key: string]: string | number | boolean | object;
}

export interface EcommerceItem {
  item_id: string;
  item_name: string;
  category: string;
  price: number;
  quantity?: number;
}

export interface UserProperties {
  user_type?: string;
  location?: string;
  registration_date?: string;
  login_method?: string;
  last_purchase_value?: number;
  last_purchase_date?: string;
  [key: string]: string | number | boolean | undefined;
}

export type ClarityUserProperties = Record<string, string | number | boolean>;

declare global {
  interface Window {
    clarity?: ClarityInstance;
  }
}
