const ERROR_MAP: Array<{ pattern: RegExp; friendly: (match: RegExpMatchArray) => string }> = [
  {
    pattern: /NameError: name '(\w+)' is not defined/,
    friendly: (m) => `Usaste \`${m[1]}\` pero todavía no la creaste. ¿Un typo quizás?`,
  },
  {
    pattern: /IndentationError/,
    friendly: () => 'Revisá la sangría: Python usa los espacios para entender bloques de código.',
  },
  {
    pattern: /SyntaxError/,
    friendly: () => 'Hay un error de escritura. Revisá los `:`, paréntesis y comillas.',
  },
  {
    pattern: /TypeError.*str.*int|TypeError.*int.*str/,
    friendly: () => 'Estás mezclando texto y números. Quizá falta `int()` o un f-string.',
  },
  {
    pattern: /TypeError/,
    friendly: () => 'Estás usando un valor de un tipo incorrecto para esta operación.',
  },
  {
    pattern: /IndexError/,
    friendly: () => 'Pediste una posición que no existe en la lista.',
  },
  {
    pattern: /KeyError: (.+)/,
    friendly: (m) => `La clave ${m[1]} no está en el diccionario. Probá con \`.get()\` para evitar este error.`,
  },
  {
    pattern: /ZeroDivisionError/,
    friendly: () => 'Estás dividiendo por cero. Revisá el denominador.',
  },
]

export function getFriendlyError(errorType: string, errorMessage: string): string {
  const combined = `${errorType}: ${errorMessage}`
  for (const { pattern, friendly } of ERROR_MAP) {
    const match = combined.match(pattern)
    if (match) return friendly(match)
  }
  return `Error en tu código: ${errorMessage}`
}
