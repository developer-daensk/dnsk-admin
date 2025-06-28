export type TextResourceCategory = 'common' | 'navigation' | 'forms' | 'messages' | 'errors';

export type TextResourceKeyType<T extends TextResourceCategory> = T extends 'common'
  ? keyof typeof import('../categories/common').common
  : T extends 'navigation'
    ? keyof typeof import('../categories/navigation').navigation
    : T extends 'forms'
      ? keyof typeof import('../categories/forms').forms
      : T extends 'messages'
        ? keyof typeof import('../categories/messages').messages
        : T extends 'errors'
          ? keyof typeof import('../categories/errors').errors
          : never;
