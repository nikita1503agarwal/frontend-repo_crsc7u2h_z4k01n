import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ConfigForm() {
  const [botToken, setBotToken] = useState('')
  const [geminiKey, setGeminiKey] = useState('')
  const [notes, setNotes] = useState('')
  const [savedId, setSavedId] = useState(null)
  const [configs, setConfigs] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchConfigs = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/config`)
      const data = await res.json()
      setConfigs(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchConfigs()
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSavedId(null)
    try {
      const res = await fetch(`${API_BASE}/api/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bot_token: botToken, gemini_api_key: geminiKey, notes })
      })
      const id = await res.json()
      setSavedId(id)
      setBotToken('')
      setGeminiKey('')
      setNotes('')
      fetchConfigs()
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/70 backdrop-blur rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold">Connect APIs</h2>
      <p className="text-sm text-gray-600 mb-4">Store your bot token and Gemini API key securely in the backend.</p>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Bot Access Token</label>
          <input value={botToken} onChange={(e) => setBotToken(e.target.value)} type="password" placeholder="xoxb-..." className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium">Gemini API Key</label>
          <input value={geminiKey} onChange={(e) => setGeminiKey(e.target.value)} type="password" placeholder="AIza..." className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium">Notes (optional)</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Context for this configuration" className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded py-2 transition">
          {loading ? 'Saving...' : 'Save Configuration'}
        </button>
        {savedId && <p className="text-green-600 text-sm">Saved! ID: {savedId}</p>}
      </form>

      <div className="mt-6">
        <h3 className="font-medium">Recent configurations</h3>
        <ul className="mt-2 space-y-2">
          {configs.map((c) => (
            <li key={c.id} className="text-sm text-gray-700 bg-gray-50 rounded p-2">
              <span className="font-mono">{c.id}</span> — {c.notes || 'no notes'}
            </li>
          ))}
          {configs.length === 0 && <li className="text-sm text-gray-500">No configs yet.</li>}
        </ul>
      </div>
    </div>
  )
}
