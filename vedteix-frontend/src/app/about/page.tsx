'use client';
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from 'react';
import { BadgeAlert, Users, Lightbulb } from 'lucide-react';
import { testimonials as fallbackTestimonials } from '@/lib/data';
import type { Testimonial } from '@/lib/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { motion } from 'framer-motion';

const values = [
  {
    icon: <BadgeAlert className="h-8 w-8 text-primary" />,
    title: 'Innovation',
    desc: 'We push boundaries and embrace new technologies to deliver cutting-edge solutions.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Collaboration',
    desc: 'We believe in teamwork and transparent communication with our clients.',
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: 'Integrity',
    desc: 'We act with honesty and uphold the highest ethical standards in all we do.',
  },
];

export default function AboutPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    let cancelled = false;

    const loadTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        const payload = await response.json().catch(() => []);
        if (response.ok && !cancelled) {
          setTestimonials(payload);
        }
      } catch {}
    };

    void loadTestimonials();

    return () => {
      cancelled = true;
    };
  }, []);

  const displayedTestimonials = useMemo(() => {
    if (testimonials.length > 0) {
      return testimonials.map((item) => ({
        key: item._id,
        quote: item.message,
        name: item.name,
        title: item.designation,
        avatar: item.imageUrl || 'https://placehold.co/100x100.png',
      }));
    }

    return fallbackTestimonials.map((item, index) => ({
      key: String(index),
      quote: item.quote,
      name: item.name,
      title: item.title,
      avatar: item.avatar,
    }));
  }, [testimonials]);

  return (
    <div className="container mx-auto py-16">
      <motion.h1
        className="mb-4 text-center text-4xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Us
      </motion.h1>
      <motion.p
        className="mx-auto mb-10 max-w-2xl text-center text-lg text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Welcome to Vedteix Technology! We are a team of innovators, strategists, and
        problem-solvers dedicated to empowering businesses with intelligent, scalable,
        and secure solutions.
      </motion.p>

      <div className="mb-16 grid gap-8 md:grid-cols-3">
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow dark:bg-gray-900"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            {value.icon}
            <h3 className="mt-4 mb-2 text-xl font-semibold">{value.title}</h3>
            <p className="text-muted-foreground">{value.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mx-auto mb-12 max-w-2xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="mb-6 text-center text-2xl font-bold">What Our Clients Say</h2>
        <Swiper spaceBetween={24} slidesPerView={1} loop autoplay={{ delay: 5000 }}>
          {displayedTestimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.key}>
              <div className="flex flex-col items-center rounded-lg bg-background p-6 text-center shadow">
                <img src={testimonial.avatar} alt={testimonial.name} className="mb-4 h-16 w-16 rounded-full" />
                <blockquote className="mb-2 italic">“{testimonial.quote}”</blockquote>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.title}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <img src="/logo.png" alt="Vedteix Technology Logo" className="mx-auto mb-4 h-20" />
        <p className="mx-auto max-w-xl text-muted-foreground">
          We are passionate about helping businesses grow through technology. Our mission
          is to deliver value, foster innovation, and build lasting partnerships.
        </p>
      </motion.div>
    </div>
  );
}
