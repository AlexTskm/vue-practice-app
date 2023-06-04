import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {computed, watch} from "vue";
import {useStore} from "vuex";
import {useRouter} from 'vue-router'

export function useLoginForm() {
  const store = useStore()
  const router = useRouter()

  const {handleSubmit, isSubmitting, submitCount} = useForm()

  const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
    'email',
    yup
      .string()
      .trim()
      .required('Пожалуйста введите email')  // замена надписи по умолчанию
      .email('Необходимо ввести корректный email')  // проверка поля на email
  )

  const PASSWORD_MIN_LENGTH = 6

  const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
    'password',
    yup
      .string()  // пароль строка
      .trim()     // удалить пробелы
      .required('Пожалуйста введите пароль') // обязательное поле
      .min(PASSWORD_MIN_LENGTH, `Минимальная длина пароля должна быть больше ${PASSWORD_MIN_LENGTH} символов`)  // минимальная длина пароля 6 символов
  )

  // Количество Submit ов
  const isTooManyAttempts = computed(() => submitCount.value >= 3)

  watch(isTooManyAttempts, val => {
    if (val) {
        setTimeout(() => submitCount.value = 0, 1500)
    }
  })

  const onSubmit = handleSubmit(async values => {
    console.log('Form:', values)
    try {


      await store.dispatch('auth/login', values)
      // Идёт в модуль auth.module.js в actions:{  async login({ commit }, payload) {
      router.push('/')
    } catch (e) {

    }
  })

  return {
    email, eError, eBlur,
    password, pError, pBlur,
    onSubmit, isSubmitting, isTooManyAttempts
  }
}