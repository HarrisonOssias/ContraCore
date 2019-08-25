const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Project = require('../models/Project');

/** @route      /api/project
 *  @desc       Create new project
 *  @access     Private
 */
router.post(
  '/',
  [
    auth,
    [
      check(
        'timeline',
        'There must be a timeline included for the project.'
      ).exists()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { timeline } = req.body;

    try {
      const project = new Project({
        timeline: timeline,
        user: req.user.id,
        comments: []
      });

      await project.save();
      res.json({ project });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
);

/** @route      /api/project/:id
 *  @desc       Get a project
 *  @access     Private
 */
router.get('/:id', [auth], async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'No project with this id was found' });
    }

    res.json({ project });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

/**
 * @route     /api/project
 * @desc      Get projects associated with a user id
 * @access    Private
 */
router.get('/', auth, async (req, res) => {
  try {
    let projects = await Project.find(req.user);
    if (!projects) {
      return res
        .status(404)
        .json({ msg: 'No project found under this user id' });
    }

    res.json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
