import AllContactPersons from '@/pages/contact-person/All';
import ContactPersons from '@/pages/contact-person/contact-persons';

const ContactPersonsRoutes = {
  path: 'contact-persons',
  meta: {
    title: 'Contact Persons',
    description: 'Contact persons overview',
  },

  children: [
    {
      path: 'all',
      element: <AllContactPersons />,
      meta: {
        title: 'All Contact Persons',
        description: 'All contact persons overview',
      },
    },
    {
      path: 'contact-persons',
      element: <ContactPersons />,
      meta: {
        title: 'Contact Persons',
        description: 'Contact persons overview',
      },
    },
  ],
};

export default ContactPersonsRoutes;
