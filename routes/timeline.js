const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Project = require('../models/Project');

/** @route      /api/timeline/:id
 *  @desc       Create a new job
 *  @access     Private
 */
router.post(
  '/:id',
  [
    auth,
    [
      check('date', 'Please enter a date for the job.').exists(),
      check('title', 'Please enter a title for the job').exists(),
      check('cost', 'Please enter a projected cost for the job').exists()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { date, title, cost } = req.body;

    const job = {
      date: date,
      title: title,
      cost: cost,
      user: req.user
    };

    try {
      let project = await Project.findById(req.params.id);
      if (!project) {
        return res
          .status(404)
          .json({ msg: 'Project with this id was not found.' });
      }

      let spliceIndex = project.timeline
        .map(job => job.date.start)
        .findIndex(job => job.date.start > date);

      project.timeline.splice(spliceIndex, 0, job);

      await project.save();

      res.json({ project });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route       /api/timeline/:id
 * @desc        Delete a job
 * @access      Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    let project = await Project.findById(req.body._id);
    if (!project) {
      return res
        .status(404)
        .json({ msg: 'There is no project with the id sent in the url.' });
    }

    if (req.user.id !== project.user.toString()) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    let deleteIndex = project.timeline
      .map(job => job._id)
      .indexOf(req.params.id);

    if (deleteIndex < 0 || !deleteIndex) {
      return res
        .status(404)
        .json({ msg: 'No index had the same id as passed in' });
    }

    project.timeline.splice(deleteIndex, 1);

    await project.save();

    res.json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
