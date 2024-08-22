window.onload = function() {
  class Page {
    constructor(gameTitle) {
      this.gameTitle = gameTitle
      this.gameTitleElement = document.getElementById("game-title")
      this.moveableBlock = document.getElementById("moveable-block")
      this.moveableBlockState = {
        positionX: 0,
        positionY: 0,
      }
      this.arrowContainerElement = document.getElementById("arrow-container")
      this.arrowElement = document.getElementById("arrow")
      this.arrow = {
        rotation: 0,
        windup: 0,
        windupTime: 0,
        windupInterval: null,
        isShooting: false,
      }

      let arrowClientRect = this.arrowElement.getBoundingClientRect()
      this.centerLocation = {
        x: arrowClientRect.x + (arrowClientRect.width / 2),
        y: arrowClientRect.y + (arrowClientRect.height / 2),
      }
    }
    init() {
      window.addEventListener("mousemove", (e) => {
        let opposite = e.clientX - this.centerLocation.x
        let adjacent = e.clientY - this.centerLocation.y
        const theta = (Math.atan2(opposite, adjacent) * 180) / Math.PI
        this.arrow.rotation = theta
        this.renderArrowContainer()
      })
      window.addEventListener("pointerdown", () => {
        this.arrow.windupInterval = setInterval(() => {
          console.log(this.arrow.windupTime)
          this.arrow.windupTime = this.arrow.windupTime + 0.1
          this.arrow.windup = ((60 * this.arrow.windupTime) - 9) / (this.arrow.windupTime + 1)
          console.log(this.arrow.windup)
          this.renderPointer()
        }, 10
        )
      })
      window.addEventListener("pointerup", () => {
        clearInterval(this.arrow.windupInterval)
        this.arrow.windupTime = 0
        this.arrow.windup = 0
        this.renderPointer()
      })
    }

    renderPointer() {
      if (!this.arrow.isShooting) {
        this.arrowElement.style.transform = `translateY(${60 - this.arrow.windup}px)`
      } else {
        // this.arrowElement.style.transform = `translateY(${}`
      }
    }


    renderKeyPress() {
      const transform = `translateX(${this.moveableBlockState.positionX * 10}px) translateY(${this.moveableBlockState.positionY * 10}px)`
      this.moveableBlock.style.transform = transform
    }
    renderArrowContainer() {
      this.arrowContainerElement.style.transform = `rotate(${-1 * this.arrow.rotation}deg)`
    }
  }

  const myPage = new Page("a old game")
  myPage.init()
}


