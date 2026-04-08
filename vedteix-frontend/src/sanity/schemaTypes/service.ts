import { defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'icon', title: 'Icon', type: 'string' },
    { name: 'order', title: 'Order', type: 'number' }
  ]
}); 