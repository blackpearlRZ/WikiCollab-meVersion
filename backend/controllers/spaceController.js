const Space = require("../models/Space")

exports.createSpace = async (req, res) => {
  try {
    const { name, visibility } = req.body

    const space = await Space.create({
      name,
      visibility,
      owner: req.user.id,
      members: [req.user.id],
    })

    res.json(space)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}