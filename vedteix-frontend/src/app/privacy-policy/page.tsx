"use client"
import { useState, useEffect } from 'react';

export default function PrivacyPolicyPage() {
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);

  return (
    <div className="bg-background">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-primary">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Last updated: {date}
            </p>
          </div>

          <div className="mt-8 text-foreground max-w-none">
            <p className="mb-6">
              VEDTEIX TECHNOLOGY (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;) operates the VEDTEIX
              website (the &quot;Service&quot;). This page informs you of our policies
              regarding the collection, use, and disclosure of personal data
              when you use our Service and the choices you have associated with
              that data.
            </p>

            <h2 className="mt-8 mb-4 text-2xl font-bold text-primary">Information Collection and Use</h2>
            <p className="mb-6">
              We collect several different types of information for various
              purposes to provide and improve our Service to you.
            </p>

            <h3 className="mt-4 mb-2 text-xl font-bold">Types of Data Collected</h3>
            <h4 className="mt-2 mb-2 font-bold">Personal Data</h4>
            <p className="mb-4">
              While using our Service, we may ask you to provide us with certain
              personally identifiable information that can be used to contact or
              identify you (&quot;Personal Data&quot;). Personally identifiable
              information may include, but is not limited to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Phone number</li>
              <li>Cookies and Usage Data</li>
            </ul>

            <h2 className="mt-8 mb-4 text-2xl font-bold text-primary">Use of Data</h2>
            <p className="mb-4">VEDTEIX TECHNOLOGY uses the collected data for various purposes:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>To provide and maintain the Service</li>
              <li>To notify you about changes to our Service</li>
              <li>
                To allow you to participate in interactive features of our
                Service when you choose to do so
              </li>
              <li>To provide customer care and support</li>
              <li>
                To provide analysis or valuable information so that we can
                improve the Service
              </li>
              <li>To monitor the usage of the Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>

            <h2 className="mt-8 mb-4 text-2xl font-bold text-primary">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact
              us by email: <a href="mailto:info@vedteix.com" className="text-primary hover:underline">info@vedteix.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
