function toStringValue(value) {
  if (typeof value !== 'string') {
    return ''
  }

  return value
}

function normalizeBaseText(value) {
  return toStringValue(value)
    .normalize('NFKC')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g, '')
}

function normalizeSingleLine(value) {
  return normalizeBaseText(value)
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeMessageText(value) {
  return normalizeBaseText(value)
    .replace(/\r\n?/g, '\n')
    .replace(/[\t ]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[!?.,]{4,}/g, (match) => match.slice(0, 3))
    .trim()
}

function normalizeContactPayload(payload = {}) {
  return {
    name: normalizeSingleLine(payload.name),
    email: normalizeSingleLine(payload.email).toLowerCase(),
    message: normalizeMessageText(payload.message),
  }
}

module.exports = {
  normalizeContactPayload,
}
