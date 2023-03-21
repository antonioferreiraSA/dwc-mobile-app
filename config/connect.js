/**
 * The different items in the Connect tab
 */

import Colors from '../constants/Colors';

/**
 * The main Connect items
 */
export const listItems = [
  { value: 'ABOUT US', page: 'Baptism' },
  { value: 'LOCATION & CONTACT', page: 'Locations' }, // change file name to contactinfo.js
  { value: 'EVENTS', page: 'Volunteer' },
  { value: 'BAPTISM', page: 'Baptism' },
  { value: 'VOLUNTEER', page: 'Volunteer' },
  { value: 'BIBLE', page: 'Prayer Request Form' },  // buttom tab nav
  { value: 'PRAYER REQUESTS', page: 'Prayer Requests' },
];

/**
 * Any Call-To-Action buttons
 */
export const callToActionButtons = [
  {
    title: '🤍  Echo Compassion',
    url: 'https://www.echocompassion.com/',
    backgroundColor: Colors.red,
  },
  {
    title: '😊  Activate',
    url: 'https://www.echo.church/activate/',
    backgroundColor: Colors.red,
  },
];
