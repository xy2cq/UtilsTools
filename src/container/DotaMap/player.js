import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { resizeImg, onErrorImg, compareSort } from '@/utils/index'
import './style'

@withRouter

class MapPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      radiantPlayerList: [],
      direPlayerList: [],
    }
  }

  componentDidMount() {
    this.statsData()
  }

  componentWillReceiveProps() {
    this.statsData()
  }

  statsData = () => {
    const playerData = this.props.gameData
    let radiantPlayerList = []
    let direPlayerList = []
    playerData.teams.forEach(team => {
      if (team.camp === 'dire') {
        direPlayerList = team.players ? team.players.sort(compareSort('position')) : []
      }
      if (team.camp === 'radiant') {
        radiantPlayerList = team.players ? team.players.sort(compareSort('position')) : []
      }
    })
    this.setState({
      radiantPlayerList,
      direPlayerList,
    })
  }

  render() {
    const webp = false
    const { radiantPlayerList, direPlayerList } = this.state
    return (
      <div className="dota-map-player">
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
                      item.items.map(item2 => (
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
        <div className="player-analysis-div">
          {
            radiantPlayerList.map((item, index) => (
              <div className="player-analysis-item">
                <div className="player-left-info">
                  <p className="kda">{radiantPlayerList[index].kills}/{radiantPlayerList[index].death}/{radiantPlayerList[index].assists}</p>
                  <p>{radiantPlayerList[index].gpm}</p>
                  <p>{radiantPlayerList[index].last_hit}</p>
                </div>
                <div className="position">
                  <div className="position-name">{radiantPlayerList[index].position}号位</div>
                  <div className="gmp">
                    <div className="left-div">
                      <div className="left-progress" style={{ width: radiantPlayerList[index].gpm > direPlayerList[index].gpm ? '83px' : `${radiantPlayerList[index].gpm / direPlayerList[index].gpm * 83}px` }} />
                    </div>
                    <span>gmp</span>
                    <div className="right-div">
                      <div className="right-progress" style={{ width: direPlayerList[index].gpm > radiantPlayerList[index].gpm ? '83px' : `${direPlayerList[index].gpm / radiantPlayerList[index].gpm * 83}px` }} />
                    </div>
                  </div>
                  <div className="lasthit">
                    <div className="left-div">
                      <div className="left-progress" style={{ width: radiantPlayerList[index].last_hit > direPlayerList[index].last_hit ? '83px' : `${radiantPlayerList[index].last_hit / direPlayerList[index].last_hit * 83}px` }} />
                    </div>
                    <span>正补</span>
                    <div className="right-div">
                      <div className="right-progress" style={{ width: direPlayerList[index].last_hit > radiantPlayerList[index].last_hit ? '83px' : `${direPlayerList[index].last_hit / radiantPlayerList[index].last_hit * 83}px` }} />
                    </div>
                  </div>
                </div>
                <div className="player-right-info">
                  <p className="kda">{direPlayerList[index].kills}/{direPlayerList[index].death}/{direPlayerList[index].assists}</p>
                  <p>{direPlayerList[index].gpm}</p>
                  <p>{direPlayerList[index].last_hit}</p>
                </div>
              </div>
            ))
          }
        </div>
        <div className="team2-div">
          {
            direPlayerList.map(item => (
              <div className="player-item">
                <div className="item-info">
                  <div className="player-name ellipsis">{item.player.name || '未知选手'}</div>
                  <div className="item-list">
                    {
                      item.items.map(item2 => (
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
      </div>
    )
  }
}

export default MapPlayer
