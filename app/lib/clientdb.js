const data = {};

function add(pollId, client) {
  data[pollId] = data[pollId] || [];
  data[pollId].push(client);
}

function remove(pollId, clientId) {
  data[pollId] = data[pollId].filter((c) => c.id !== clientId);
}

function get(pollId) {
  return data[pollId] || [];
}

module.exports = {
  get,
  add,
  remove,
};
