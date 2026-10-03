export interface SimulateOptions {
  delayMs?: number
  failRate?: number
}

export const simulateRequest = <T>(data: T, options: SimulateOptions = {}): Promise<T> => {
  const { delayMs = 600, failRate = 0 } = options

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (failRate > 0 && Math.random() < failRate) {
        reject(new Error('Network request failed'))
        return
      }
      resolve(data)
    }, delayMs)
  })
}
