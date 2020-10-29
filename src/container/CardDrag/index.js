import React, { Component } from 'react'
import _ from 'lodash'

import './index.less'

class CardDrag extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      cardWidth: 300,
      cardHeight: 100,
      lineNum: 2,
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
        currentDom.style.width = `${this.state.cardWidth}px`
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
            if (diffY > (this.state.cardHeight/2)) {
              if(diffX < 0 ){
                currentIndex = parseInt((diffY + this.state.cardHeight/2) / this.state.cardHeight) * this.state.lineNum + index - 1
                console.log(index, diffY, diffX, currentIndex)
                if (currentIndex === otherIndex) {
                  other.style.transform = `translate3d(${this.state.cardWidth}px, -${this.state.cardHeight}px, 0)`
                }    
                else {
                  other.style.transform = 'translate3d(0, 0, 0)'
                }
              }
              else {
                currentIndex = parseInt((diffY + this.state.cardHeight/2) / this.state.cardHeight) + index
                if (originIndex < otherIndex && currentIndex >= otherIndex) {                    
                  other.style.transform = `translate3d(0, -${this.state.cardHeight}px, 0)`  
                }   else {
                  other.style.transform = 'translate3d(0, 0, 0)'
                }        
              }  
                  
            } else if(diffY < -(this.state.cardHeight/2)){
              currentIndex = parseInt((diffY - this.state.cardHeight/2) / this.state.cardHeight) + index
              console.log(index, diffY, diffX, currentIndex)
              if (originIndex > otherIndex && currentIndex <= otherIndex) {
                if(diffX < 0 ){
                  other.style.transform = `translate3d(${this.state.cardWidth}px, ${this.state.cardHeight}px, 0)`
                } else {                  
                  other.style.transform = `translate3d(0, ${this.state.cardHeight}px, 0)`
                }   
              } else {
                other.style.transform = 'translate3d(0, 0, 0)'
              }
            } else {
              if(diffX < 0 ){
                currentIndex = index - 1
                console.log(index, diffY, diffX, currentIndex)
                if (currentIndex === otherIndex) {
                  other.style.transform = `translate3d(${this.state.cardWidth}px, 0, 0)`
                }    
                else {
                  other.style.transform = 'translate3d(0, 0, 0)'
                }
              }
              if(diffX > 0 ){
                currentIndex = index + 1
                console.log(index, diffY, diffX, currentIndex)
                if (currentIndex === otherIndex) {
                  other.style.transform = `translate3d(-${this.state.cardWidth}px, 0, 0)`
                }    
                else {
                  other.style.transform = 'translate3d(0, 0, 0)'
                }
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

          currentDom.style.top = `${parseInt(index / this.state.lineNum) * this.state.cardHeight }px`
          currentDom.style.transform = `translate3d(0, ${(currentIndex - originIndex) * this.state.cardHeight }px, 0)`
          currentDom.style.width =  `${this.state.cardWidth}px`
          document.onmousemove = null
          document.onmouseup = null

          // 回显的时候去除动画效果
          this.source.map((other, otherIndex) => {
            other.style = null
            other.style.top = `${this.state.cardHeight * parseInt(otherIndex / this.state.lineNum)}px`
            other.style.left = `${this.state.cardWidth * parseInt(otherIndex % this.state.lineNum)}px`
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

          this.setState({ list: JSON.parse(JSON.stringify(list)) }, ()=>{
            console.log(this.state.list)
          })
        }
      }
    })
  }

  render() {
    const { list, cardWidth, cardHeight, lineNum } = this.state
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
                style={{ top: cardHeight * parseInt(index / lineNum), left: cardWidth * parseInt(index % lineNum) }}
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

export default CardDrag
