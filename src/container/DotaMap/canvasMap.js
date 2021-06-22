import React, { Component } from 'react'
import { forEach } from 'lodash'
import Hero from './hero'

export default class CanvasMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 430, // 宽度
      height: 430,
      initList: [],
    }
    this.heros = [] // 英雄对象缓存
    this.initArr = []
    this.startValue = 0 // 动画开始点
    this.endValue = 1 // 动画结束点
    // 点的位置比例
    this.rem = { x: 1, y: 1 }
    this.bgPic = new Image() // 底图对象
  }

  componentDidMount() {
    this.setDataList(this.props.list)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.mapChange != this.props.mapChange) {
      this.setDataList(nextProps.list)
    }
  }

  // 组合数据
  setDataList = res => {
    const list = []
    forEach(res, item => {
      list.push({
        id: item.player.id,
        camp: item.camp,
        active: item.active,
        img: item.hero.icon,
        x: ((item.position_x + 8192) / 16384) * 430,
        y: (1 - (item.position_y + 8192) / 16384) * 430,
      })
    })
    this.combination(list)
  }

  // 开始与结束点数据结合
  combination = data => {
    const list = []
    forEach(data, (item, index) => {
      const arr = this.state.initList.length ? this.getSplitData([this.state.initList[index], item], 25) : this.getSplitData([item, item], 25)
      list.push(arr)
    })
    this.seTinit(list)
    this.setState({
      initList: data
    })
  }

  seTinit = initArr => {
    this.heros = []
    if (this.loopId) window.cancelAnimationFrame(this.loopId)
    if (this.canvas1) {
      this.ctx1 = this.canvas1.getContext('2d')
      for (let i = 0, len = initArr.length; i < len; i++) {
        const objHero = `objHreo${i}` // 动态定义变量名
        const data = {}
        data[objHero] = new Hero()
        data[objHero].init(initArr[i])
        // const imgObj = new Image()
        // imgObj.src = initArr[i][0].img
        // imgObj.onload = ()=>{
        //   data[objHero].init(initArr[i])
        // }
        data.radiantData = initArr[i]
        this.heros.push(data)
      }
    }
    // 将结束时间更改为初始值
    this.startValue = this.endValue

    this.lastTime = Date.now()
    this.deltaTime = 0
    this.gameLoop() // 循环
  }

  gameLoop = () => {
    const { width, height } = this.state
    this.loopId = window.requestAnimationFrame(this.gameLoop)
    const now = Date.now()
    this.deltaTime = now - this.lastTime // 两帧之间的时间间隔
    this.lastTime = now
    if (this.deltaTime > 40) this.deltaTime = 40

    this.ctx1.clearRect(0, 0, width, height) // 清空之后再绘制
    // 绘制英雄动画
    for (let i = 0, len = this.heros.length; i < len; i++) {
      this.heros[i][`objHreo${i}`].draw(
        this.heros[i].radiantData,
        this.deltaTime,
        this.ctx1,
        this.loopId
      )
    }
  }

  // 数据处理
  getSplitData = (vertices, num) => {
    const waypoints = []
    // for (var i = 1; i < vertices.length; i++) {
    // console.log(vertices)
    const pt0 = vertices[0]
    const pt1 = vertices[1]
    const dx = pt1.x - pt0.x
    const dy = pt1.y - pt0.y
    for (let j = 0; j < num; j++) {
      const x = pt0.x + (dx * j) / num
      const y = pt0.y + (dy * j) / num
      waypoints.push({
        x: x.toFixed(2),
        y: y.toFixed(2),
        img: pt1.img,
        camp: pt1.camp,
        active: pt1.active,
      })
    }
    // }
    return waypoints
  }

  render() {
    return (
      <div className="allCanvas">
        <canvas
          className="canvas1"
          ref={r => (this.canvas1 = r)}
          width="430px"
          height="430px"
        />
      </div>
    )
  }
}
