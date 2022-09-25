class MyPromise {
  state = 'pending'   //pending  fulfilled  rejected
  value = undefined
  reason = undefined

  resolveCallback = []
  rejectCallback = []

  constructor(fn) {
    const resolveHandler = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
        this.resolveCallback.forEach(fn => fn(this.value))
      }
    }

    const rejectHandler = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        this.rejectCallback.forEach(fn => fn(this.reason))
      }
    }

    try {
      fn(resolveHandler, rejectHandler)
    } catch (error) {
      rejectHandler(error)
    }
  }

  then(fn1, fn2) {
    fn1 === typeof fn1 === 'function' ? fn1 : (v) => v
    fn2 === typeof fn2 === 'funciton' ? fn2 : (e) => e

    if (this.state === 'pending') {
      const p1 = new MyPromise((resolve, reject) => {
        this.resolveCallback.push(() => {
          try {
            const newValue = fn1(this.value)
            resolve(newValue)
          } catch (error) {
            reject(error)
          }
        })

        this.rejectCallback.push(() => {
          try {
            const newReason = fn2(this.reason)
            reject(newReason)
          } catch (error) {
            reject(error)
          }
        })
      })
      return p1
    }
    if (this.state === 'fulfilled') {
      const p1 = new MyPromise((resolve, reject) => {
        try {
          const newValue = fn1(this.value)
          resolve(newValue)
        } catch (error) {
          reject(error)
        }
      })
      return p1
    }
    if (this.state === 'rejected') {
      const p1 = new MyPromise((resolve, reject) => {
        try {
          const newReason = fn2(this.reason)
          resolve(newReason)
        } catch (error) {
          reject(error)
        }
      })
      return p1
    }
  }

  catch(fn) {
    return this.then(null, fn)
  }
}

MyPromise.resolve = function (value) {
  return new MyPromise((resolve, reject) => resolve(value))
}

MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => reject(reason))
}

MyPromise.all = function (promiseList = []) {
  const p1 = new MyPromise((resolve, reject) => {
    const result = []
    const length = promiseList.length
    let resolvedCount = 0

    promiseList.forEach(p => {
      p.then(data => {
        result.push(data)
        resolvedCount++
        if (resolvedCount === length) {
          resolve(result)
        }
      }).catch(err => {
        reject(err)
      })
    })
  })
  return p1
}

MyPromise.race = function (promiseList = []) {
  let resolve = false
  const p1 = new MyPromise((resolve, reject) => {
    promiseList.forEach(p => {
      p.then(data => {
        if (!resolve) {
          resolve(data)
          resolve = true
        }
      }).catch((err) => {
        reject(err)
      })
    })
  })
  return p1
}