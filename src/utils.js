/**
 * @date 2017-02-10
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */

/**
 * browser window의 위치와 크기 그리고 중앙 위치를 계산해서 반환한다.
 * @static
 * @param {number} [width=0]
 * @param {number} [height=0]
 * @param {boolean} [inner=false] inner = true 레이어(모달) 위치를 구한다.
 * @returns
 * { windowLeft, windowTop, scrollLeft, scrollTop, windowWidth, windowHeight, x, y }
 * 창 좌측 시작 픽셀값, 창 상단 시작 픽셀값, 스크롤 좌측 시작 위치, 스크롤 상단 시작 위치, 창 넓이, 창 높이, 중앙 좌측 시작 픽셀값, 중앙 상단 시작 픽셀값
 * @memberOf Utils
 */
const screenPoint = (width = 0, height = 0, inner = false) => {
  const windowLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
  const windowTop = window.screenTop !== undefined ? window.screenTop : screen.top;

  let windowWidth = null;
  if (window.innerWidth) {
    windowWidth = window.innerWidth;
  } else if (document.documentElement.clientWidth) {
    windowWidth = document.documentElement.clientWidth;
  } else {
    windowWidth = screen.width;
  }

  let windowHeight = null;
  if (window.innerHeight) {
    windowHeight = window.innerHeight;
  } else if (document.documentElement.clientHeight) {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = screen.height;
  }

  const supportPageOffset = window.pageXOffset !== undefined;
  const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');

  let scrollLeft = null;
  if (supportPageOffset) {
    scrollLeft = window.pageXOffset;
  } else if (isCSS1Compat) {
    scrollLeft = document.documentElement.scrollLeft;
  } else {
    scrollLeft = document.body.scrollLeft;
  }

  let scrollTop = null;
  if (supportPageOffset) {
    scrollTop = window.pageYOffset;
  } else if (isCSS1Compat) {
    scrollTop = document.documentElement.scrollTop;
  } else {
    scrollTop = document.body.scrollTop;
  }

  let x = 0;
  let y = 0;

  if (inner) {
    if (width > 0) x = ((windowWidth - width) / 2) + scrollLeft;
    if (height > 0) y = ((windowHeight - height) / 2) + scrollTop;
  } else {
    if (width > 0) x = parseInt((windowWidth - width) / 2, 0);
    if (height > 0) y = parseInt((windowHeight - width) / 2, 0);
  }

  return { windowLeft, windowTop, scrollLeft, scrollTop, windowWidth, windowHeight, x, y };
};

const popup = (options) => {
  const o = Object.assign({}, {
    url: null,
    name: '',
    center: true,
    left: 0,
    top: 0,
    height: 100,
    width: 100,
    menubar: false,
    toolbar: false,
    location: false,
    status: false,
    resizable: false,
    scrollbars: false,
  }, options);

  if (!o.url) return;

  const strWindowFeatures = [];

  strWindowFeatures.push(`width=${o.width}`);
  strWindowFeatures.push(`height=${o.height}`);

  if (o.center === true) {
    const point = screenPoint(o.width, o.height);
    o.left = point.x;
    o.top = point.y;
  }

  strWindowFeatures.push(`left=${o.left}`);
  strWindowFeatures.push(`top=${o.top}`);

  strWindowFeatures.push(`menubar=${o.menubar === true ? 'yes' : 'no'}`);
  strWindowFeatures.push(`toolbar=${o.toolbar === true ? 'yes' : 'no'}`);
  strWindowFeatures.push(`location=${o.location === true ? 'yes' : 'no'}`);
  strWindowFeatures.push(`status=${o.status === true ? 'yes' : 'no'}`);
  strWindowFeatures.push(`resizable=${o.resizable === true ? 'yes' : 'no'}`);
  strWindowFeatures.push(`scrollbars=${o.scrollbars === true ? 'yes' : 'no'}`);

  window.open(o.url, o.name, strWindowFeatures.join(','));
};

const getParameter = (name, defaultValue = null) => {
  let search = window.location.search;

  if (!search || search === undefined) return defaultValue;

  search = search.match(/[&?]?([^=&]*)=([^&]*)/ig);

  if (!search || search === undefined || search.length === 0) return defaultValue;

  const findIndex = search.findIndex(data => (data.indexOf(`${name}=`) > -1));

  let value = null;
  if (findIndex > -1) {
    const data = search[findIndex];
    const parameter = data.replace(/^&|\?/ig, '');

    if (parameter) {
      const parameters = parameter.split('=');
      if (parameters[0] === name) {
        value = parameters[1];
      }
    }
  }

  if (defaultValue && (!value || value === undefined || value === '')) {
    return defaultValue;
  }

  return value;
};

export default { screenPoint, popup, getParameter };
