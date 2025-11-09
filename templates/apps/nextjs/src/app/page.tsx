import { Button } from '@{{orgName}}/ui/components/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col gap-8">
        <h1 className="text-4xl font-bold">Welcome to {{appName}}</h1>
        <p className="text-lg text-gray-600">
          Built with Next.js 15, React 19, and Tailwind CSS
        </p>
        <div className="flex gap-4">
          <Button variant="default">Get Started</Button>
          <Button variant="secondary">Learn More</Button>
        </div>
      </div>
    </main>
  );
}
