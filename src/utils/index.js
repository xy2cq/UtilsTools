
import axios from 'axios'
import localeText from './locales'
import i18n from '../lang/i18n'
/**
 * 错误提示
 * @param {*} content 内容
 * @param {*} duration 关闭时间 s
 * @param {*} onClose 关闭回调
 * @param {*} mask 是否显示mask
 */
const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN || ''
/**
 * 获取cookie值
 * @param {*} name 字段名
 */
export const getCookie = name => {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  const arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  }
  return null
}

export const setCookie = (name, value, days) => {
  const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN
  let expires = ''
  if (days) {
    const date = new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000)
    expires = ` ;expires=${date.toUTCString()}`
  }
  document.cookie = `${name}=${value}${expires};domain=${COOKIE_DOMAIN};path=/`
}

// 方法代码翻译
export const getText = text => {
  const lang = getCookie('VPLang') || 'zh_CN'
  if (lang === 'zh_CN') {
    return text
  }
  return localeText[lang][text]
}

export const toThousands = num => {
  if (!num) {
    return num
  }
  const dot = num.toString().split('.')[1]
  let number = parseInt(num).toString()
  let result = ''
  while (number.length > 3) {
    result = `,${number.slice(-3)}${result}`
    number = number.slice(0, number.length - 3)
  }
  if (number) {
    result = number + result
  }
  if (result.includes('.') > 0) {
    result = result.replace(',.', '.')
  }
  return result.replace('-,', '-') + (dot ? `.${dot}` : '')
}

/**
 * 获取url上面的参数值
 * @param {*} name 参数名
 */
export const getUrlParam = name => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

let isWebp = false

export const setSuppoutWebp = isSuppout => {
  isWebp = isSuppout
}

export const getDateFormat = (date, format) => {
  if (!date) return ''
  const paddNum = function (num) {
    num += ''
    return num.replace(/^(\d)$/, '0$1')
  }
  date = new Date(date * 1000)
  // 指定格式字符
  const cfg = {
    yyyy: date.getFullYear(), // 年 : 4位
    yy: date
      .getFullYear()
      .toString()
      .substring(2), // 年 : 2位
    M: date.getMonth() + 1, // 月 : 如果1位的时候不补0
    MM: paddNum(date.getMonth() + 1), // 月 : 如果1位的时候补0
    d: date.getDate(), // 日 : 如果1位的时候不补0
    dd: paddNum(date.getDate()), // 日 : 如果1位的时候补0
    hh: paddNum(date.getHours()), // 时
    mm: paddNum(date.getMinutes()), // 分
    ss: paddNum(date.getSeconds()) // 秒
  }
  format || (format = 'yyyy-MM-dd hh:mm')
  return format.replace(/([a-z])(\1)*/gi, m => cfg[m])
}

export const resizeImg = (url, type, w, h, webp) => {
  if (url === 'https://vp-image.vpgame.com/empty.png' || url === 'https://resource-sec.vpgame.com/game/dota2/empty.png') {
    return require('../images/default.png')
  }
  const defaultImg = require('../images/default.png')
  url = String(url)

  if (url === 'https://resource-sec.vpgame.com/game/csgo/team/d8290397364eef4a75e13eb67eaf27af.svg') {
    return require('../images/default.png')
  }

  if (url != 'undefined' && url && url.indexOf('svg') > -1) {
    return url
  }
  if (url != 'undefined' && url && url.indexOf('unknown') > -1) {
    return defaultImg
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

export const inArray = (search, array) => {
  for (const i in array) {
    if (array[i] == search) {
      return true
    }
  }
  return false
}

export const setcookie = (name, value, Days) => {
  const d = Days || 30
  let expires = ''
  if (d) {
    const date = new Date(new Date().getTime() + d * 24 * 60 * 60 * 1000)
    expires = ` ;expires=${date.toUTCString()}`
  }
  document.cookie = `${name}=${value}${expires};domain=${COOKIE_DOMAIN};path=/`
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
