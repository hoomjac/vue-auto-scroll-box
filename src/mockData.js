let idCounter = 0

export function getData(count) {
  const data = []
  for (let index = 0; index < count; index++) {
    data.push({
      id: String(idCounter++),
      text: Math.random()
        .toString(16)
        .substr(10),
    })
  }
  return data
}
