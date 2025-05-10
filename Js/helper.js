const formatdata = qustiondata => {
    const result =  qustiondata.map((item) => {
      const qustionobject = {question: item.question};
      const answers = [...item.incorrect_answers];
      const correctAnswerIndex = Math.floor(Math.random()*4)
      answers.splice(correctAnswerIndex,0,item.correct_answer);
      qustionobject.answers = answers;
      qustionobject.correctAnswerIndex = correctAnswerIndex;
      return qustionobject;
    });
    return result;
  };

  export default formatdata;