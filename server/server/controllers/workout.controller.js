const Workouts = require("../data/workout");
const Equipments = require("../data/equipment");
const Exercises = require("../data/exercise");
const Muscles = require("../data/muscle");
const Comments = require("../data/comment");
const Replies = require("../data/reply");
const validation = require("../validation/workout");

exports.createWorkout = async (req, res) => {
  const { name, desc, muscles, equipments, tips, plans } = req.body;

  try {
    const { error } = await validation.workout.validate(req.body);
    if (error)
      return res.status(400).send({
        success: false,
        error: "Please provide valid inputs",
      });

    for (const ele of muscles)
      if (!(await Muscles.getWithId(ele.id)))
        res.status(404).send({ success: false, error: "Muscles Not Found!!" });

    for (const ele of equipments)
      if (!(await Equipments.getWithId(ele.id)))
        res
          .status(404)
          .send({ success: false, error: "Equipment Not Found!!" });

    for (const ele of plans)
      if (!(await Exercises.getWithId(ele.exerciseId)))
        res.status(404).send({ success: false, error: "Exercise Not Found!!" });

    const workout = await Workouts.create(
      name,
      desc,
      req.user.id,
      muscles,
      equipments,
      tips,
      plans
    );

    res.send({ success: true, workout });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error: "Server Side Error" });
  }
};

exports.getWorkout = async (req, res) => {
  try {
    const workouts = await Workouts.getAll();

    res.send({ success: true, workouts });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error: "Server Side Error" });
  }
};

exports.updateWorkout = async (req, res) => {
  const { name, desc, muscles, equipments, tips, plans } = req.body;
  const { workoutId } = req.params;

  try {
    const { error } = await validation.workout.validate(req.body);
    if (error)
      return res.status(400).send({
        success: false,
        error: error.details.map(({ message }) => message),
      });

    if (!(await Workouts.getWithId(workoutId)))
      return res
        .status(404)
        .send({ success: false, error: "Workout Not found!!" });

    for (const ele of muscles)
      if (!(await Muscles.getWithId(ele.id)))
        res.status(404).send({ success: false, error: "Muscles Not Found!!" });

    for (const ele of equipments)
      if (!(await Equipments.getWithId(ele.id)))
        res
          .status(404)
          .send({ success: false, error: "Equipment Not Found!!" });

    for (const ele of plans)
      if (!(await Exercises.getWithId(ele.exerciseId)))
        res.status(404).send({ success: false, error: "Exercise Not Found!!" });

    const workout = await Workouts.update(
      workoutId,
      name,
      desc,
      req.user.id,
      muscles,
      equipments,
      tips,
      plans
    );

    res.send({ success: true, workout });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error: "Server Side Error" });
  }
};

exports.deleteWorkout = async (req, res) => {
  const { workoutId } = req.params;

  try {
    if (!(await Workouts.getWithId(workoutId)))
      return res
        .status(404)
        .send({ success: false, error: "Workout Not found!!" });

    await Workouts.delete(workoutId);

    res.send({ success: true, message: "Workout deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error: "Server Side Error" });
  }
};

exports.addComment = async (req, res) => {
  const { comment } = req.body;
  const { workoutId } = req.params;

  try {
    const { error } = validation.comment.validate(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, error: "Please provide Valid Inputs." });

    if (!(await Workouts.getWithId(workoutId)))
      return res
        .status(404)
        .send({ success: false, error: "Workout Not Found!!" });

    const commentCreated = await Comments.create(
      req.user.id,
      workoutId,
      comment
    );

    return res.send({ success: true, comment: commentCreated });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error: "Server Side Error" });
  }
};

exports.addReply = async (req, res) => {
  const { reply } = req.body;
  const { commentId } = req.params;

  try {
    const { error } = validation.reply.validate(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, error: "Please provide Valid Inputs." });

    const commentPrev = await Comments.getWithId(commentId);
    if (!commentPrev || (commentPrev && commentPrev.removed))
      return res
        .status(404)
        .send({ success: false, error: "Comment Not Found!!" });

    const replyCreated = await Replies.create(req.user.id, commentId, reply);

    return res.send({ success: true, reply: replyCreated });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error: "Server Side Error" });
  }
};

exports.removeComment = async (req, res) => {
  const { workoutId, commentId } = req.params;

  try {
    if (!(await Workouts.getWithId(workoutId)))
      return res
        .status(404)
        .send({ success: false, error: "Workout Not Found!!" });

    const commentPrev = await Comments.getWithId(commentId);
    if (!commentPrev || (commentPrev && commentPrev.removed))
      return res
        .status(404)
        .send({ success: false, error: "Comment Not Found!!" });

    await Comments.remove(commentId);

    return res.send({ success: true, message: "Comment Removed." });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error: "Server Side Error" });
  }
};

exports.removeReply = async (req, res) => {
  const { commentId, replyId } = req.params;

  try {
    const commentPrev = await Comments.getWithId(commentId);
    if (!commentPrev || (commentPrev && commentPrev.removed))
      return res
        .status(404)
        .send({ success: false, error: "Comment Not Found!!" });

    const replyPrev = await Replies.getWithId(replyId);
    if (!replyPrev || (replyPrev && replyPrev.removed))
      return res
        .status(404)
        .send({ success: false, error: "Reply Not Found!!" });

    await Replies.remove(replyId);

    return res.send({ success: true, message: "reply Removed." });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error: "Server Side Error" });
  }
};
