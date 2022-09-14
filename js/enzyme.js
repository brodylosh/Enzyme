// Questions (Array of Objects)

export let questions = [
  {
    text: 'What is the greatest company on Earth?',
    options: [{ text: 'Enzyme', completeIfSelected: true }, { text: 'Other' }],
  },

  {
    text: 'Who are the founders of Enzyme?',
    options: [
      { text: 'Jared Seehafer & Jacob Graham' },
      { text: 'Larry Page & Sergey Brin' },
    ],
  },
  {
    text: 'Where is Enzyme headquartered?',
    options: [{ text: 'New York' }, { text: 'San Francisco' }],
  },
];

// Check Validity of User Response

export function validateAnswer(questionIndex, response) {
  let validationObject = {};

  validationObject['validAnswer'] =
    response >= 0 && response < questions[questionIndex].options.length;

  if (
    validationObject['validAnswer'] === true &&
    questions[questionIndex].options[response]['completeIfSelected'] !=
      undefined
  ) {
    validationObject['terminalQuestion'] = true;
  } else {
    validationObject['terminalQuestion'] = false;
  }

  return validationObject;
}

// Function to Handle User Validation Errors

export function validate(input) {
  let numQuestions = questions.length;

  let foundTerminal = false;

  let errors = {};

  for (let i = 0; i < numQuestions; i++) {
    if (input[`q${i}`] == null && !foundTerminal) {
      errors[`q${i}`] = 'was not answered';
    } else if (input[`q${i}`] != null && foundTerminal) {
      errors[`q${i}`] =
        'was answered even though a previous response indicated that the questions were complete';
    } else {
      let result = validateAnswer(i, input[`q${i}`]);
      if (!result.validAnswer) {
        errors[`q${i}`] =
          'has an answer that is not on the list of valid answers';
      }
      foundTerminal = foundTerminal || result.terminalQuestion;
    }
  }
  return errors;
}
