window.onload = function() {
  class Page {
    constructor(gameTitle) {
      this.gameTitle = gameTitle
      this.gameTitleElement = document.getElementById("game-title")
      this.arrow = {
        domElement: document.getElementById("arrow"),
        theta: 0,
      }
      this.gameCenter = {
        x: (500 / 2) + 8,
        y: (500 / 2) + 26,
      }
    }
    init() {
      this.arrow.domElement.style.left = `${this.gameCenter.x - 10}px`
      this.arrow.domElement.style.top = `${this.gameCenter.y - 60}px`

      window.addEventListener("mousemove", (e) => {
        const opp = e.clientX - this.gameCenter.x
        const adj = e.clientY - this.gameCenter.y
        console.log("adjacent: ", adj)
        console.log("opposite: ", opp)
        this.arrow.theta = Math.atan2(adj, opp) + (Math.PI / 180) * 90
        console.log("theta: ", this.arrow.theta * 180 / Math.PI, "degrees")
        this.render()
      })
      window.addEventListener("pointerdown", () => {

      })
      window.addEventListener("pointerup", () => {
      })
    }

    render() {
      document.documentElement.style.setProperty("--arrow-rotation", `${this.arrow.theta}rad`)
    }

  }

  const myPage = new Page("a old game")
  myPage.init()
}


