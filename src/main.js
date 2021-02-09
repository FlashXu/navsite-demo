const $siteList = $(".siteList");
const $last = $siteList.find("li.lastItem");

let hashMap = [
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
  let url = window.prompt("请输入您要添加的网址：");
  url = url.indexOf("http") !== 0 ? "https://" + url : url;
  websiteName = getWebName(url);
  const $li = $(`<li>
  <a href="${url}">
    <div class="site">
      <div class="logo">${websiteName[0].toUpperCase()}</div>
      <div class="link">${websiteName}</div>
    </div>
  </a>
</li>`).insertBefore($last);
  hashMap.push({ url: url, logoType: "text" });
  render();
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
        <a href="${node.url}">
          <div class="site">
            <div class="logo">${logo}</div>
            <div class="link">${websiteName}</div>
          </div>
        </a>
      </li>`).insertBefore($last);
  });
}
