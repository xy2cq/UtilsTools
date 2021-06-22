export const resizeImg = (url, type, w, h, webp) => {
  url = String(url)
  if (url != 'undefined' && url && url.indexOf('svg') > -1) {
    return url
  }
  if (url != 'undefined' && url && url.indexOf('.svg') == -1) {
    switch (type) {
      case 1:
        return `${url}?x-oss-process=image/resize,m_lfit,h_${h},w_${w},limit_0${
          webp ? '/format,webp' : ''
        }`
      case 2:
        return `${url}?x-oss-process=image/crop,x_0,y_75,h_${h},w_${w},limit_0${
          webp ? '/format,webp' : ''
        }`
      case 3:
        return `${url}?x-oss-process=image/crop,w_${w},h_${h},g_center`
      default:
        return url
    }
  } else {
    return defaultImg
  }
}

export const onErrorImg = (img, type) => {
  if (type && type == 'gif') {
    img.target.src = 'https://resource-sec.vpgame.com/img/gif-default.png'
  } else {
    img.target.src =
      'https://resource-sec.vpgame.com/project/das/static/common/images/default.png'
  }
}

export const getParam = search => {
  let $u = search
  const r = {}
  if ($u) {
    $u = $u.split('&')
  } else {
    return r
  }
  $u.forEach(el => {
    const $n = el.split('=')
    r[$n[0]] = $n[1]
  })
  return r
}

// 保留小数
export const tofixed = (value, type) => {
  if (!value || !Number(value.toFixed(1)) || Number(value) < 0) {
    const num = type ? '0.0' : 0
    return num
  }
  if (value == 100) return 100
  return value.toFixed(1)
}

// logo 拼接 英雄 装备
export const getLogoUrl = (url, w, h, type, webp) => {
  const http = 'https://resource-sec.vpgame.com/game/dota2'
  const resize = `?x-oss-process=image/resize,m_fill,w_${w},h_${h},limit_0${
    webp ? '/format,webp' : ''
  }`
  const img = url.split('_hero_')
  switch (type) {
    case 'hero-horiz': // 横状图
      return `${http}/wrpt/heroes/${img[1]}-horiz.png${resize}`
    case 'hero-square': // 正方形
      return `${http}/wrpt/heroes/${img[1]}-square.jpg${resize}`
    case 'hero-vertical': // 英雄灰色图
      return `${http}/wrpt/heroes/${img[1]}.png${resize}`
    case 'hero-ash': // 正方形
      return `${http}/heroes_gray/${img[1]}.png${resize}`
    case 'item':
      return `${http}/items/${url}.png${resize}`
    case 'skills':
      return `${http}/skills/${url}_lg.png${resize}`
    default:
      return 'https://resource-sec.vpgame.com/project/das/static/common/images/default.png'
  }
}

// 时间
export const durationHms = (duration, lang, type) => {
  const paddNum = function (num) {
    num += ''
    return num.replace(/^(\d)$/, '0$1')
  }
  let h
  let m
  let s
  h = paddNum(Math.floor(duration / 3600))
  m = paddNum(Math.floor((duration % 3600) / 60))
  s = paddNum(Math.floor(duration % 60))

  if (type && type == 'h') {
    return parseInt(h) ? parseInt(h) : 0
  }
  if (type && type == 'm') {
    return parseInt(m) ? parseInt(m) : 0
  }
  if (type && type == 's') {
    return parseInt(s) ? parseInt(s) : 0
  }
  let text = ''
  let texth = '小时'
  let textm = '分' // 分钟
  let texts = '秒'
  if (lang != 'zh_CN') {
    texth = 'h '
    textm = 'm '
    texts = 's'
  }
  if (h != '00') {
    text = text + parseInt(h) + texth
  }
  if (m != '00') {
    text = text + parseInt(m) + textm
  }
  if (s != '00') {
    text = text + parseInt(s) + texts
  }
  return duration ? text : ''
}

export const toDou = n => {
  if (n < 10) {
    return `0${n}`
  }
  return String(n)
}

export const leftTimer = (leftTime, needTen) => {
  let isMinus = ''
  if (leftTime == 0 || !leftTime) return '00:00'
  if (leftTime < 0) {
    leftTime = -leftTime
    isMinus = '-'
  }
  if (needTen) {
    leftTime = Math.round(leftTime / 10) * 10
  }
  leftTime *= 1000
  const hours = parseInt((leftTime / 1000 / 60 / 60) % 24, 10) // 计算剩余的小时
  let minutes = parseInt((leftTime / 1000 / 60) % 60, 10) // 计算剩余的分钟
  let seconds = parseInt((leftTime / 1000) % 60, 10) // 计算剩余的秒数
  minutes = toDou(hours * 60 + minutes)
  seconds = toDou(seconds)

  if (!minutes || !seconds) {
    return false
  }
  if (parseInt(minutes) <= 0 && parseInt(seconds) <= 0) {
    return '00:00'
  }
  return `${isMinus}${minutes}:${seconds}`
}

export const compareSort = property => (a, b) => {
  const value1 = a[property]
  const value2 = b[property]
  return value1 - value2
}
