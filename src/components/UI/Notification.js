import React from 'react';
import styles from './Notification.module.css';

const Notification = (props) => {
  let specialClasses = '';

  if (props.status === 'Success') {
    specialClasses = styles.success;
  }

  if (props.status === 'Failed') {
    specialClasses = styles.error;
  }

  if (props.status === 'Waiting') {
    specialClasses = styles.waiting;
  }

  const cssClasses = `${styles.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </section>
  );
};

export default Notification;
