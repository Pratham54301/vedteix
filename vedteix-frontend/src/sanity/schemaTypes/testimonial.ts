import { defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'quote', title: 'Quote', type: 'text' },
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'title', title: 'Title/Role', type: 'string' },
    { name: 'avatar', title: 'Avatar', type: 'image' }
  ]
}); 