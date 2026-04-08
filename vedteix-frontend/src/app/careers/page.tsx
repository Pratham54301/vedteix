'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { companyBenefits, hiringTips, workEnvironmentImages, careerPrograms, jobOpenings as fallbackJobs } from '@/lib/careers-data';
import type { Job } from '@/lib/types';
import { CheckCircle2, Briefcase, MapPin, Clock, Users, BookOpen, Rocket, LocateFixed, Lightbulb, FileText, MessageSquare, Network } from 'lucide-react';

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        const payload = await response.json().catch(() => []);
        if (!response.ok) {
          throw new Error('Failed to load jobs');
        }

        if (!cancelled) {
          setJobs(payload);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load jobs');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadJobs();

    return () => {
      cancelled = true;
    };
  }, []);

  const displayedJobs = useMemo(() => {
    if (jobs.length > 0) {
      return jobs.map((job) => ({
        key: job._id,
        title: job.title,
        experience: job.experience || 'Not specified',
        location: job.location,
        type: job.type,
        description: job.description,
        skills: job.skills?.length ? job.skills : job.techStack || [],
        applyUrl: job.applyUrl,
        applyEmail: job.applyEmail,
      }));
    }

    return fallbackJobs.map((job, index) => ({
      key: String(index),
      title: job.title,
      experience: job.experience,
      location: job.location,
      type: job.type,
      description: job.description,
      skills: job.skills,
      applyUrl: '',
      applyEmail: 'prathams54301@gmail.com',
    }));
  }, [jobs]);

  return (
    <div className="bg-background text-foreground">
      <section className="w-full bg-secondary py-20 text-center md:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
              Join Our Innovative Team
            </h1>
            <p className="mt-4 text-muted-foreground md:text-xl">
              We&apos;re looking for passionate people to help us build the future of technology.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="#openings">View Open Positions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="why-join-us" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold text-primary">
              Life at VEDTEIX
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">More Than Just a Job</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {companyBenefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center gap-4 text-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-24 text-center">
            <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">A Glimpse Into Our World</h3>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {workEnvironmentImages.map((image, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
                  <Image src={image.src} alt={image.alt} data-ai-hint={image.hint} fill className="object-cover transition-transform duration-500 hover:scale-110" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="openings" className="w-full bg-secondary py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm font-semibold text-primary">
              Careers & Professions
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Current Openings</h2>
            {loading && <p className="text-sm text-muted-foreground">Loading openings...</p>}
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <div className="mx-auto mt-12 max-w-4xl space-y-6">
            <Accordion type="single" collapsible className="w-full">
              {displayedJobs.map((job, index) => (
                <AccordionItem value={`item-${index}`} key={job.key} className="mb-4 rounded-lg border-b bg-background shadow-sm">
                  <Card className="border-none shadow-none">
                    <AccordionTrigger className="w-full hover:no-underline">
                      <CardHeader className="flex w-full flex-row items-center justify-between p-6 text-left">
                        <div>
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <CardDescription className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2"><Briefcase className="h-4 w-4" />{job.experience}</span>
                            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" />{job.location}</span>
                            <span className="flex items-center gap-2"><Clock className="h-4 w-4" />{job.type}</span>
                          </CardDescription>
                        </div>
                      </CardHeader>
                    </AccordionTrigger>
                    <AccordionContent>
                      <CardContent className="px-6 pb-6">
                        <p className="mb-4 text-muted-foreground">{job.description}</p>
                        <h4 className="mb-2 font-semibold text-foreground">Required Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="px-6 pb-6">
                        <Button asChild>
                          {job.applyUrl ? (
                            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">Apply Now</a>
                          ) : (
                            <a href={`mailto:${job.applyEmail}?subject=Application for ${job.title}`}>Apply Now</a>
                          )}
                        </Button>
                      </CardFooter>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="programs" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold text-primary">
              Student & Graduate Programs
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Launch Your Career Here</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 lg:grid-cols-3">
            {careerPrograms.map((program, index) => {
              const Icon = { Internships: Users, 'Graduate Programs': BookOpen, Apprenticeships: Rocket }[program.title] || Users;
              return (
                <Card key={index} className="flex h-full flex-col text-center">
                  <CardHeader>
                    <div className="mx-auto w-fit rounded-full bg-primary/10 p-4"><Icon className="h-8 w-8 text-primary" /></div>
                    <CardTitle className="mt-4">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow text-muted-foreground">{program.description}</CardContent>
                  <CardFooter className="justify-center">
                    <Button asChild variant="outline">
                      <Link href="/contact">Learn More</Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="locations" className="w-full bg-secondary py-12 md:py-24 lg:py-32">
        <div className="container px-4 text-center md:px-6">
          <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm font-semibold text-primary">Our Location</div>
          <div className="mx-auto mt-12 grid max-w-lg gap-8">
            <Card className="bg-background text-left">
              <CardHeader className="flex flex-row items-center gap-4">
                <LocateFixed className="h-8 w-8 text-primary" />
                <CardTitle>Headquarters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4"><MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" /><p className="text-muted-foreground">Bopal Ghuma Road, Sanidhya, Ahmedabad, Gujarat 380058</p></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="hiring-tips" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold text-primary">Hiring Process</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tips for Success</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {hiringTips.map((tip, index) => {
              const Icon = { 'Tailor Your Resume': FileText, 'Show Your Passion': Lightbulb, 'Prepare for a Technical Discussion': MessageSquare }[tip.title] || Network;
              return <div key={index} className="grid gap-2"><div className="flex items-center gap-3"><Icon className="h-6 w-6 text-primary" /><h3 className="text-lg font-bold">{tip.title}</h3></div><p className="text-sm text-muted-foreground">{tip.description}</p></div>;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
