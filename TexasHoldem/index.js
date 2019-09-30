const TexasHoldem = {
  PrivateCard:[], //私有牌 2张
  PublicCard:[], //公共牌 5张
  AllCard:[], //总共牌 7张
   sort:{
    1:'高牌',
    2:'一对',
    3:'两对',
    4:'三条',
    5:'顺子',
    6:'同花',
    7:'葫芦',
    8:'四条',
    9:'同花顺',
    10:'皇家同花顺',
  },
  init: () => { //新建一副扑克
    let poker = [];
    let color = ['♠️','♥️','草花','方块']
    for(let i=1; i<14; i++){
      color.forEach(item=>{
        poker.push([i,item])
      })
    }
    return poker
  },
  shuffle:(arr) =>{ //乱序排列扑克牌
    let i = arr.length;
    while (i) {
      let j = Math.floor(Math.random() * i--);
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr
  },
  startDealCards:(num)=>{ //发牌
    let poker = TexasHoldem.init() 
    poker =  TexasHoldem.shuffle(poker)
    for(let i=0; i<num; i++){
      TexasHoldem.PrivateCard.push([poker[i],poker[i+num]])
    }
    for(let i=2*num; i<2*num+5; i++){
      TexasHoldem.PublicCard.push(poker[i])
    }
    TexasHoldem.PrivateCard.forEach(item=>{
      TexasHoldem.AllCard.push([...item, ...TexasHoldem.PublicCard])
    })
    console.log(TexasHoldem.PrivateCard)
    console.log(TexasHoldem.AllCard)
  }
  
}

TexasHoldem.startDealCards(9)