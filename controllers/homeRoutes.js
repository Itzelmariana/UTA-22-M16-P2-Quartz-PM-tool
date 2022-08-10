const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      projects,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/projects/:id', withAuth, async (req, res) => {
  try {
    const modifData = await Project.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    console.log(modifData);
    if (!modifData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(modifData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/projects', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('projects', {
      projects,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));
    const userProjects = projectData.filter(
      (project) => project.user_id == req.session.user_id
    );
    // Pass serialized data and session flag into template
    res.render('dashboard', {
      projects,
      logged_in: req.session.logged_in,
      totalProjects: projectData.length,
      totalBudget: projectData
        .map((project) => project.budget)
        .reduce((previousSum, budget) => previousSum + budget, 0),
      totalInprogress: projectData.filter(
        (project) => project.status === 'In progress'
      ).length,
      totalDone: projectData.filter((project) => project.status === 'Done')
        .length,
      myTotalProjects: userProjects.length,

      totalEarlyStages: projectData.filter(
        (project) => project.status === 'Early Stages'
      ).length,
      totalBlocked: projectData.filter(
        (project) => project.status === 'Blocked'
      ).length,

      myTotalBudget: userProjects
        .map((project) => project.budget)
        .reduce((previousSum, budget) => previousSum + budget, 0),
      myTotalInprogress: userProjects.filter(
        (project) => project.status === 'In progress'
      ).length,
      myTotalDone: userProjects.filter((project) => project.status === 'Done')
        .length,
      myTotalEarlyStages: userProjects.filter(
        (project) => project.status === 'Early Stages'
      ).length,
      myTotalBlocked: userProjects.filter(
        (project) => project.status === 'Blocked'
      ).length,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
