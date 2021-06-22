import loadable from '@loadable/component'
const CardDrag = loadable(() => import('../container/CardDrag/index'))
const DotaMap = loadable(() => import('../container/DotaMap/index'))
export default [
  {
    path: ['/carddrag'],
    exact: true,
    component: CardDrag
  },
  {
    path: ['/dotamap'],
    exact: true,
    component: DotaMap
  }  
]
