const router = require('express').Router();
const { User, Blogs} = require('../models');
const withAuth = require('../utils/auth');

// router to get to the homepage
  router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const blogData = await Blogs.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],

        order: [
          ['date_created', 'DESC'],
        ],
        limit: 3
      });
      // Serialize data so the template can read it
      const blogs = blogData.map((blog) => blog.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        blogs, 
        logged_in: req.session.logged_in 
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
    include: [{model:Blogs}]
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

router.get('/post/:id', withAuth, async(req, res) => {
  try {
    const blogData = await Blogs.findByPk(req.params.id,
  
    {
      include: [
        {
          model: User,
          attributes: ['name']
        },
      ],
    });
    const blog = blogData.get({ plain: true });

    res.render('blogpost', {
      ...blog,
      logged_in: req.session.logged_in 
    })

  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})



module.exports = router;