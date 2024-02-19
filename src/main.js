import { createApp } from 'vue';
import { QRCode,Popover,Avatar,List,Divider} from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);
app.use(List).use(Popover).use(QRCode).use(Avatar).use(Divider).mount('#app')
// app.use(QRCode).mount('#app');
// app.use(Popover).mount('#app');
// app.use(Avatar).mount('#app');
// app.use(List).mount('#app');
// app.use(Divider).mount('#app');
// app.use(Popover).mount('#app');
// app.use(Popover).mount('#app');
// app.use(Popover).mount('#app');


