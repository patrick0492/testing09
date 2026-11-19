// menu
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if(navToggle){
  navToggle.addEventListener('click', () =>{
    navMenu.classList.add('show-menu')
  })
}
if(navClose){
  navClose.addEventListener('click', () =>{
    navMenu.classList.remove('show-menu')
  })
}

const navLink = document.querySelectorAll('.nav-link')

const linkAction = () =>{
  const navMenu = document.getElementById('nav-menu')
  navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))
// scroll header
const scrollHeader = () =>{
  const header = document.getElementById('header')
  this.scrollY >= 50 ? header.classList.add('scroll-header') : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

// add zeros to the left of the numer
const formatNumber = (number, digits) => String(number).padStart(digits, '0')
// home number and count of the active slide
const homeNumber = document.getElementById('home-number'),
      homeCount = document.getElementById('home-count')

const updateNumbers = (swiper) =>{
  const current = swiper.realIndex + 1
  homeNumber.textContent = formatNumber(current, 2)
  homeCount.textContent = formatNumber(current, 3)
}      

// roller effect the old number goes up and the new one comes from below
const animateNumbers = (swiper) =>{
  const numbersText = '.home-number-text, .home-count-text'

  gsap.killTweensOf(numbersText)

  gsap.timeline({defaults: {opacity: 1}})
    .to(numbersText, {yPercent: -100, duration: 0.35, ease: 'power2.in',
      onComplete: () => updateNumbers(swiper)
    })
    .set(numbersText, {yPercent: 100})
    .to(numbersText, {yPercent: 0, duration: 0.45, ease: 'power3.out'})
}
// swiper
const swiperHome = new Swiper('.home-swiper',{
  loop: true,
  speed: 800,
  effect: 'fade',
  fadeEffect:{
    crossFade: true,
  },
  parallax: true,
  grabCursor: true,
  keyboard: {
    enabled: true,
  },
  navigation: {
    nextEl: '.home-button-next',
    prevEl: '.home-button-prev',
  },
  autoplay:{
    delay: 4000,
    disableOnInteraction: false,
  },
  on: {
    init(){
      const total = this.slides.length
      // each home crd shows the numer of the next slide
      this.slides.forEach(slide =>{
        const next = (Number(slide.dataset.swiperSlideIndex) + 1) % total + 1

        slide.querySelector('.home-card-number').textContent = formatNumber(next, 2)
      })
      updateNumbers(this)
    },
  },
})

// animate numbers only after the slider starts
swiperHome.on('slideChange', () => animateNumbers(swiperHome))
// autoplay waits until the gsap animation of the page ends
swiperHome.autoplay.stop()
// next slide via home card button
const cardButtons = document.querySelectorAll('.home-card-button')

cardButtons.forEach(button => button.addEventListener('click', () =>{
  swiperHome.slideNext()
}))

gsap.defaults({ opacity: 0, ease: 'back.out(1.6)', duration: 1.4})

const tl = gsap.timeline({ onComplete: () => swiperHome.autoplay.start() })

tl.from('.nav > *', {y: -30}, '.3')
  .from('.home-glow', {scale: 0}, '.6')
  .from('.home-img', {y: -200}, '.9')
  .from('.home-titles', {y: -200}, '1.3')
  .from('.home-number', {y: -30}, '1.6')
  .from('.home-card', {y: 120}, '1.8')
  .from('.home-button, .home-sociel, .home-count', {y: 120}, '2.1')