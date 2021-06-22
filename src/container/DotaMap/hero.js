class Hero {
  constructor(x, y) {
    this.x = x // x坐标
    this.y = y // y坐标
    this.img = new Image()
    this.posTimer = 0 // 计时器
    this.posCount = 0 // 执行到某一帧
  }

  init = data => {
    this.img.src = data[0].img
  }

  draw = (data, deltaTime, ctx1, loopId) => {
    // 计数器功能，使对象动起来
    this.posTimer += deltaTime
    if (this.posTimer > 10) {
      this.posCount = (this.posCount + 1) % data.length // 保持在0到数组长度之间
      this.posTimer %= 10 // 重置计数器
    }
    const posCount = this.posCount

    // 开始绘图
    ctx1.beginPath()
    ctx1.save()

    const r = data[posCount].active ? 25 : 20
    const w = data[posCount].active ? 46 : 32


    if (data[posCount].active) {
      ctx1.arc(data[posCount].x - r / 2, data[posCount].y - r / 2, r, 0, 2 * Math.PI)

      ctx1.fillStyle = data[posCount].camp == 'radiant' ? 'rgba(129, 240, 17, 0.3)' : 'rgba(240, 71, 17, 0.3)'
      ctx1.strokeStyle = data[posCount].camp == 'radiant' ? '#49e314' : '#e31434'

      ctx1.fill()
      ctx1.stroke()

      ctx1.drawImage(
        this.img,
        data[posCount].x - w / 2 - r / 2,
        data[posCount].y - w / 2 - r / 2,
        w,
        w
      )
    } else {
      ctx1.drawImage(
        this.img,
        data[posCount].x - w / 2 - r / 2,
        data[posCount].y - w / 2 - r / 2,
        w,
        w
      )

      ctx1.arc(data[posCount].x - r / 2, data[posCount].y - r / 2, r, 0, 2 * Math.PI)

      ctx1.fillStyle = data[posCount].camp == 'radiant' ? 'rgba(129, 240, 17, 0.3)' : 'rgba(240, 71, 17, 0.3)'
      ctx1.strokeStyle = data[posCount].camp == 'radiant' ? '#49e314' : '#e31434'

      ctx1.fill()
      ctx1.stroke()
    }

    ctx1.restore()
    ctx1.closePath()
    if (loopId && this.posCount + 1 === data.length - 1) {
      // 若是 数组长度和 当前索引相则取消动画
      window.cancelAnimationFrame(loopId)
    }
  }
}
export default Hero
