document.addEventListener('DOMContentLoaded', () => {
    /* 1 задание */
    const openMenuBtn = document.querySelector('.js-open-menu'),
          dropdown = document.querySelector('.dropdown');


    dropdown.addEventListener('click', event => {
        event.target === openMenuBtn || event.target === dropdown ? dropdown.querySelector('.' + openMenuBtn.dataset.bsToggle + '-menu').classList.toggle('show') : false;
        event._isClickWithInDropdown = true;
    });

    window.addEventListener('click', event => {
        if (event._isClickWithInDropdown) return;

        dropdown.querySelector('.' + openMenuBtn.dataset.bsToggle + '-menu').classList.remove('show');
    });

    /* 2 задание */
    const inputs = document.querySelectorAll('.inputs-wrapper input'),
          form = document.querySelector('form'),
          result = document.querySelector('.result')
          regExp = new RegExp('^[а-яё/А-ЯЁ -]+$');
          
    form.addEventListener('submit', event => {
        event.preventDefault();
        const user = document.createElement('div');
        inputs.forEach(input => {
            if (input.value.length) {
                user.textContent += input.value + ' ';
                result.append(user);
            }
        })

        form.reset()
    })
    inputs.forEach(input => {
        input.addEventListener('keypress', event => {
            !regExp.test(event.key) ? event.preventDefault() : false;
        })
        input.addEventListener('blur', () => {
            if (input.value.length) { 
                let str = ''
                for (let i = 0; i < input.value.length; i++) {
                    regExp.test(input.value[i]) ? str += input.value[i] : false;
                }

                str = str.replace(/^[\s\-]+/g, '').replace(/[\s\-]+$/g, '').replace(/\s{2,}/g, ' ').replace(/\-{2,}/g, '-').trim();
                str = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

                input.value = str;
            }
        })
    })

    /* Задание 3 */
    const windowInnerHeight = window.innerHeight;
    document.body.style.minHeight = (windowInnerHeight * 2.5) + 'px'; // set minHeight for body

    const btnUp = document.querySelector('.up');

    window.addEventListener('scroll', () => {
        window.scrollY >= 100 ? btnUp.style.display = 'block' : btnUp.style.display = 'none';
    }, { passive: true })

    btnUp.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })
});

