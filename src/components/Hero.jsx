import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-purple-600 via-blue-600 to-amber-500 bg-clip-text text-transparent">
          DeFi Moderation AI Assistant
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-700">
          Connect your bot, plug in Gemini, and ground it on your product docs. Moderate discourse with confidence.
        </p>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 to-white/80" />
    </section>
  )
}
