const router = require('express').Router();
const { User, Game} = require('../models');
const withAuth = require('../utils/auth');

// router to get to the homepage
router.get('/', async (req, res) => {
  res.render('homepage', {title:router});
});


// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
try {
  // Find the logged in user based on the session ID
  const userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] },
    include: [{model:Game}]
  });

  const user = userData.get({ plain: true });

  res.render('profile', {
    ...user,
    logged_in: true
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

router.get('/leaderboard', async (req,res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Game }]
    });
    const leader = userData.get({ plain: true });

    res.render('leaderboard', {
      ...leader,
      logged_in: true
    })
  } catch (err) {
    res.status(500).json(err)

  }
})

router.get('/settings', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Game }]
    });
  
    const user = userData.get({ plain: true });
  
    res.render('settings', {
      ...user,
      logged_in: true,
      user_id: req.session.user_id
    });
   } catch (err) {
    res.status(500).json(err);
   }
  });


  

module.exports = router;