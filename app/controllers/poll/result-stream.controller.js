const { v4: uuidv4 } = require('uuid');
const clientdb = require('../../lib/clientdb');

function resultStreamController(req, res) {
  const id = req.poll._id;
  const clientId = uuidv4();

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');

  clientdb.add(id, {
    id: clientId,
    res,
  });

  res.on('close', () => {
    // eslint-disable-next-line no-console
    console.log(`${clientId} Connection closed`);
    clientdb.remove(id, clientId);
  });
}

module.exports = resultStreamController;
