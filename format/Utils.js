import moment from 'moment'
/**
 * 错误提示
 * @param {*} content 内容
 * @param {*} duration 关闭时间 s
 * @param {*} onClose 关闭回调
 * @param {*} mask 是否显示mask
 */


export const filterBanner = banners => {
  const bannerFilters = []
  if (banners.length > 0) {
    banners.forEach(item => {
      if (item.channel_type === 'posts' || item.channel_type === 'html5') {
        bannerFilters.push(item)
      }
    })
  }
  return bannerFilters
}

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

export const formatTime = date => {
  const formate = 'YYYY.MM.DD H:mm:ss'
  const time = new Date(date * 1000)
  return moment(time).format(formate)
}

export const formatDay = date => {
  const formate = 'YYYY.MM.DD'
  const time = new Date(date * 1000)
  return moment(time).format(formate)
}

export const formatDateWithWeek = (timeDesc, lang) => {
  let weeks = []
  const date = timeDesc ? new Date(timeDesc * 1000) : new Date()
  if (lang == 'en_US' || lang == 'en_us') {
    weeks = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
    return `${weeks[date.getDay()]}, ${formatDate(timeDesc, lang)}`
  } else {
    weeks = [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六'
    ]
    return formatDate(timeDesc) + ` ${weeks[date.getDay()]}`
  }
}

export const formatDate = (timeDesc, lang) => {
  if (!timeDesc) return 0
  const date = timeDesc ? new Date(timeDesc * 1000) : new Date()
  if (lang == 'en_US' || lang === 'en_us') {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    return `${months[date.getMonth()]} ${toDou(date.getDate())}`
  } else {
    return `${toDou(date.getMonth() + 1)}月${toDou(date.getDate())}日`
  }
}

export const toDou = n => {
  if (n < 10) {
    return '0' + n
  } else {
    return n.toString()
  }
}

export const formatDateMin = timeDesc => {
  if (!timeDesc) return 0
  const date = timeDesc ? new Date(timeDesc * 1000) : new Date()
  return `${date.getHours()}:${toDou(date.getMinutes())}`
}

export const leftTimer = (leftTime, noHours, dou) => {
  let isMinus = ''
  if (leftTime == 0) return '00:00'
  if (leftTime < 0) {
    leftTime = -leftTime
    isMinus = '-'
  }
  leftTime = leftTime * 1000
  let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10) // 计算剩余的天数
  let hours = parseInt((leftTime / 1000 / 60 / 60) % 24, 10) // 计算剩余的小时
  let minutes = parseInt((leftTime / 1000 / 60) % 60, 10) // 计算剩余的分钟
  let seconds = parseInt((leftTime / 1000) % 60, 10) // 计算剩余的秒数
  days = days > 0 ? `${days}` : ''
  if (noHours) {
    minutes = toDou(hours * 60 + minutes)
    hours = ''
  } else {
    hours = toDou(hours)
    minutes = toDou(minutes)
  }
  seconds = toDou(seconds)
  if (dou) {
    if (!minutes || !seconds) {
      return false
    }
    if (parseInt(minutes) <= 0 && parseInt(seconds) <= 0) {
      return `00:00`
    }
    return `${isMinus}${hours}${minutes}:${seconds}`
  } else {
    return `${isMinus}${hours}${minutes}${seconds}`
  }
}

export const moneyFormat = (money) => {
  if (money && money != null) {
    money = String(money);
    var left = money.split('.')[0], right = money.split('.')[1];
    right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '';
    var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
    return (Number(money) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
  } else if (money === 0) {
    return '0.00';
  } else {
    return '';
  }
}

export const formatValue = (value, type, noText) => {
  if(type==="rate" && value >= 0){
    return Number(value*100).toFixed(1) + '%'      
  } else if(type==="time" && value >= 0){
    let sec = parseInt(value%60)
    if( sec < 10){
      sec = `0${sec}`
    }
    value = `${parseInt(value/60)}:${sec}`
    return value
  } else if(value >= 0){
    return Number(value).toFixed(1)
  } else{
    if(noText){
      return ""
    }else{
      return '--'
    }
  }
}