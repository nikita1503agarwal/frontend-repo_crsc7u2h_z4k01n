import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function DocsUploader() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [docs, setDocs] = useState([])
  const [saving, setSaving] = useState(false)

  const fetchDocs = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/docs`)
      const data = await res.json()
      setDocs(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchDocs()
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch(`${API_BASE}/api/docs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : undefined })
      })
      await res.json()
      setTitle('')
      setContent('')
      setTags('')
      fetchDocs()
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-white/70 backdrop-blur rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold">Upload Documentation</h2>
      <p className="text-sm text-gray-600 mb-4">Paste product docs, terms, and policies. They ground the assistant’s answers.</p>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="e.g., Moderation Policy" />
        </div>
        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea value={content} onChange={(e)=>setContent(e.target.value)} rows={6} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Paste text here" />
        </div>
        <div>
          <label className="block text-sm font-medium">Tags (comma separated)</label>
          <input value={tags} onChange={(e)=>setTags(e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="policy, faq" />
        </div>
        <button disabled={saving} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded py-2 transition">
          {saving ? 'Saving...' : 'Add Document'}
        </button>
      </form>

      <div className="mt-6">
        <h3 className="font-medium">Knowledge base</h3>
        <ul className="mt-2 space-y-2 max-h-48 overflow-auto">
          {docs.map((d)=> (
            <li key={d.id} className="text-sm text-gray-700 bg-gray-50 rounded p-2">
              <div className="font-semibold">{d.title}</div>
              <div className="text-gray-600 line-clamp-2">{d.content}</div>
              {d.tags && d.tags.length>0 && (
                <div className="text-xs text-gray-500 mt-1">{d.tags.join(', ')}</div>
              )}
            </li>
          ))}
          {docs.length===0 && <li className="text-sm text-gray-500">No documents yet.</li>}
        </ul>
      </div>
    </div>
  )
}
