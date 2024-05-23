import 'vant/lib/index.css';
import { createApp } from 'vue'
import { App } from './App'
import { createRouter } from 'vue-router'
import { routes } from './config/routes';
import { history } from './shared/history';
import '@svgstore';
import { fetchMe, mePromise } from './shared/me';

const router = createRouter({ history, routes })

fetchMe()
router.beforeEach(async (to, from) => {
  if (to.path === '/' || to.path.startsWith('/welcome') || to.path.startsWith('/sign_in') || to.path === '/start') {
    return true
  } else {
    const path = await mePromise!.then(
      () => true,
      () => '/sign_in?return_to=' + to.path
    )
    return path
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')

// 如下代码是禁止用户在 ios 上双手缩放页面
document.documentElement.addEventListener(
  "touchstart",
  function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  },
  false
);

var lastTouchEnd = 0;
document.documentElement.addEventListener(
  "touchend",
  function (event) {
    var now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  },
  false
);

document.addEventListener("gesturestart", function (event) {
  event.preventDefault();
});