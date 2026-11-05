const buttons = document.querySelectorAll('.header__button')
const header = document.querySelector('.header')
const navigationToggle = document.querySelector('.header__toggle')


//burgermenu
const setNavigationOpen = isOpen => {
	if (!header || !navigationToggle) return

	header.classList.toggle('is-open', isOpen)
	navigationToggle.setAttribute('aria-expanded', String(isOpen))
	navigationToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation')
}

navigationToggle?.addEventListener('click', () => {
	setNavigationOpen(navigationToggle.getAttribute('aria-expanded') !== 'true')
})

buttons.forEach(button => {
	button.addEventListener('click', () => {
		buttons.forEach(btn => btn.classList.remove('active'))
		button.classList.add('active')
		setNavigationOpen(false)
	})
})

document.addEventListener('keydown', event => {
	if (event.key === 'Escape') setNavigationOpen(false)
})

window.addEventListener('resize', () => {
	if (window.matchMedia('(min-width: 901px)').matches) setNavigationOpen(false)
})

const btns = document.querySelectorAll('.hero-action')
btns.forEach(button => {
	button.addEventListener('click', () => {
		btns.forEach(btn => btn.classList.remove('active'))
		button.classList.add('active')
	})
})

//emailjs
const templateID = 'template_w9wb0ff'
document.querySelectorAll('.contact-form, .footer-subscribe').forEach(form => {
	form.addEventListener('submit', event => {
		event.preventDefault()
		if (!form.reportValidity()) return

		const status = document.getElementById(
			form.classList.contains('contact-form') ? 'contact-status' : 'footer-status'
		)
		status.textContent = "Sending..."
		emailjs.sendForm('service_wkq3l17', templateID, form).then(() => {

			status.textContent = 'Thank you for your submission!'
			form.reset()
		}).catch((e) => {
			status.textContent = 'OPS! SOMETHING WENT WRONG!'
			console.error(e)
		});
	})
})
// animatia!
const motionTargets = document.querySelectorAll([
	'.intro-top-hi',
	'.intro-title',
	'.intro-btm-text',
	'.intro-btm-right',
	'.hero-photo',
	'.hero-actions',
	'.services-heading',
	'.service-card',
	'.section-title',
	'.timeline-row',
	'.hire-photo',
	'.hire-copy',
	'.portfolio-heading',
	'.portfolio-card',
	'.project-description',
	'.contact h2',
	'.contact-form',
	'.contact-trust span',
	'.testimonials-heading',
	'.testimonial-card',
	'.blog-card',
	'.footer-top',
	'.footer-main > *',
	'.footer-bottom'
].join(','))

if ('IntersectionObserver' in window) {
	motionTargets.forEach((element, index) => {
		element.classList.add('reveal-on-scroll')
		element.style.setProperty('--reveal-delay', `${(index % 3) * 90}ms`)
	})
	document.documentElement.classList.add('motion-ready')

	const revealObserver = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (!entry.isIntersecting) return

			entry.target.classList.add('is-visible')
			revealObserver.unobserve(entry.target)
		})
	}, {
		threshold: 0.12,
		rootMargin: '0px 0px -36px 0px'
	})

	motionTargets.forEach(element => revealObserver.observe(element))
}



// BACK TO TOP !!!!!!!!!
const backToTopBtn = document.getElementById("backToTopBtn");


window.onscroll = function() {
    const isDesktop = window.matchMedia('(max-width: 901px)').matches;
    const scrolled = document.body.scrollTop > 200 || document.documentElement.scrollTop > 200;

    if (isDesktop && scrolled) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};


backToTopBtn.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});