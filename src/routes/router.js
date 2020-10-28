import loadable from '@loadable/component'
const CardDrag = loadable(() => import('../container/CardDrag/index'))
export default [
  {
    path: ['/carddrag'],
    exact: true,
    component: CardDrag
  } 
]
