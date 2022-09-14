# UNDER CONSTRUCTION

# # Questions (Array of Hashes)

# $questions = [
#   {
#     text: 'What is the greatest company on Earth?',
#     options: [{ text: 'Enzyme', completeIfSelected: true }, { text: 'Other' }],
#   },

#   {
#     text: 'Who are the founders of Enzyme?',
#     options: [
#       { text: 'Jared Seehafer & Jacob Graham' },
#       { text: 'Larry Page & Sergey Brin' },
#     ],
#   },
#   {
#     text: 'Where is Enzyme headquartered?',
#     options: [{ text: 'New York' }, { text: 'San Francisco' }],
#   },
# ];

# # Check Validity of User Response

# def validate_answer(question_index, response)
#   validation_object = {};

#   validation_object[':valid_answer'] =
#     response >= 0 && response < questions[question_index].options.length;

#   if validation_object[':valid_answer'] === true && questions[question_index].options[response]['completeIfSelected'] != undefined
#     validation_object[':terminal_question'] = true;
#   else
#     validation_object[':terminal_question'] = false;
#   end

#   return validation_object;
# end

# # Function to Handle User Validation Errors

# def validate(input)
#   errors = {};

#   found_terminal = false;

#   $questions.each do |i|
#     if $response[":q#{i}"] == nil && !found_terminal
#       $errors[":q#{i}"] = 'was not answered';
#     elsif $response[":q#{i}"] != nil && found_terminal
#       $errors[":q#{i}"] =
#         'was answered even though a previous response indicated that the questions were complete';
#     else
#       let result = validate_answer(i, $response[":q#{i}"]);
#       if !result.valid_answer
#         $errors[":q#{i}"] =
#           'has an answer that is not on the list of valid answers';
#       end
#       found_terminal = found_terminal || result.terminal_question;
#     end
#   end
#   return errors
# end
