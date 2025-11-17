import Hero from './components/Hero'
import ConfigForm from './components/ConfigForm'
import DocsUploader from './components/DocsUploader'
import Chat from './components/Chat'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <header className="py-6 px-6 flex items-center justify-between">
        <div className="font-bold text-xl">DeFi Mod AI</div>
        <nav className="text-sm text-gray-600 flex gap-4">
          <a href="/test" className="hover:underline">Status</a>
          <a href="#docs" className="hover:underline">Docs</a>
          <a href="#chat" className="hover:underline">Assistant</a>
        </nav>
      </header>

      <Hero />

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-2">
        <ConfigForm />
        <Chat />
        <div id="docs" className="md:col-span-2">
          <DocsUploader />
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-gray-500">
        Built for DeFi communities to keep conversations safe and on-policy.
      </footer>
    </div>
  )
}

export default App
