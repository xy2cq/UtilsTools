import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import lodash from 'lodash'
// import fetch from '~/controllers/fetch'
// import { INDEX_PATH } from '~/controllers'
import CanvasMap from './canvasMap'
import './style'
import { resizeImg, onErrorImg, compareSort } from '~/client/utils'
import Nodata from '~/client/component/NoData'

const radiantTowerDot = [
  { x: 152.6, y: 178.8, name: '基地下塔', icon: 'radiantMiddle', lane: 3, layer: 4 },
  { x: 125.6, y: 202.8, name: '基地上塔', icon: 'radiantMiddle', lane: 1, layer: 4 },
  { x: 296.5, y: 152.5, name: '下3', icon: 'radiantBottom', lane: 3, layer: 3 },
  { x: 607, y: 136.5, name: '下2', icon: 'radiantBottom', lane: 3, layer: 2 },
  { x: 978, y: 153.5, name: '下1', icon: 'radiantBottom', lane: 3, layer: 1 },
  { x: 225.6, y: 271.8, name: '中3', icon: 'radiantMiddle', lane: 2, layer: 3 },
  { x: 327.6, y: 378.8, name: '中2', icon: 'radiantMiddle', lane: 2, layer: 2 },
  { x: 461.6, y: 484.8, name: '中1', icon: 'radiantMiddle', lane: 2, layer: 1 },
  { x: 105, y: 347, name: '上3', icon: 'radiantTop', lane: 1, layer: 3 },
  { x: 118, y: 539, name: '上2', icon: 'radiantTop', lane: 1, layer: 2 },
  { x: 124, y: 734, name: '上1', icon: 'radiantTop', lane: 1, layer: 1, }
]
const radiantBarracksDot = [
  { x: 272.5, y: 173.5, name: '下远', lane: 3, ranged: true },
  { x: 272.5, y: 135.5, name: '下近', lane: 3, ranged: false },
  { x: 199.7, y: 270.3, name: '中远', rotate: -45, lane: 2, ranged: true },
  { x: 226.4, y: 244, name: '中近', rotate: 45, lane: 2, ranged: false },
  { x: 87, y: 323, name: '上远', lane: 1, ranged: true },
  { x: 125, y: 323, name: '上近', lane: 1, ranged: false }
]
const direTowerDot = [
  { x: 151, y: 214, name: '基地下塔', icon: 'direMiddle', lane: 3, layer: 4 },
  { x: 177, y: 190, name: '基地上塔', icon: 'direMiddle', lane: 1, layer: 4 },
  { x: 125, y: 369, name: '下3', icon: 'direBottom', lane: 3, layer: 3 },
  { x: 143, y: 586, name: '下2', icon: 'direBottom', lane: 3, layer: 2 },
  { x: 137, y: 740, name: '下1', icon: 'direBottom', lane: 3, layer: 1 },
  { x: 258, y: 296, name: '中3', icon: 'direMiddle', lane: 2, layer: 3 },
  { x: 384, y: 425, name: '中2', icon: 'direMiddle', lane: 2, layer: 2 },
  { x: 515, y: 550, name: '中1', icon: 'direMiddle', lane: 2, layer: 1 },
  { x: 317, y: 163, name: '上3', icon: 'direTop', lane: 1, layer: 3 },
  { x: 607, y: 147, name: '上2', icon: 'direTop', lane: 1, layer: 2 },
  { x: 992, y: 155, name: '上1', icon: 'direTop', lane: 1, layer: 1 },
]
const direBarracksDot = [
  { x: 147, y: 350, name: '下远', lane: 3, ranged: true },
  { x: 109, y: 350, name: '下近', lane: 3, ranged: false },
  { x: 258, y: 273.7, name: '中远', rotate: -45, lane: 2, ranged: true },
  { x: 230, y: 298.6, name: '中近', rotate: 45, lane: 2, ranged: false },
  { x: 294.4, y: 145.1, name: '上远', lane: 1, ranged: true },
  { x: 294.4, y: 182.1, name: '上近', lane: 1, ranged: false },
]


