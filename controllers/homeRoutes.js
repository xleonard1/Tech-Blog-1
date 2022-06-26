const router = require('express').Router();
const { User, Blogs, Comment} = require('../models');
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




  router.get('/dashboard', async (req, res) => {
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
        limit: 5
      });
      // Serialize data so the template can read it
      const blogs = blogData.map((blog) => blog.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('dashboard', { 
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
    include: [
      {
        model:Blogs, 
    
      }
    ],
  });

  const user = userData.get({ plain: true });

  res.render('profile', {
    ...user,
    logged_in: true
  });
} catch (err) {
  console.log(err)
  res.status(500).json(err);
}
});

// login routes

router.get('/login', (req, res) => {
// If the user is already logged in, redirect the request to another route
if (req.session.logged_in) {
  res.redirect('/profile');
  return;
}

res.render('login');
});


// blog posts with id

router.get('/post/:id', withAuth, async(req, res) => {
  try {
    const blogData = await Blogs.findByPk(req.params.id,
  
    {
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: Comment,
          include: [
            {
              model: User
            }
          ]
        },
        
      ],
      order: [
        ['date_created', 'DESC'],
      ],
    });
    const blog = blogData.get({ plain: true });
     console.log(blog);
    res.render('blogpost', {
      ...blog,
      logged_in: req.session.logged_in 
    })

  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})

router.delete('/post/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blogs.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.put('/edit/:id', withAuth, async (req, res) => {
  try {
    const newBlog = await Blogs.update({
      ...req.body,
      user_id: req.session.user_id,
    },
    {
      where: { id: req.params.id },
    });
    console.log('Edit Post:', newBlog);
    res.status(200).json(newBlog);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
})




module.exports = router;