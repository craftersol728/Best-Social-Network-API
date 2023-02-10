const express = require('express');
const router = express.Router();
const { 
  getAllThoughts, 
  createThought, 
  getThoughtById, 
  updateThought, 
  deleteThought, 
  createReaction, 
  deleteReaction 
} = require('../../controllers/thought-controller');

router.get('/', getAllThoughts);
router.post('/:userId', createThought);
router.get('/:thoughtId', getThoughtById);
router.put('/:thoughtId', updateThought);
router.delete('/:userId/:thoughtId', deleteThought);
router.post('/:thoughtId/reactions', createReaction);
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;