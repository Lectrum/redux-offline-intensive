// Core
import React from 'react';

// Components
import Notification from 'components/Notification';

const Notifications = ({ notifications, hideNotification }) =>
    notifications.map((notification) => (
        <Notification
            hideNotification = { hideNotification }
            key = { notification.id }
            { ...notification }
        />
    ));

export default Notifications;
