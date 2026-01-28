import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="hero-glow">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-16 pt-20">
        <div className="flex flex-col gap-8">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">FastCuts Studio</span>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Turn long videos into <span className="gradient-text">premium short clips</span> in minutes.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            FastCuts is the AI-ready pipeline for creators and agencies. Import footage, pick templates, and ship
            perfectly-sized clips with a designer-grade finish.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/signup">Start free</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {['AI-ready workflows', 'Team workspaces', 'Affiliate rewards'].map((label) => (
              <Card key={label} className="border-0 bg-white/70 shadow-soft">
                <CardHeader>
                  <CardTitle>{label}</CardTitle>
                  <CardDescription>Ship faster with curated tools and automation.</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: 'Upload or paste a link',
              desc: 'Bring in long-form content from uploads or YouTube.'
            },
            {
              title: 'Pick a premium template',
              desc: 'Choose from ready-to-go designs and brand presets.'
            },
            {
              title: 'Publish instantly',
              desc: 'Export polished clips for every platform.'
            }
          ].map((step, index) => (
            <Card key={step.title}>
              <CardHeader>
                <span className="text-sm font-semibold text-primary">Step {index + 1}</span>
                <CardTitle>{step.title}</CardTitle>
                <CardDescription>{step.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            'Template studio with motion presets',
            'Automatic captions and formats',
            'Affiliate-friendly growth tools',
            'Workspace permissions',
            'Asset library management',
            'Detailed performance analytics'
          ].map((feature) => (
            <Card key={feature}>
              <CardContent className="pt-6">
                <p className="text-base font-medium">{feature}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              q: 'Can I invite teammates?',
              a: 'Yes. Workspaces are built for teams with admin-level controls.'
            },
            {
              q: 'Does it work with existing footage?',
              a: 'Import files or paste links. FastCuts handles the rest.'
            }
          ].map((faq) => (
            <Card key={faq.q}>
              <CardHeader>
                <CardTitle>{faq.q}</CardTitle>
                <CardDescription>{faq.a}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
