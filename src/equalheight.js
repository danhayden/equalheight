function equalheight (selector) {
  let tallestHeight = 0

  function runEqualheight () {
    const elements = document.querySelectorAll(selector)
    const scrollTop = document.body.scrollTop
    let row = []
    let rowOffsetTop = 0

    Array.prototype.forEach.call(elements, (element) => {
      element.style.height = 'auto'
      const elementOffsetTop = element.getBoundingClientRect().top + scrollTop
      const elemHeight = parseInt(window.getComputedStyle(element).height, 10)

      if (elementOffsetTop === rowOffsetTop) {
        tallestHeight = Math.max(elemHeight, tallestHeight)
      } else {
        setRowHeight(row)
        row = []
        rowOffsetTop = elementOffsetTop
        tallestHeight = elemHeight
      }

      row.push(element)
    })

    setRowHeight(row) // run for last row
  }

  function setRowHeight (row) {
    row.forEach((element) => {
      element.style.height = tallestHeight + 'px'
    })
  }

  const readyStateCheckInterval = setInterval(() => {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval)
      runEqualheight()
    }
  }, 10)

  window.addEventListener('resize', () => {
    tallestHeight = 0
    runEqualheight()
  }, true)

  runEqualheight()
}

export default equalheight
