const initFormValidation = () => {
  const form = document.querySelector('.questions__form')

  const FORM_SUBMIT_URL = 'https://httpbin.org/post'

  if (!form) {
    return
  }

  const createModal = (message) => {
    const modal = document.createElement('div')

    modal.className = 'modal'

    modal.innerHTML = `
      <div class="modal__content">
        <p class="modal__message">${message}</p>
        <button class="modal__close" type="button" aria-label="Закрыть">
          <svg width="24" height="24" aria-hidden="true">
            <use xlink:href="images/sprite.svg#icon-close"></use>
          </svg>
        </button>
      </div>
    `

    document.body.appendChild(modal)

    const closeModal = () => {
      modal.remove()
    }

    modal.querySelector('.modal__close').addEventListener('click', closeModal)
  }

  const validator = new JustValidate(form, {
    validateBeforeSubmitting: true,
  })

  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Введите ваше имя',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Минимальная длина 3 символа',
      },
      {
        rule: 'maxLength',
        value: 20,
        errorMessage: 'Максимальная длина 20 символов',
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Введите вашу почту',
      },
      {
        rule: 'email',
        errorMessage: 'Почта введена неверно',
      },
    ])
    .addField('#agree', [
      {
        rule: 'required',
        errorMessage: 'Согласие обязательно',
      },
    ])
    .onSuccess(async (event) => {
      event.preventDefault()

      const formData = new FormData(form)

      try {
        const response = await fetch(FORM_SUBMIT_URL, {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const result = await response.json()

          createModal('Благодарим за обращение!')
          form.reset()
        } else {
          throw new Error('Ошибка при отправке данных на сервер')
        }
      }
      catch (error) {
        console.error('Ошибка при отправке данных на сервер: ', error)
        createModal('Не удалось отправить обращение')
      }
    })
}

export { initFormValidation }
