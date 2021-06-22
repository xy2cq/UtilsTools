import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Map from './map'
import {framesData} from './config'
// import Player from './player' 这个是要的，暂时屏蔽了
import './style'

@withRouter

class DotaMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showTab: 1,
    }
  }

  componentDidMount() {}

  render() {
    const { framesData, gameData } = this.props
    const webp = false
    const { showTab } = this.state
    return (
      <div id="DotaMap">
        {/* <div className="map-tabs">
          <div className={`${showTab === 1 ? 'active' : ''} tab-item`} onClick={() => { this.setState({ showTab: 1 }) }}><div className="bg" /><span>地图模式</span></div>
          <div className={`${showTab === 2 ? 'active' : ''} tab-item`} onClick={() => { this.setState({ showTab: 2 }) }}><div className="bg" /><span>选手数据模式</span></div>
        </div> */}
        {
          showTab === 1 && <Map framesData={framesData} webp={webp} gameData={gameData} />
        }
        {/* {
          showTab === 2 && <Player gameData={gameData} webp={webp} />
        } */}
      </div>
    )
  }
}

export default DotaMap
