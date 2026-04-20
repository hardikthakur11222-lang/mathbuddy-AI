const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

function authMiddleware(req, res, next) {
  let userId = req.headers["x-user-id"];

  if (!userId) {
    userId = uuidv4();
  }

  const userFile = path.join(__dirname, "../users", `${userId}.json`);

  if (!fs.existsSync(userFile)) {
    fs.writeFileSync(
      userFile,
      JSON.stringify({
        chatHistory: [],
        stars: 0,
        completedTopics: [],
        timetable: {}
      }, null, 2)
    );
  }

  req.userId = userId;
  req.userFile = userFile;

  next();
}

module.exports = authMiddleware;