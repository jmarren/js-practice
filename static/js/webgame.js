window.onload = function() {
  class Page {
    constructor(gameTitle) {
      this.gameTitle = gameTitle
      this.gameTitleElement = document.getElementById("game-title")
      this.gameCenter = {
        x: (500 / 2) + 8,
        y: (500 / 2) + 26,
      }
      this.arrowInstance = new this.ArrowClass(this.gameCenter)
    }
    ArrowClass = class {
      constructor(gameCenter) {
        this.domElement = document.getElementById("arrow");
        this.theta = 0;
        this.gameCenter = gameCenter
      }
      getTheta(e) {
        const opp = e.clientX - this.gameCenter.x
        const adj = e.clientY - this.gameCenter.y
        console.log("adjacent: ", adj)
        console.log("opposite: ", opp)
        this.theta = Math.atan2(adj, opp) + (Math.PI / 180) * 90
        console.log("theta: ", this.theta * 180 / Math.PI, "degrees")
        this.render()
      }
      init() {
        this.domElement.style.left = `${this.gameCenter.x - 10}px`
        this.domElement.style.top = `${this.gameCenter.y - 60}px`
      }
      render() {
        document.documentElement.style.setProperty("--arrow-rotation", `${this.theta}rad`)
      }
    }

    init() {
      this.arrowInstance.init()
      window.addEventListener("mousemove", (e) => {
        this.arrowInstance.getTheta(e)
      })
      window.addEventListener("pointerdown", () => {

      })
      window.addEventListener("pointerup", () => {
      })
    }
  }

  const myPage = new Page("a old game")
  myPage.init()
}


