const { questions, validate } = require('./enzyme');

describe('Validate User Response', () => {
  it('a user response object should error if it has an answer that is not on the list of valid answers', () => {
    const validateResult = validate({ q0: 2, q1: 0, q2: 0 });
    expect(Object.keys(validateResult)).toHaveLength(1);
    expect(validateResult).toEqual({
      q0: 'has an answer that is not on the list of valid answers',
    });
  });
  it('a user response object should error for each question if it is empty', () => {
    const numQuestions = questions.length;
    const validateResult = validate({});
    const notAnswered = 'was not answered';
    expect(Object.values(validateResult)).toHaveLength(numQuestions);
    expect(validateResult).toEqual({
      q0: notAnswered,
      q1: notAnswered,
      q2: notAnswered,
    });
  });
  it('a user response object should error if it satisfied a terminal question and proceeded to answer any remaining questions', () => {
    const terminalResponse =
      'was answered even though a previous response indicated that the questions were complete';
    const validateResult = validate({ q0: 0, q1: 0, q2: 1 });
    expect(Object.values(validateResult)).toHaveLength(2);
    expect(validateResult).toEqual({
      q1: terminalResponse,
      q2: terminalResponse,
    });
  });
  it('a user response object should not error if none of the previous cases are true', () => {
    const validateResult = validate({ q0: 1, q1: 0, q2: 1 });
    expect(Object.values(validateResult)).toHaveLength(0);
    expect(validateResult).toEqual({});
  });
});
