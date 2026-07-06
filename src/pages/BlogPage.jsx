import { Box, Container, Typography, Paper, Divider, Grid, Card, CardContent, CardMedia } from '@mui/material';
import HomeNavbar from '../components/common/HomeNavbar';
import HomeFooter from '../components/common/HomeFooter';
import FloatingActions from '../components/common/FloatingActions';

// Reuse product images for blog thumbnails
import Draw6 from '../assets/product/draw6.png';
import Draw5 from '../assets/product/draw5.png';

const BlogPage = () => {
  const posts = [
    {
      id: 1,
      title: "Caring for Your Oil Canvas Paintings",
      desc: "An essential guide outlining how to clean, frame, and preserve textured oil paintings from humidity and direct sun exposure.",
      img: Draw6,
      date: "June 24, 2026"
    },
    {
      id: 2,
      title: "Modern Color Palettes for Minimalist Living",
      desc: "Learn how modern galleries coordinate abstracts and cityscapes with current wall mount trends and interior layouts.",
      img: Draw5,
      date: "May 18, 2026"
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
      <HomeNavbar />

      <Box component="main" sx={{ flexGrow: 1, py: { xs: 6, md: 10 }, backgroundColor: '#FAF8F6' }}>
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, sm: 6 },
              borderRadius: 2,
              border: '1px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.02)'
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontFamily: 'serif',
                fontWeight: 600,
                mb: 2,
                color: '#1A1A1A',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
              }}
            >
              ColorFrame Blog
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Insights into the art world, painting frames, preservation tips, and interior coordination.
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Grid container spacing={3}>
              {posts.map((post) => (
                <Grid item xs={12} key={post.id}>
                  <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, border: '1px solid #E5E7EB', boxShadow: 'none' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: { xs: '100%', sm: 200 }, height: 200, objectFit: 'cover' }}
                      image={post.img}
                      alt={post.title}
                    />
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                        {post.date}
                      </Typography>
                      <Typography variant="h6" component="h2" fontWeight={700} sx={{ mb: 1 }}>
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {post.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      </Box>

      <FloatingActions />
      <HomeFooter />
    </Box>
  );
};

export default BlogPage;
