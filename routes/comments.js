const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Project = require('../models/Project');

/**
 * @route       /api/comments/:id
 * @desc        Add Comment
 * @access      Private
 */
router.post('/:id', [
  auth,
  [check('commentText', 'No comment text was included.').exists()]
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { commentText } = req.body;

    try {
        let project = await Project.findById(req.params.id);
        if(!project) {
            return res.status(404).json({ msg: 'No project found with the same id as passed in through the url' });
        }

        const comment = {
            user: req.user,
            commentText: commentText
        }

        project.comments.unshift(comment);

        await project.save();

        res.json({project});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

/**
 * @route       /api/comments/:id
 * @desc        Delete Comment
 * @access      Private
 */
router.delete('/:id', 
[
    auth, 
    [
        check('_id', 'Please enter a project id in the body.').exists()
    ]], (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.json({ errors: errors.array() });
        }

        const { _id } = req.body;

        try {
            let project = await Project.findById(_id);
            if(!projects){
                return res.status(404).json({ msg: 'No project with this id was found' });
            }

            const { comments } = project;
            

            let deleteIndex = comments.map(comment => comment._id).indexOf(req.params.id);

            if(deleteIndex < 0 || !deleteIndex){
                return res.status(404).json({ msg: 'No comment was found with this id' });
            }

            if(comments[deleteIndex].user.toString() !== req.user.id){
                return res.status(401).json({ msg: 'Not Authorized' });
            }

            comments.splice(deleteIndex, 1);

            await project.save();

            res.json({project});
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    });

    /**
     * @route       /api/comments/:id
     * @desc        Get Comments
     * @access      Private
     */
    router.get('/:id', auth, async (req, res) => {
        try {
            let project = await Project.findById(req.params.id);
            if(!project) {
                return res.status(404).json({ msg: 'Project not found with this id' });
            }

            const { comments } = project;

            res.json({comments});
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    });


module.exports = router;
