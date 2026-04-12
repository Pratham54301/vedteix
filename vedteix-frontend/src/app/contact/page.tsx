'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { SiteSettings } from '@/lib/types';

const fallbackSettings: SiteSettings = {
  companyName: 'VEDTEIX TECHNOLOGY',
  companyTagline: 'Innovating Future-Ready Digital Solutions.',
  heroTitle: 'Empowering Future-Ready Digital Solutions',
  heroSubtitle:
    'We architect and engineer high-impact digital products, delivering secure, scalable, and intelligent solutions that propel businesses into the future.',
  officeName: 'Headquarters',
  contactEmail: 'prathams54301@gmail.com',
  contactPhone: '7777967668',
  address: 'Bopal Ghuma Road, Sanidhya, Ahmedabad, Gujarat 380058',
  socialLinks: {},
  stats: {
    projectsCompleted: 100,
    happyClients: 50,
  },
};

export default function ContactPage() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<SiteSettings>(fallbackSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadSettings = async () => {
      try {
        const response = await fetch('/api/site-settings');
        if (!response.ok) {
          throw new Error('Failed to load contact details');
        }

        const payload = await response.json();
        if (!cancelled) {
          setSettings(payload);
          setError(null);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : 'Failed to load contact details');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadSettings();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container grid gap-10 px-4 md:grid-cols-[1.1fr_0.9fr] md:px-6">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {t('contact.kicker')}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t('contact.title')}
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              {t('contact.subtitle')}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('contact.formTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('contact.reachTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{t('contact.email')}</p>
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {settings.contactEmail}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{t('contact.phone')}</p>
                  <a
                    href={`tel:${settings.contactPhone}`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {settings.contactPhone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{settings.officeName}</p>
                  <p className="text-muted-foreground">{settings.address}</p>
                </div>
              </div>
              {loading && (
                <p className="text-sm text-muted-foreground">
                  {t('contact.loading')}
                </p>
              )}
              {error && <p className="text-sm text-destructive">{error}</p>}
            </CardContent>
          </Card>

          <div className="overflow-hidden rounded-2xl border border-border/60">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.0783255043394!2d72.50838251444367!3d23.030513421541105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f8f3666eaf%3A0x7cbb11ad36e981ad!2sAhmedabad%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sin!4v1625592225195!5m2!1sen!2sin"
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t('contact.mapTitle')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
