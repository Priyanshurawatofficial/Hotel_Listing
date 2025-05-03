

const sampleListings = [
  {
    
    title: 'Cozy Beachfront Cottage',
    description: 'Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.',
    image: {
      url: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      filename: 'listing image'
    },
    price: 1500,
    location: 'Malibu',
    country: 'United States',
    reviews: [],
    owner: '68026abe16c778d1ef1b0527',
    geometry: { type: 'Point', coordinates: [-77.0369, 38.9072] },
    __v: 0
  },
  {
    
    title: 'Modern Loft in Downtown',
    description: 'Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!',
    image: {
      url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      filename: 'listing image'
    },
    price: 1200,
    location: 'New York City',
    country: 'United States',
    reviews: [],
    owner: '68026abe16c778d1ef1b0527',
    geometry: { type: 'Point', coordinates: [-77.0369, 38.9072] },
    __v: 0
  },
  {
    
    title: 'Mountain Retreat',
    description: 'Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it\'s a perfect place to recharge.',
    image: {
      url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      filename: 'listing image'
    },
    price: 1000,
    location: 'Aspen',
    country: 'United States',
    reviews: [],
    owner: '68026abe16c778d1ef1b0527',
    geometry: { type: 'Point', coordinates: [-77.0369, 38.9072] },
    __v: 0
  },
  {
    
    title: 'Historic Villa in Tuscany',
    description: 'Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.',
    image: {
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      filename: 'listing image'
    },
    price: 2500,
    location: 'Florence',
    country: 'Italy',
    reviews: [],
    owner: '68026abe16c778d1ef1b0527',
    geometry: { type: 'Point', coordinates: [12.4964, 41.9028] },
    __v: 0
  },
  {
    
    title: 'Secluded Treehouse Getaway',
    description: 'Live among the treetops in this unique treehouse retreat. A true nature lover\'s paradise.',
    image: {
      url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      filename: 'listing image'
    },
    price: 800,
    location: 'Portland',
    country: 'United States',
    reviews: [],
    owner: '68026abe16c778d1ef1b0527',
    geometry: { type: 'Point', coordinates: [-77.0369, 38.9072] },
    __v: 0
  },
  {
    
    title: 'Beachfront Paradise',
    description: 'Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.',
    image: {
      url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      filename: 'listing image'
    },
    price: 2000,
    location: 'Cancun',
    country: 'Mexico',
    reviews: [],
    owner: '68026abe16c778d1ef1b0527',
    geometry: { type: 'Point', coordinates: [-99.1332, 19.4326] },
    __v: 0
  },
  {
    
    title: 'Rustic Cabin by the Lake',
    description: 'Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.',
    image: {
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      filename: 'listing image'
    },
    price: 900,
    location: 'Lake Tahoe',
    country: 'United States',
    reviews: [],
    owner: '68026abe16c778d1ef1b0527',
    geometry: { type: 'Point', coordinates: [-77.0369, 38.9072] },
    __v: 0
  },
  // ...and so on for each listing, following this pattern
];

module.exports = sampleListings;