import VueRouter from 'vue-router'

const routes = [
    
    { name: 'main', path: '/', component: require('~/ui/menus/right/Main.vue').default },
    { name: 'content', path: '/contents/:id', component: require('~/ui/menus/right/EditContent.vue').default },
]

const router = new VueRouter({
    routes // short for `routes: routes`
})

module.exports = router