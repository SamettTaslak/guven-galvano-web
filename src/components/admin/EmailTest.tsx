'use client'

import { useAuth, useFormModified } from '@payloadcms/ui'
import { useState } from 'react'

/** "Bağlantıyı test et": kayıtlı ayarlarla gerçek bir test e-postası gönderir. */
export function EmailTest() {
  const { user } = useAuth()
  const modified = useFormModified()
  const [to, setTo] = useState<string>((user?.email as string) ?? '')
  const [state, setState] = useState<{ status: 'idle' | 'sending' | 'ok' | 'error'; message?: string; hint?: string | null }>({ status: 'idle' })

  const send = async () => {
    setState({ status: 'sending' })
    try {
      const res = await fetch('/api/globals/email-settings/test', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to }),
      })
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; hint?: string | null }
      setState({ status: json.ok ? 'ok' : 'error', message: json.message ?? res.statusText, hint: json.hint })
    } catch (err) {
      setState({ status: 'error', message: err instanceof Error ? err.message : String(err) })
    }
  }

  const color = state.status === 'ok' ? 'var(--theme-success-500)' : state.status === 'error' ? 'var(--theme-error-500)' : undefined

  return (
    <div style={{ border: '1px solid var(--theme-elevation-150)', borderRadius: 6, padding: 'calc(var(--base) * 1.2)', margin: 'var(--base) 0' }}>
      <h4 style={{ margin: '0 0 6px' }}>Bağlantıyı test et</h4>
      <p style={{ margin: '0 0 12px', color: 'var(--theme-elevation-600)', fontSize: 13 }}>
        Kayıtlı ayarlarla aşağıdaki adrese gerçek bir test e-postası gönderilir.
        {modified && <strong style={{ display: 'block', color: 'var(--theme-warning-600)' }}>Kaydedilmemiş değişiklikler var — önce “Kaydet”e basın.</strong>}
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input type="email" value={to} onChange={(e) => setTo(e.target.value)} placeholder="alici@firma.com" style={{ flex: '1 1 260px' }} className="field-type text" />
        <button type="button" className="btn btn--style-primary btn--size-small" style={{ margin: 0 }} disabled={state.status === 'sending' || !to} onClick={send}>
          {state.status === 'sending' ? 'Gönderiliyor…' : 'Test e-postası gönder'}
        </button>
      </div>
      {state.message && (
        <p role="status" style={{ margin: '12px 0 0', color, fontWeight: 600, whiteSpace: 'pre-wrap' }}>
          {state.status === 'ok' ? '✓ ' : '✗ '}
          {state.message}
        </p>
      )}
      {state.hint && (
        <p style={{ margin: '8px 0 0', padding: '10px 12px', borderRadius: 4, background: 'var(--theme-elevation-50)', fontSize: 13 }}>
          <strong>Çözüm önerisi: </strong>
          {state.hint}
        </p>
      )}
    </div>
  )
}
