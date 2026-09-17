import { createContext, useContext } from 'react'
import { textes } from './textes'

const LangueContext = createContext('fr')

export function LangueProvider({ langue, children }) {
  return <LangueContext.Provider value={langue}>{children}</LangueContext.Provider>
}

/** Langue courante et dictionnaire associé : `const { langue, t } = useLangue()`. */
export function useLangue() {
  const langue = useContext(LangueContext)
  return { langue, t: textes[langue] }
}