@withRouter

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      direPlayerList: [],
      radiantPlayerList: [],
      playersList: [],
      player1active: 0,
      player2active: 0,
      radiantTowerState: [],
      direTowerState: [],
      radiantBarracksState: [],
      direBarracksState: [],
      dataTimeKey: 0,
      mapChange: 0,
      nodata: false
    }
  }

  componentDidMount() {
    if (this.props.gameData.finished) {
      const index = this.props.framesData.length - 1
      this.setState({
        dataTimeKey: index
      }, () => {
        this.formatDataByTime(index)
      })
    } else {
      this.formatDataByTime('start')
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   this.statsData(nextProps.teamData)
  // }

  // getMatchDetail = () => {
  //   fetch({
  //     url: `${INDEX_PATH}/tes/dota2/pro/webservice/dota2-new/match/player/score?match_id=5597411997`
  //   }).then(res => {
  //     if (res.status === 200) {
  //       this.setState({
  //         team1: res.data.team1,
  //         team2: res.data.team2,
  //       }, () => {
  //         const index = this.state.team1.tower_state.length - 1
  //         this.setState({
  //           dataTimeKey: index
  //         }, () => {
  //           this.formatDataByTime(index)
  //         })
  //       })
  //     }
  //   })
  // }

  formatDataByTime = index => {
    let playerData = {}
    if (index === 'start') {
      playerData = this.props.gameData
    } else {
      playerData = this.props.framesData[index]
    }
    const playersList = []
    let direPlayerList = []
    let radiantPlayerList = []
    let direTowerState = []
    let direBarracksState = []
    let radiantTowerState = []
    let radiantBarracksState = []
    if (playerData && playerData.teams) {
      playerData.teams.forEach(team => {
        if (team.camp === 'dire') {
          direPlayerList = team.players ? team.players.sort(('position')) : []
          direTowerState = team.towers
          direBarracksState = team.barracks
        } if (team.camp === 'radiant') {
          radiantPlayerList = team.players ? team.players.sort(compareSort('position')) : []
          radiantTowerState = team.towers
          radiantBarracksState = team.barracks
        }
        team.players.forEach(player => {
          player.camp = team.camp
          player.hero.icon = `https://resource-sec.vpgame.com/game/dota2/hero_icons/${player.hero.name.replace('npc_dota_hero_', '')}_icon.png`
          playersList.push(player)
        })
      })
      this.setState({
        direPlayerList,
        radiantPlayerList,
        radiantTowerState,
        direTowerState,
        radiantBarracksState,
        direBarracksState,
        playersList,
      }, () => {
        // this.setEcharts()
      })
    } else {
      this.setState({
        nodata: true
      })
    }
  }

  // 时间轴滑动 地图处理
  aftertimesChange = value => {
    console.log('aftertimesChange', value)
    // this.setState({
    //   dataTimeKey: value
    // }, () => {
    //   this.formatDataByTime(value)
    // })
  }

  timesChange = value => {
    this.setState(prevState => ({
      dataTimeKey: value,
      mapChange: prevState.mapChange + 1
    }), () => {
      this.formatDataByTime(value)
    })
  }

  render() {
    const webp = false
    const { player1active, player2active, direPlayerList, radiantPlayerList, radiantTowerState, direTowerState, radiantBarracksState, direBarracksState, playersList, dataTimeKey, mapChange, nodata } = this.state
    return (
      <div className="dota-map">
        {
          nodata && <Nodata />
        }
        {
          !nodata &&
          <React.Fragment>
            <div className="team1-div">
              {
                radiantPlayerList.map(item => (
                  <div className="player-item">
                    <div className="player-info">
                      <div className="player-logo">
                        <img src={resizeImg(`https://resource-sec.vpgame.com/game/dota2/heroes/${item.hero.name.replace('npc_dota_hero_', '')}-square.jpg`, 1, 60, 60)} onError={e => { onErrorImg(e) }} />
                      </div>
                      <p>LV{item.level}</p>
                    </div>
                    <div className="item-info">
                      <div className="player-name ellipsis">{item.player.name || '未知选手'}</div>
                      <div className="item-list">
                        {
                          item.items && item.items.map(item2 => (
                            <div className="item-logo">
                              <img src={resizeImg(item2.image_url, 1, 22, 22, webp)} onError={e => { onErrorImg(e) }} />
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="map-canvas-div">
              {
                playersList.length > 0 &&
                <CanvasMap list={playersList} mapChange={mapChange} />
              }
              {radiantTowerDot.map(item => (
                radiantTowerState.map(item2 => (
                  item.lane === item2.lane && item.layer === item2.layer && item2.live === true &&
                  <div
                    className={`tower ${item.icon}`}
                    style={{ left: `${item.x / 12.5}%`, bottom: `${item.y / 12.5}%` }}
                  />
                ))
              ))}
              {radiantBarracksDot.map(item => (
                radiantBarracksState.map(item2 => (
                  item.lane === item2.lane && item.ranged === item2.ranged && item2.live === true &&
                  <div
                    className="tower radiantBarracks"
                    style={{ left: `${item.x / 12.5}%`, bottom: `${item.y / 12.5}%`, transform: `rotate(${item.rotate}deg)` }}
                  />
                ))
              ))}
              {direTowerDot.map(item => (
                direTowerState.map(item2 => (
                  item.lane === item2.lane && item.layer === item2.layer && item2.live === true &&
                  <div
                    className={`tower ${item.icon}`}
                    style={{ right: `${item.x / 12.5}%`, top: `${item.y / 12.5}%` }}
                  />
                ))
              ))}
              {direBarracksDot.map(item => (
                direBarracksState.map(item2 => (
                  item.lane === item2.lane && item.ranged === item2.ranged && item2.live === true &&
                  <div
                    className="tower direBarracks"
                    style={{ right: `${item.x / 12.5}%`, top: `${item.y / 12.5}%`, transform: `rotate(${item.rotate}deg)` }}
                  />
                ))
              ))}
            </div>
            <div className="team2-div">
              {
                direPlayerList.map(item => (
                  <div className="player-item">
                    <div className="item-info">
                      <div className="player-name ellipsis">{item.player.name || '未知选手'}</div>
                      <div className="item-list">
                        {
                          item.items && item.items.map(item2 => (
                            <div className="item-logo">
                              <img src={resizeImg(item2.image_url, 1, 22, 22, webp)} onError={e => { onErrorImg(e) }} />
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <div className="player-info">
                      <div className="player-logo">
                        <img src={resizeImg(`https://resource-sec.vpgame.com/game/dota2/heroes/${item.hero.name.replace('npc_dota_hero_', '')}-square.jpg`, 1, 60, 60)} onError={e => { onErrorImg(e) }} />
                      </div>
                      <p>LV{item.level}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </React.Fragment>
        }
      </div>
    )
  }
}

export default Map
