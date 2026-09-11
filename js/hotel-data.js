/* Update hotel facts and photo mappings here. See SOURCES.md for provenance. */
window.hotelData = {
  name: 'Ion Hotel',
  address: '56 Legarda Road, Baguio City, Benguet 2600, Philippines',
  phone: '0917 315 7008',
  links: {
    phone: 'tel:+639173157008',
    facebook: 'https://www.facebook.com/bgoionhotel',
    maps: 'https://www.google.com/maps/search/?api=1&query=Ion+Hotel+56+Legarda+Road+Baguio'
  },
  rooms: [
    { id: 'deluxe-single', name: 'Deluxe Single Room', tag: 'YOUR OWN LITTLE ESCAPE', image: 'assets/images/king.webp', alt: 'Ion Hotel Deluxe Single Room with a king bed and window seating', beds: '1 king bed', description: 'A comfortable place to switch off after a day in the city, with a king bed and space to settle in.', features: ['Wi-Fi', 'Private bathroom', 'Desk'] },
    { id: 'city-twin', name: 'City Twin Room', tag: 'BETTER TOGETHER', image: 'assets/images/twin.webp', alt: 'Ion Hotel City Twin Room with two double beds', beds: '2 double beds', description: 'Share the trip, keep your own bed. A twin room for catching up and winding down between Baguio adventures.', features: ['Wi-Fi', 'Private bathroom', 'Desk'] },
    { id: 'family', name: 'Family Room', tag: 'BRING YOUR FAVORITE PEOPLE', image: 'assets/images/family.webp', alt: 'Ion Hotel Family Room with three double beds', beds: '3 double beds', description: 'Room to make a trip of it, with three beds for time away together. Ask the hotel about the best setup for your group.', features: ['Wi-Fi', 'Private bathroom', 'Desk'] }
  ],
  amenities: [
    { name: 'Wi-Fi', icon: 'wifi' },
    { name: 'On-site parking', icon: 'parking' },
    { name: 'Breakfast service', icon: 'coffee' },
    { name: '24-hour front desk', icon: 'clock' },
    { name: 'Elevator', icon: 'lift' },
    { name: 'Meeting spaces', icon: 'meeting' }
  ],
  gallery: [
    { src: 'assets/images/king.webp', alt: 'Deluxe Single Room at Ion Hotel', caption: 'A space to slow down', category: 'Rooms' },
    { src: 'assets/images/exterior.webp', alt: 'Ion Hotel exterior on Legarda Road', caption: 'Your Legarda Road address', category: 'Hotel' },
    { src: 'assets/images/dining.webp', alt: 'Breakfast and dining area at Ion Hotel', caption: 'Start the day here', category: 'Hotel' },
    { src: 'assets/images/family.webp', alt: 'Family Room with three double beds', caption: 'A getaway, together', category: 'Rooms' },
    { src: 'assets/images/twin.webp', alt: 'City Twin Room with two double beds', caption: 'Two beds. One city break.', category: 'Rooms' },
    { src: 'assets/images/exterior-night.webp', alt: 'Ion Hotel illuminated at night, from its Facebook cover photo', caption: 'Hello, Baguio nights', category: 'Hotel' }
  ]
};
