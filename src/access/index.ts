import type { Access, FieldAccess } from 'payload'

export const anyone: Access = () => true
export const authenticated: Access = ({ req }) => Boolean(req.user)

export const isAdminUser = (user: unknown): boolean => (user as { role?: string } | null)?.role === 'admin'

/** Yalnızca "Yönetici" rolü. */
export const admins: Access = ({ req }) => isAdminUser(req.user)
export const adminsField: FieldAccess = ({ req }) => isAdminUser(req.user)

/** Yönetici her kullanıcıya, editör yalnızca kendi hesabına erişir. */
export const adminsOrSelf: Access = ({ req }) => {
  if (!req.user) return false
  if (isAdminUser(req.user)) return true
  return { id: { equals: req.user.id } }
}
