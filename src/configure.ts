export interface DiscountAppComponents {
  VERSION: string;
}

declare global {
  interface Window {
    DiscountAppComponents: DiscountAppComponents;
  }
}

if (typeof window !== 'undefined') {
  window.DiscountAppComponents = window.DiscountAppComponents || {};
  window.DiscountAppComponents.VERSION = '{{DISCOUNT_APP_COMPONENTS_VERSION}}';
}

export const discountAppComponentsVersion =
  '{{DISCOUNT_APP_COMPONENTS_VERSION}}';
