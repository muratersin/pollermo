const makeUniqueArray = (arr) => [...new Set(arr)];

const getMongooseErrorMessages = ({ errors }) => {
  const messages = [];

  for (let key in errors) {
    messages.push(errors[key].message);
  }

  return makeUniqueArray(messages);
};

module.exports = {
  makeUniqueArray,
  getMongooseErrorMessages,
};
