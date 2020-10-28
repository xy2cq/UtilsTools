import React, { Component } from 'react'
import _ from 'lodash'

import './index.less'

class HomeView extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 4, 5, 6, 7, 8, 9, 3, 4, 5, 6, 7, 8, 9]
    }
    this.source = []
    this.container = null
  }

  componentDidMount = () => {
    this.init()
  }

  init = () => {
    // trans.style.transform = "translate3d(0, "+k +", 0)";

    this.source.map((drag, index) => {
      drag.onmousedown = event => {
        const currentEvent = event || window.event // 兼容IE浏览器
        const clickX = event.x
        const clickY = event.y
        let diffY = 0
        let diffX = 0
        const originIndex = index
        let currentIndex = index
        const currentDom = currentEvent.target

        currentDom.style.zIndex = 5000
        currentDom.style.position = 'fixed'
        currentDom.style.width = '300px'
        currentDom.style.top = `${1 + currentDom.getBoundingClientRect().y + currentDom.parentNode.getBoundingClientRect().y}px`
        currentDom.classList.remove('box11')
        document.getElementsByTagName('*').item(0).style.cursor = 'pointer'

        this.mengban.style.zIndex = 4000

        // 监听全局的dom移动事件
        document.onmousemove = event => {
          var event = event || window.event // 兼容IE浏览器

          diffY = event.y - clickY
          diffX = event.x - clickX

          currentEvent.target.style.transform = `translate3d(${diffX}px, ${diffY}px, 0)`
          this.source.map((other, otherIndex) => {
            if (otherIndex === index) { return false }
            if (diffY > 0) {
              currentIndex = parseInt((diffY + 25) / 50) + index
              if (originIndex < otherIndex && currentIndex >= otherIndex) {
                other.style.transform = 'translate3d(0, -50px, 0)'
              } else {
                other.style.transform = 'translate3d(0, 0, 0)'
              }
            } else {
              currentIndex = parseInt((diffY - 25) / 50) + index
              if (originIndex > otherIndex && currentIndex <= otherIndex) {
                other.style.transform = 'translate3d(0, 50px, 0)'
              } else {
                other.style.transform = 'translate3d(0, 0, 0)'
              }
            }
          })
        }
        document.onmouseup = event => {
          this.mengban.style.zIndex = 2000
          currentDom.style.zIndex = 3000
          currentDom.style.position = 'absolute'

          console.log('currentIndex', currentIndex)
          if (currentIndex < 0) {
            currentIndex = 0
          }

          currentDom.style.top = `${parseInt(index / 2) * 50}px`
          currentDom.style.transform = `translate3d(0, ${(currentIndex - originIndex) * 50}px, 0)`
          currentDom.style.width = '300px'
          document.onmousemove = null
          document.onmouseup = null

          // 回显的时候去除动画效果
          this.source.map((other, otherIndex) => {
            other.style = null
            other.style.top = `${50 * parseInt(otherIndex / 2)}px`
            other.style.left = `${300 * parseInt(otherIndex % 2)}px`
            other.classList.remove('box11')
          })

          // 异步恢复动画
          setTimeout(() => {
            this.source.map((other, otherIndex) => {
              other.classList.add('box11')
            })
          }, 0)

          const { list } = this.state
          const temp = list[originIndex]
          list.splice(originIndex, 1)
          list.splice(currentIndex, 0, temp)

          this.setState({ list: JSON.parse(JSON.stringify(list)) })
        }
      }
    })
  }

  render() {
    const { list } = this.state
    this.source = []
    console.log(list)
    return (
      <div className="home-layout">
        <div
          ref={ref => { this.mengban = ref }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 3000,
          }}
        />
        <div className="box2" id="target" ref={ref => { this.container = ref }}>
          {
            list.map((item, index) => (
              <div
                style={{ top: 50 * parseInt(index / 2), left: 300 * parseInt(index % 2) }}
                key={index}
                className="box1 box11"
                draggable="false"
                ref={ref => {
                  if (ref) {
                    this.source.push(ref)
                  }
                }}
              >
                {item}
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default HomeView
