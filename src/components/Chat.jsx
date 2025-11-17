import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Chat() {
  const [query, setQuery] = useState('How should we moderate token shilling in Discord?')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [sources, setSources] = useState([])

  const ask = async (e) => {
    e.preventDefault()
    setLoading(true)
    setAnswer('')
    setSources([])
    try {
      const res = await fetch(`${API_BASE}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })
      const data = await res.json()
      setAnswer(data.answer)
      setSources(data.used_docs || [])
    } catch (e) {
      setAnswer('Error contacting backend.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/70 backdrop-blur rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold">Ask the Assistant</h2>
      <p className="text-sm text-gray-600 mb-4"> grounded on your docs</p>
      <form onSubmit={ask} className="flex flex-col sm:flex-row gap-3">
        <input value={query} onChange={(e)=>setQuery(e.target.value)} className="flex-1 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" />
        <button disabled={loading} className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-700 text-white font-semibold">
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </form>
      {answer && (
        <div className="mt-4 p-3 bg-gray-50 rounded">
          <div className="whitespace-pre-wrap text-gray-800">{answer}</div>
          {sources.length>0 && (
            <div className="mt-2 text-xs text-gray-600">Sources: {sources.join(', ')}</div>
          )}
        </div>
      )}
    </div>
  )
}
