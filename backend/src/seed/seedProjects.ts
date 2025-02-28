import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project';

// Load environment variables
dotenv.config();

// Sample project data
const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform built with the MEAN stack (MongoDB, Express, Angular, Node.js). This application includes user authentication, product catalog, shopping cart, payment processing, and order management.',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    technologies: ['Angular', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Bootstrap', 'Stripe API'],
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.example.com',
    featured: true,
    order: 1,
    completionDate: new Date('2023-08-15'),
    features: [
      'User authentication and profile management',
      'Product catalog with search and filtering',
      'Shopping cart and checkout process',
      'Payment processing with Stripe',
      'Order history and tracking',
      'Admin dashboard for product and order management'
    ],
    challenges: [
      {
        title: 'Real-time Inventory Management',
        description: 'Implemented WebSockets to ensure inventory counts are accurate across all active users, preventing overselling of products.'
      },
      {
        title: 'Secure Payment Processing',
        description: 'Integrated Stripe API with proper security measures to handle sensitive payment information while maintaining PCI compliance.'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        caption: 'Homepage with featured products'
      },
      {
        url: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
        caption: 'Product detail page'
      },
      {
        url: 'https://images.unsplash.com/photo-1557899563-1940fc95709c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
        caption: 'Checkout process'
      }
    ]
  },
  {
    title: 'Task Management Application',
    description: 'A collaborative task management application that helps teams organize and track their projects. Features include task creation, assignment, due dates, priority levels, comments, and file attachments.',
    imageUrl: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
    technologies: ['Angular', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT'],
    githubUrl: 'https://github.com/yourusername/task-manager',
    liveUrl: 'https://taskmanager-demo.example.com',
    featured: true,
    order: 2,
    completionDate: new Date('2023-05-20'),
    features: [
      'User authentication and team management',
      'Project and task creation with custom fields',
      'Task assignment, due dates, and priority levels',
      'Real-time updates and notifications',
      'File attachments and comments',
      'Kanban board and list views',
      'Progress tracking and reporting'
    ],
    challenges: [
      {
        title: 'Real-time Collaboration',
        description: 'Implemented Socket.io to provide real-time updates when multiple team members are working on the same project simultaneously.'
      },
      {
        title: 'Complex Permission System',
        description: 'Designed a flexible permission system that allows fine-grained control over who can view, edit, or manage different aspects of projects and tasks.'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
        caption: 'Dashboard view'
      },
      {
        url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        caption: 'Kanban board'
      }
    ]
  },
  {
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard that provides current conditions and forecasts for locations worldwide. The application uses the OpenWeatherMap API to fetch weather data and presents it in an intuitive, user-friendly interface.',
    imageUrl: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    technologies: ['Angular', 'TypeScript', 'RxJS', 'OpenWeatherMap API', 'Chart.js', 'SCSS'],
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
    liveUrl: 'https://weather-demo.example.com',
    featured: false,
    order: 3,
    completionDate: new Date('2023-02-10'),
    features: [
      'Current weather conditions for any location',
      '5-day forecast with 3-hour intervals',
      'Interactive charts for temperature, humidity, and wind',
      'Location search with autocomplete',
      'Geolocation support for current location',
      'Responsive design for all device sizes',
      'Unit conversion (metric/imperial)'
    ],
    challenges: [
      {
        title: 'API Rate Limiting',
        description: 'Implemented caching strategies to minimize API calls and stay within the free tier limits of the OpenWeatherMap API.'
      },
      {
        title: 'Data Visualization',
        description: 'Created custom Chart.js configurations to display weather data in an intuitive and visually appealing way.'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        caption: 'Main dashboard'
      },
      {
        url: 'https://images.unsplash.com/photo-1530908295418-a12e326966ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
        caption: 'Forecast view'
      }
    ]
  }
];

// Connect to MongoDB
async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Insert sample projects
    const result = await Project.insertMany(sampleProjects);
    console.log(`Added ${result.length} sample projects to the database`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run the seed function
seedDatabase(); 