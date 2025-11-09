import { Button } from '@{{orgName}}/ui/components/button'

function App() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black text-white text-2xl font-bold mb-6">
            A
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-4">
            Welcome to <span className="text-purple-600">{{appName}}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A Vite + React 19 application powered by{' '}
            <a
              href="https://www.npmjs.com/package/aegis-monorepo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-purple-600 hover:text-purple-700 transition-colors"
            >
              Aegis
            </a>
            , the modern monorepo toolkit.
          </p>
        </div>

        {/* Quick Start Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="border border-gray-200 rounded-xl p-6 hover:border-purple-500 transition-colors">
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              📝 Edit This Page
            </h2>
            <p className="text-gray-600 mb-4">
              Start by editing{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                src/App.tsx
              </code>
            </p>
            <p className="text-sm text-gray-500">
              Save to see your changes with lightning-fast HMR.
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-6 hover:border-purple-500 transition-colors">
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              🎨 Shared Components
            </h2>
            <p className="text-gray-600 mb-4">
              Use components from{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                @{{orgName}}/ui
              </code>
            </p>
            <p className="text-sm text-gray-500">
              Pre-built components shared across all apps in your monorepo.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Built With Modern Tools
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Vite 5', desc: 'Build Tool' },
              { name: 'React 19', desc: 'UI Library' },
              { name: 'Tailwind CSS', desc: 'Styling' },
              { name: 'TypeScript', desc: 'Type Safety' },
            ].map((tech) => (
              <div
                key={tech.name}
                className="text-center p-4 border border-gray-200 rounded-lg hover:border-purple-500 transition-colors"
              >
                <div className="font-semibold text-gray-900">{tech.name}</div>
                <div className="text-sm text-gray-500">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Vite */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Vite?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl">⚡</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Lightning Fast HMR
                </h3>
                <p className="text-gray-600 text-sm">
                  Hot Module Replacement that stays fast regardless of app size.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl">📦</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Optimized Builds
                </h3>
                <p className="text-gray-600 text-sm">
                  Pre-configured Rollup build with multi-page and library mode support.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl">🔌</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Rich Plugin Ecosystem
                </h3>
                <p className="text-gray-600 text-sm">
                  Universal plugins that work for both dev and build with Rollup compatibility.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Monorepo Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Monorepo Features
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-semibold text-gray-900 mb-2">Turborepo</h3>
              <p className="text-sm text-gray-600">
                Fast, cached builds across your entire monorepo
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-2">Type-Safe</h3>
              <p className="text-sm text-gray-600">
                End-to-end TypeScript with shared types
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="font-semibold text-gray-900 mb-2">Hot Reload</h3>
              <p className="text-sm text-gray-600">
                Changes in shared packages update instantly
              </p>
            </div>
          </div>
        </div>

        {/* Quick Commands */}
        <div className="bg-gray-900 text-white rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Quick Commands</h2>
          <div className="space-y-3 font-mono text-sm">
            <div className="flex items-center gap-3">
              <span className="text-gray-400">$</span>
              <code className="flex-1">{{packageManager}} dev</code>
              <span className="text-gray-400 text-xs">Start dev server</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-400">$</span>
              <code className="flex-1">{{packageManager}} build</code>
              <span className="text-gray-400 text-xs">Build for production</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-400">$</span>
              <code className="flex-1">{{packageManager}} preview</code>
              <span className="text-gray-400 text-xs">Preview production build</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-400">$</span>
              <code className="flex-1">npx aegis-monorepo add vite</code>
              <span className="text-gray-400 text-xs">Add another Vite app</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://vitejs.dev/guide/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="default" size="lg">
              Vite Docs →
            </Button>
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" size="lg">
              React Docs →
            </Button>
          </a>
          <a
            href="https://www.npmjs.com/package/aegis-monorepo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg">
              Aegis Docs →
            </Button>
          </a>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>
            Scaffolded with{' '}
            <a
              href="https://www.npmjs.com/package/aegis-monorepo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Aegis
            </a>
            {' • '}
            Powered by{' '}
            <a
              href="https://vitejs.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Vite
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}

export default App
