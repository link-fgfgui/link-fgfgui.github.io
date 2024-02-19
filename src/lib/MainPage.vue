<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
// import {  } from 'ant-design-vue';
// import { QRCode,Popover,Avatar,List,Divider} from 'ant-design-vue';
import { notification } from "ant-design-vue";
const [api, contextHolder] = notification.useNotification();
const data = ref([]);
const pageurl = ref(location.href.toString());
const isLoading = ref(true);

async function isHTML(name) {
  try {
    const response = await axios.get(
      "https://api.github.com/repos/link-fgfgui/" + name + "/contents/"
    );
    for (let ii in response.data) {
      if (response.data[ii].name == "index.html") {
        return true;
      }
    }
  } catch (error) {
    return false;
  }
  return false;
}
axios
  .get("https://api.github.com/users/link-fgfgui/repos")
  .then(function (res) {
    // const M = document.getElementById("adiv");
    if (res.status != 200) {
      api.error({
        message: "错误",
        description: "访问 Github API 失败!刷新页面以重试!",
      });
      isLoading.value = false;
      return;
    }

    for (let i in res.data) {
      if (
        !res.data[i].fork &&
        res.data[i].name != "link-fgfgui.github.io" &&
        res.data[i].name != "link-fgfgui"
      ) {
        let ishtml = false;
        if (res.data[i].language == "HTML") {
          ishtml = true;
        } else if (
          res.data[i].language == "JavaScript" ||
          res.data[i].language == "CSS"
        ) {
          ishtml = isHTML(res.data[i].name);
        } else {
          ishtml = false;
        }
        data.value.push({
          title: res.data[i].name,
          description: res.data[i].description,
          use_url: ishtml
            ? `https://link-fgfgui.github.io/${res.data[i].name}/`
            : res.data[i].html_url,
          html_url: res.data[i].html_url,
          lang: res.data[i].language,
        });
      }
    }

    api.success({
      message: "成功",
      description: "访问 Github API 成功!",
    });
    isLoading.value = false;
  });

// const data=ref({})
</script>

<template>
  <div class="head">
    <p style="color: rgb(220, 228, 235)">gh</p>
    <p>主页</p>
  </div>
  <a-divider>项目</a-divider>
  <a-list :loading="isLoading" item-layout="horizontal" :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>
        <template #extra
          ><p>{{ item.lang }}</p></template
        >
        <a-list-item-meta>
          <template #title>
            <a
              :href="item.use_url"
              :title="
                item.use_url === item.html_url
                  ? '将前往Github查看此项目'
                  : '将直接前往演示站点'
              "
              >{{ item.title }}</a
            >
          </template>
          <template #description>
            <p>
              {{ item.description === null ? "暂无简介" : item.description }}
            </p>
          </template>
          <template #avatar
            ><a :href="item.html_url"><a-avatar src="/github.png" /></a>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
  <a-divider style="text-align: center">
    <p class="qrc">Get the</p>
    <a-popover :overlay-inner-style="{ padding: 0 }">
      <template #content>
        <a-qrcode :value="pageurl" :bordered="false" />
      </template>
      <p class="qrc qrc-code">&nbsp;QR Code&nbsp;</p>
    </a-popover>
    <p class="qrc">of this page</p>
  </a-divider>

  <a-popover :overlay-inner-style="{ padding: 0 }" trigger="click">
    <template #content>
      <img
        src="https://img2.ewt360.com/resources/bend-holiday/uploads/2024/2/8/558c05ea-c021-428d-83a3-86824b651a28.jpg?x-oss-process=image/resize,l_292"
      />
      <p style="color: whitesmoke">免责声明:本图片仅供娱乐,切勿当真</p>
    </template>
    <p style="margin: auto; display: block; width: fit-content" class="qrc">
      dt
    </p>
  </a-popover>
  <contextHolder />
</template>

<style>
.spin {
  width: 100%;
}
.spin-space {
  width: 100%;
  /* margin: auto;
  text-align: center; */
}
.qrc {
  display: inline-block;
  font-size: 10px;
  /* margin: auto; */
  color: grey;
}
.qrc-code {
  color: blue;
}

.head > p {
  display: inline-block;

  /* transform: translateX(-0.5em); */
}
.head {
  /* text-align: center; */
  /* align-items: center; */
  justify-content: center;
  font-size: 40px;
  display: flex;
  margin-top: auto;
  font-family: "微软雅黑";
  background-color: aliceblue;
  height: 80px;
  max-width: 250px;
  min-width: max-content;
  transform: translateX(calc(50vw - 50%));
  border: solid 5px;
  border-radius: 10px;
  color: black;
}
</style>
<!-- <template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script setup>
import { onMounted ,ref} from 'vue'
const message=ref('Hello, Vue!')
// onMounted(()=>{
    // 在这里执行需要在页面显示时执行的操作
    console.log('页面已显示')
// })

</script> -->