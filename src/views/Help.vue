 <template>
 <AppPage title="Помошь" back>
  <question-item
      v-for="q in questions"
      :key="q.title"
      :question="q"
  ></question-item>
 </AppPage>
</template>
<script>
import AppPage from "../components/ui/AppPage.vue";
import QuestionItem from "../components/question/QuestionItem.vue";
export default {
  setup() {
    const questions = [
      {title: 'Что есть в данной системе?', text: 'Тут есть все, для того, чтобы смотреть, какие заявки человек добавлял'},
      {title: 'Как тут работает авторизация?', text: 'Все реализовано через Firebase'}
    ]

    return {questions}
  },
  components: {AppPage, QuestionItem}
}

</script>
