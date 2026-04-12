'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { services as fallbackServices } from '@/lib/data';
import { serviceIconMap } from '@/lib/service-icons';
import type { Service } from '@/lib/types';
import { useTranslation } from 'react-i18next';

export default function ServicesPage() {
  const { t } = useTranslation();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadServices = async () => {
      try {
        const response = await fetch('/api/services');
        const payload = await response.json().catch(() => []);
        if (!response.ok) {
          throw new Error(t('servicesPage.loadFailed'));
        }

        if (!cancelled) {
          setServices(payload);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : t('servicesPage.loadFailed'));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadServices();

    return () => {
      cancelled = true;
    };
  }, [t]);

  const visibleServices = useMemo(() => {
    if (services.length > 0) {
      return services;
    }

    return fallbackServices.map((service, index) => ({
      _id: String(index),
      title: service.title,
      description: service.description,
      iconName: service.iconName,
      featured: false,
      sortOrder: index,
    }));
  }, [services]);

  return (
    <div className="container mx-auto py-16">
      <motion.h1
        className="mb-4 text-center text-4xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('servicesPage.title')}
      </motion.h1>
      <motion.p
        className="mx-auto mb-10 max-w-2xl text-center text-lg text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t('servicesPage.subtitle')}
      </motion.p>

      {loading && <p className="mb-6 text-center text-sm text-muted-foreground">{t('servicesPage.loading')}</p>}
      {error && <p className="mb-6 text-center text-sm text-destructive">{error}</p>}

      <div className="grid gap-8 md:grid-cols-3">
        {visibleServices.map((service, index) => {
          const Icon = serviceIconMap[service.iconName] || serviceIconMap.Code;
          return (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="h-full border-border/60 bg-card/70 shadow-sm backdrop-blur">
                <CardHeader className="items-center text-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-3">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  {service.description}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
