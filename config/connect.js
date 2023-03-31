/**
 * The different items in the Connect tab
 */

import Colors from '../constants/Colors';

/**
 * The main Connect items
 */
export const listItems = [
  { value: 'ABOUT US', page: 'Baptism' },
  { value: 'LOCATION & CONTACT', page: 'Locations' }, 
  { value: 'BAPTISM', page: 'Baptism' },
  { value: 'VOLUNTEER', page: 'Volunteer' },
  { value: 'PRAYER REQUESTS', page: 'Prayer Requests' },
];

/**
 * Any Call-To-Action buttons
 */
export const callToActionButtons = [
  {
    title: '🤍 Privacy Policy ',
    url: 'https://mobile.destinyworshipcentre.co.za/wp-content/uploads/2023/03/Privacy-Policy-Destiny-Worship-Centre-Church-1.pdf',
    backgroundColor: Colors.red,
  },
  {
    title: '😊  Activate',
    url: 'https://www.echo.church/activate/',
    backgroundColor: Colors.red,
  },
];
