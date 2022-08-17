axios
  .get("https://api.github.com/users/link-fgfgui/repos")
  .then(function (res) {
    const M = document.getElementById("adiv");
    if (res.status != 200) {
      swal.fire({
        title: "错误",
        text: "访问 Github API 失败!刷新页面以重试!",
        footer:
          '<a href="javascript:void(0);" onclick="location.reload();">点此刷新</a>',
        icon: "error",
      });
      M.innerHTML = "<br/>加载失败！";
      return;
    }
    swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      icon: "success",
      timerProgressBar: true,
      title: "Github访问成功!",
    });
    M.innerHTML = "";
    for (let i in res.data) {
      if (!res.data[i].fork && res.data[i].name != "link-fgfgui.github.io") {
        if (res.data[i].language == "HTML") {
          M.innerHTML += `<br/><div title="${
            res.data[i].description
          }" onclick="location.href='${
            "https://link-fgfgui.github.io/" + res.data[i].name
          }'">${res.data[i].name} <a href="${
            res.data[i].html_url
          }"><img src="assets/GitHub-Mark-64px.png" width="15px" height="15px" title="查看源码" alt="查看源码"></a></div>`;
        } else if (
          res.data[i].language == "JavaScript" ||
          res.data[i].language == "CSS"
        ) {
          if (isHTML(res.data[i].name)) {
            M.innerHTML += `<br/><div title="${
              res.data[i].description
            }" onclick="location.href='${
              "https://link-fgfgui.github.io/" + res.data[i].name
            }'">${res.data[i].name} <a href="${
              res.data[i].html_url
            }"><img src="assets/GitHub-Mark-64px.png" width="15px" height="15px" title="查看源码" alt="查看源码"></a></div>`;
          } else {
            M.innerHTML += `<br/><div title="${res.data[i].description}" onclick="location.href='${res.data[i].html_url}'">${res.data[i].name} <a href="${res.data[i].html_url}"><img src="assets/GitHub-Mark-64px.png" width="15px" height="15px" title="查看源码" alt="查看源码"></a></div>`;
          }
        } else {
          M.innerHTML += `<br/><div title="${res.data[i].description}" onclick="location.href='${res.data[i].html_url}'">${res.data[i].name} <a href="${res.data[i].html_url}"><img src="assets/GitHub-Mark-64px.png" width="15px" height="15px" title="查看源码" alt="查看源码"></a></div>`;
        }
      }
    }
  });
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
