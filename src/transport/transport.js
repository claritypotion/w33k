import { fixture } from './fixture'

const days = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']

export function decode (json = fixture) {
  const decoded = days.reduce((prev, day) => {
    const state = (new Array(24)).fill(false)

    if (json[day] && json[day].length) {
      json[day].forEach(interval => {
        const start = Math.ceil(interval.bt / 60)
        const end = Math.ceil(interval.et / 60)

        for (let i = start; i < end; i++) {
          state[i] = true
        }
      })
    }

    return [...prev, ...state]
  }, [])

  return decoded
}

export function encode (state) {
  const encoded = days.reduce((prev, day) => {
    prev[day] = []
    return prev
  }, {})

  let i = 0
  while (i < 7 * 24) {
    if (!state[i]) {
      i++
      continue
    }

    let dayI = Math.floor(i / 24)
    let start = i
    let end = i
    while (dayI == Math.floor((i + 1) / 24) && state[i + 1]) {
      i++
      end = i
    }

    let day = days[dayI]
    encoded[day].push({
      bt: (start - dayI * 24) * 60,
      et: (end - dayI * 24) * 60 + 59
    })

    i++
  }

  return encoded
}
