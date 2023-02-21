import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { UnreadNotification } from './unread-notification';

describe('Unread Notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);
    const notification = makeNotification({ readAt: new Date() });
    await notificationsRepository.create(notification);
    await unreadNotification.execute({ notificationId: notification.id });
    expect(notificationsRepository.notifications[0].readAt).toEqual(null);
  });

  it('should not be able to unread a notification that does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);
    await expect(
      unreadNotification.execute({ notificationId: 'non-existing-id' }),
    ).rejects.toThrow('Notification not found');
  });
});
