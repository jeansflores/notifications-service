import { Content } from '@app/entities/content';
import { Notification, NotificationProps } from '@app/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}): Notification {
  return new Notification({
    recipientId: 'recipient-id',
    category: 'social',
    content: new Content('New Notification'),
    ...override,
  });
}
