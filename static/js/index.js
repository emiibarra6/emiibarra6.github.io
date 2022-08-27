const root = document.querySelector('html');
const body = document.querySelector('body');
const mainNav = document.querySelector("nav");
const menu = document.querySelector('.nav-links');
const menuButton = document.getElementById('menu-display');
const themeDisplay = document.getElementById('theme-display');
const themeContainer = document.querySelector('.theme-container');
const themeSelectors = document.getElementsByClassName('theme-select');
const a = document.querySelector('.link-btn');
const form = document.querySelector('#formulario');

mainNav.classList.add('js-nav');

const getTheme = () => {
  const theme = localStorage.getItem('theme');
  theme && setActiveSelector(theme);
  root.className = theme;
  const shade = getComputedStyle(document.documentElement).getPropertyValue('--shade-100');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', shade);
}

const setTheme = (className) => {
  var root = document.getElementsByTagName('html')[0];
  root.className = className;
  localStorage.setItem('theme', className);
  const shade = getComputedStyle(document.documentElement).getPropertyValue('--shade-100');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', shade);
  setActiveSelector(className);
}

const setActiveSelector = (className) => {
  var selectedTheme = document.getElementById(`${className}-select`);
  [...themeSelectors].forEach(item => {
    item.classList.remove('active')
  });
  selectedTheme.classList.add('active');
  hideThemeContainer();
}

const showThemeContainer = () => {
  themeContainer.classList.add('visible');
  [...themeSelectors].forEach(item => {
    item.tabIndex = 0
  });
}

const hideThemeContainer = () => {
  themeContainer.classList.remove('visible');
  [...themeSelectors].forEach(item => {
    item.tabIndex = -1
  });
}

const showMenu = () => {
  menu.classList.add('visible');
  menuButton.classList.add('active');
}

const hideMenu = () => {
  menu.classList.remove('visible');
  menuButton.classList.remove('active');
}

let previousScrollPosition = 0;

const isScrollingDown = () => {
  let scrolledPosition = window.scrollY;
  let isScrollDown;

  if (scrolledPosition > previousScrollPosition) {
    isScrollDown = true;
  } else {
    isScrollDown = false;
  }
  previousScrollPosition = scrolledPosition;
  return isScrollDown;
}

const handleNavScroll = () => {
  if (mainNav.classList.contains('visible')) {
    if (isScrollingDown()) {
      mainNav.classList.add('scroll-down');
      mainNav.classList.remove('scroll-up')
    } else {
      mainNav.classList.add('scroll-up');
      mainNav.classList.remove('scroll-down')
    }
  } else {
    mainNav.classList.remove('scroll-up');
    mainNav.classList.remove('scroll-down')
  }
}

function enviarCorreo(e){
  e.preventDefault();
  const subject = document.querySelector('#subject').value;
  const nombre = document.querySelector('#name').value
  const email = document.querySelector('#email').value
  const mensaje = document.querySelector('#message').value
 
  link = `mailto:emiibarraa@hotmail.com?subject=${subject}&body=Nombre%3A${nombre}%0D%0AEmail%3A${email}%0D%0AMensaje%3A${mensaje}`
  window.open(link);
}

getTheme();

themeDisplay.addEventListener("click", function () {
  hideMenu()
  if (themeContainer.classList.contains('visible')) {
    hideThemeContainer();
  } else {
    showThemeContainer();
  }
})

menuButton.addEventListener("click", function () {
  hideThemeContainer();
  if (menu.classList.contains('visible')) {
    hideMenu();
  } else {
    showMenu();
  }
})

menu.addEventListener("click", function () {
  hideThemeContainer();
  hideMenu()
})

window.addEventListener('scroll', () => {
  handleNavScroll()
})

form.addEventListener('submit', enviarCorreo)
