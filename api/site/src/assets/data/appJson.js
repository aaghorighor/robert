import imagUrl from '../imgs/setup_steps.png';
import heroImage from '../imgs/irit_hero_1_.png';

export const AppJson = {
  id: 2000,
  image: heroImage,
  title:
    '<span>Transforming Church </span> Management <span> into a Delightful Experience</span>',
  short_description: `Dive into our comprehensive platform and discover the seamless way to amplify engagement, nurture close-knit bonds within your congregation, and supercharge every aspect of your operations.`,
  google_play_link:
    'https://play.google.com/store/apps/details?id=com.suftnet.jerur',
  description: '',
  feature: {
    title:
      '<span>Jerur offers a range of features designed to make </span> your church management experience <span>seamless</span>.',
    list: [
      {
        id: 1,
        icon: `uil-clock-eight text_small2`,
        title: 'Service Time Management',
        textColor: 'text-color_1',
        bgColor: 'bg-color_1',
        description:
          'Easily manage and display church service times, including regular services, special events, and holiday gatherings, ensuring accurate information is accessible to members.',
      },
      {
        id: 2,
        icon: `uil-calender text_small2`,
        title: 'Fundraising Campaigns',
        textColor: 'text-color_2',
        bgColor: 'bg-color_2',
        description:
          `Enable churches to create and manage fundraising campaigns for specific projects, missions, or building renovations, allowing members to contribute towards the goals.`,
      },
      {
        id: 3,
        icon: `uil-ticket text_small2`,
        title: 'Event Management',
        textColor: 'text-color_3',
        bgColor: 'bg-color_3',
        description:
          'Organize and promote church events, such as fundraising galas, charity drives, or benefit concerts, with features for ticketing, registration, and promotion, including service-specific events.',
      },
      {
        id: 4,
        icon: `uil-comment-alt-lines text_small2`,
        textColor: 'text-color_4',
        bgColor: 'bg-color_4',
        title: 'Communication ',
        description:
          'Facilitate seamless communication between church leadership and members regarding service times, fundraising efforts, updates, and progress reports.',
      },
      {
        id: 5,
        icon: `uil-transaction text_small2`,
        textColor: 'text-color_5',
        bgColor: 'bg-color_5',
        title: 'Online Giving Portal',
        description:
          'Set up a dedicated portal for online giving, allowing members to contribute securely using various payment methods, including credit/debit cards or bank transfers.',
      },
      {
        id: 6,
        icon: `uil-notes text_small2`,
        textColor: 'text-color_6',
        bgColor: 'bg-color_6',
        title: 'Attendance Tracking',
        description:
          'Record and track attendance for services and events, helping church leaders gather insights and evaluate engagement levels.',
      }
    ],
  },
  set_up: {
    image: imagUrl,
    steps: [
      {
        id: 1000,
        title: 'Download and register your Account',
        description:
          'Once you have downloaded the app, register by providing basic details about your business, such as business name, address, phone number, and email.',
      },
      {
        id: 2000,
        title: 'Set up Your Store',
        description:
          `After registering, set up your store by adding category, discount, tax and Create a digital menu that reflects your restaurant's unique offerings and pricing. Include descriptions, and options for addons.`,
      },
      {
        id: 4000,
        title: 'Set Up Your Hardware and Network',
        description:
          'Purchase the necessary hardware, such as a tablet, cash drawer, and printer (we recommend the MUNBYN Android Bluetooth , available on Amazon) . Set up a reliable network with a strong internet connection and secure Wi-Fi.',
      },
      {
        id: 5000,
        title: 'Train Your Staff',
        description:
          'Ensure that all staff members are trained on how to use the POS system. Provide clear instructions on how to enter orders, process payments, and manage tables.',
      },
      {
        id: 6000,
        title: 'Test and Launch',
        description:
          "Perform thorough testing of the system to ensure that it is working correctly. Once you're confident in its functionality, launch the system and start using it to manage your restaurant's operations.",
      },
    ],
  },
};
