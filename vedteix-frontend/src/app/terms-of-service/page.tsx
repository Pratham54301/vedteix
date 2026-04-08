"use client"
import { useState, useEffect } from 'react';

export default function TermsOfServicePage() {
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
              Terms of Service
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Last updated: {date}
            </p>
          </div>

          <div className="mt-8 text-foreground max-w-none">
            <h2 className="mt-8 mb-4 text-2xl font-bold text-primary">1. Terms</h2>
            <p className="mb-6">
              By accessing this website, you are agreeing to be bound by these
              website Terms and Conditions of Use, all applicable laws and
              regulations, and agree that you are responsible for compliance with
              any applicable local laws. If you do not agree with any of these
              terms, you are prohibited from using or accessing this site. The
              materials contained in this website are protected by applicable
              copyright and trade mark law.
            </p>

            <h2 className="mt-8 mb-4 text-2xl font-bold text-primary">2. Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily download one copy of the
              materials (information or software) on VEDTEIX TECHNOLOGY's website
              for personal, non-commercial transitory viewing only. This is the
              grant of a license, not a transfer of title, and under this license
              you may not:
            </p>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li>modify or copy the materials;</li>
              <li>
                use the materials for any commercial purpose, or for any public
                display (commercial or non-commercial);
              </li>
              <li>
                attempt to decompile or reverse engineer any software contained
                on VEDTEIX TECHNOLOGY's website;
              </li>
              <li>
                remove any copyright or other proprietary notations from the
                materials; or
              </li>
              <li>
                transfer the materials to another person or "mirror" the
                materials on any other server.
              </li>
            </ol>
            <p className="mb-6">
              This license shall automatically terminate if you violate any of
              these restrictions and may be terminated by VEDTEIX TECHNOLOGY at
              any time.
            </p>

            <h2 className="mt-8 mb-4 text-2xl font-bold text-primary">3. Disclaimer</h2>
            <p className="mb-6">
              The materials on VEDTEIX TECHNOLOGY's website are provided "as is".
              VEDTEIX TECHNOLOGY makes no warranties, expressed or implied, and
              hereby disclaims and negates all other warranties, including
              without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </p>
            
            <h2 className="mt-8 mb-4 text-2xl font-bold text-primary">4. Governing Law</h2>
            <p className="mb-6">
                Any claim relating to VEDTEIX TECHNOLOGY's website shall be governed
                by the laws of India without regard to its conflict of law
                provisions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
