'use client'

import { FieldDescription, FieldLabel, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import { useState } from 'react'

/** Şifre alanı: değer maskelenir, kayıtlı değer hiçbir zaman gösterilmez (sunucu göndermez). */
export const SecretField: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField<string>({ path })
  const [visible, setVisible] = useState(false)

  return (
    <div className="field-type text" style={{ marginBottom: 'var(--base)' }}>
      <FieldLabel label={field.label} path={path} />
      <div className="field-type__wrap" style={{ display: 'flex', gap: 8 }}>
        <input
          id={`field-${path.replace(/\./g, '__')}`}
          type={visible ? 'text' : 'password'}
          autoComplete="new-password"
          spellCheck={false}
          value={value ?? ''}
          onChange={(e) => setValue(e.target.value)}
          placeholder="••••••••"
          style={{ flex: 1 }}
        />
        <button type="button" className="btn btn--style-secondary btn--size-small" style={{ margin: 0 }} onClick={() => setVisible((v) => !v)}>
          {visible ? 'Gizle' : 'Göster'}
        </button>
      </div>
      <FieldDescription description={field.admin?.description} path={path} />
    </div>
  )
}
