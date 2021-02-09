const $siteList = $(".siteList");
const $last = $siteList.find("li.lastItem");

let hashMap = JSON.parse(localStorage.getItem("webStr")) || [
  { url: "https://github.com/", logoType: "text" },
  {
    url: "https://www.bilibili.com/",
    logoType: "img",
    logoSrc: "../img/bilibili.png",
  },
  { url: "https://www.acfun.cn/", logoType: "text" },
];

render();

$("#addButton").on("click", () => {
  let url = window.prompt("请输入您要添加的网址："); // 弹窗
  url = url.indexOf("http") !== 0 ? "https://" + url : url;
  websiteName = getWebName(url);
  hashMap.push({ url: url, logoType: "text" });
  render();
  saveWebList();
});

$(".del").on("click", (e) => {
  let parentNode = e.currentTarget.parentNode;
  let grandNode = parentNode.parentNode;
  let index = childrenIndex(parentNode, grandNode);
  hashMap.splice(index, 1);
  render();
  saveWebList();
});

// 页面离开时执行函数
// window.onbeforeunload = () => {
//   saveWebList();
// };

// 监听键盘自动打开首字母对应按键的网站
$(document).on("keypress", (e) => {
  for (let i = 0; i < hashMap.length; i++) {
    if (e.key === getWebName(hashMap[i].url)[0]) {
      window.open(hashMap[i].url);
      break;
    }
  }
});

function getWebName(url) {
  let name = url.indexOf("http") !== 0 ? "https://" + url : url;
  let nameFlag = name.split("//")[1].split(".");
  let websiteName = nameFlag[0] === "www" ? nameFlag[1] : nameFlag[0];
  return websiteName;
}

function render() {
  $siteList.find("li:not(.lastItem)").remove();
  hashMap.forEach((node) => {
    const websiteName = getWebName(node.url);
    const logo =
      node.logoType === "img"
        ? `<img src=${node.logoSrc} />`
        : websiteName[0].toUpperCase();
    const $li = $(`<li>
          <button class="del">
            <svg class="icon">
              <use xlink:href="#icon-close"></use>
            </svg> 
          </button>
          <a href="${node.url}">
            <div class="site">
              <div class="logo">${logo}</div>
              <div class="link">${websiteName}</div>
            </div>
          </a>
        </li>`).insertBefore($last);
  });
}

function childrenIndex(node, parentNode) {
  let i = 0;
  let children = parentNode.children;
  while (i < children.length) {
    if (node === children[i]) return i;
    i++;
  }
  return -1;
}

function saveWebList() {
  let webStr = JSON.stringify(hashMap);
  localStorage.setItem("webStr", webStr);
}
