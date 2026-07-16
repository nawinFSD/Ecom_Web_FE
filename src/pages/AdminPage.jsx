import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Snackbar,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

// Components & Services
import HomeNavbar from '../components/common/HomeNavbar';
import HomeFooter from '../components/common/HomeFooter';
import productService from '../services/productService';

// Asset images map for avatars
import Draw1 from '../assets/product/draw1.jpg';
import Draw2 from '../assets/product/draw2.jpg';
import Draw3 from '../assets/product/draw3.jpg';
import Draw4 from '../assets/product/draw4.jpg';
import Draw5 from '../assets/product/draw5.png';
import Draw6 from '../assets/product/draw6.png';
import Draw7 from '../assets/product/draw7.jpg';
import Draw8 from '../assets/product/draw8.jpg';
import Draw9 from '../assets/product/draw9.png';
import Draw10 from '../assets/product/draw10.png';
import Draw11 from '../assets/product/draw11.png';
import Draw12 from '../assets/product/draw12.png';
import Draw13 from '../assets/product/draw13.png';
import Draw14 from '../assets/product/draw14.png';
import Draw15 from '../assets/product/draw15.jpg';

import Paint1 from '../assets/product/paint1.jpg';
import Paint2 from '../assets/product/paint2.jpg';
import Paint3 from '../assets/product/paint3.jpg';
import Paint4 from '../assets/product/paint4.jpg';
import Paint5 from '../assets/product/paint5.jpg';
import Paint6 from '../assets/product/paint6.jpg';
import Paint7 from '../assets/product/paint7.jpg';
import Paint8 from '../assets/product/paint8.jpg';
import Paint9 from '../assets/product/paint9.jpg';
import Paint10 from '../assets/product/paint10.jpg';
import Paint11 from '../assets/product/paint11.jpg';
import Paint12 from '../assets/product/paint12.jpg';
import Paint13 from '../assets/product/paint13.jpg';
import Paint14 from '../assets/product/paint14.jpg';
import Paint15 from '../assets/product/paint15.jpg';

import Sculp1 from '../assets/product/sculp1.jpg';
import Sculp2 from '../assets/product/sculp2.png';
import Sculp3 from '../assets/product/sculp3.jpg';
import Sculp4 from '../assets/product/sculp4.jpg';
import Sculp5 from '../assets/product/sculp5.jpg';
import Sculp6 from '../assets/product/sculp6.jpg';
import Sculp7 from '../assets/product/sculp7.jpg';
import Sculp8 from '../assets/product/sculp8.jpg';
import Sculp9 from '../assets/product/sculp9.jpg';
import Sculp10 from '../assets/product/sculp10.jpg';
import Sculp11 from '../assets/product/sculp11.jpg';
import Sculp12 from '../assets/product/sculp12.jpg';
import Sculp13 from '../assets/product/sculp13.jpg';
import Sculp14 from '../assets/product/sculp14.jpg';
import Sculp15 from '../assets/product/sculp15.jpg';

const imageMap = {
  draw1: Draw1, draw2: Draw2, draw3: Draw3, draw4: Draw4, draw5: Draw5, draw6: Draw6, draw7: Draw7, draw8: Draw8, draw9: Draw9, draw10: Draw10, draw11: Draw11, draw12: Draw12, draw13: Draw13, draw14: Draw14, draw15: Draw15,
  paint1: Paint1, paint2: Paint2, paint3: Paint3, paint4: Paint4, paint5: Paint5, paint6: Paint6, paint7: Paint7, paint8: Paint8, paint9: Paint9, paint10: Paint10, paint11: Paint11, paint12: Paint12, paint13: Paint13, paint14: Paint14, paint15: Paint15,
  sculp1: Sculp1, sculp2: Sculp2, sculp3: Sculp3, sculp4: Sculp4, sculp5: Sculp5, sculp6: Sculp6, sculp7: Sculp7, sculp8: Sculp8, sculp9: Sculp9, sculp10: Sculp10, sculp11: Sculp11, sculp12: Sculp12, sculp13: Sculp13, sculp14: Sculp14, sculp15: Sculp15
};

const AdminPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProductId, setEditingProductId] = useState(null);
  
  // Notification states
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // New product form states
  const [newProduct, setNewProduct] = useState({
    title: '',
    artist: '',
    price: '',
    oldPrice: '',
    category: 'Paintings',
    imageKey: 'paint1',
    customImageUrl: '',
    medium: 'Oil on Canvas',
    dimensions: '24" × 36"',
    year: new Date().getFullYear().toString(),
    badge: '',
    description: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      showToast('Failed to load products from server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.title.trim() || !newProduct.artist.trim() || !newProduct.price || !newProduct.description.trim()) {
      showToast('Please fill all required fields.', 'warning');
      return;
    }

    const finalImageKey = newProduct.customImageUrl.trim() || newProduct.imageKey;

    try {
      if (editingProductId) {
        // Edit mode
        const updated = await productService.updateProduct(editingProductId, {
          ...newProduct,
          imageKey: finalImageKey,
          price: parseInt(newProduct.price),
          oldPrice: newProduct.oldPrice ? parseInt(newProduct.oldPrice) : null,
          year: parseInt(newProduct.year)
        });

        showToast('Product updated successfully!');
        setProducts(prev => prev.map(p => p.id === editingProductId ? updated : p));
        setEditingProductId(null);
      } else {
        // Add mode
        const added = await productService.addProduct({
          ...newProduct,
          imageKey: finalImageKey,
          price: parseInt(newProduct.price),
          oldPrice: newProduct.oldPrice ? parseInt(newProduct.oldPrice) : null,
          year: parseInt(newProduct.year),
          rating: 5.0
        });

        showToast('Product added successfully to database!');
        setProducts(prev => [added, ...prev]);
      }
      
      // Reset form
      setNewProduct({
        title: '',
        artist: '',
        price: '',
        oldPrice: '',
        category: 'Paintings',
        imageKey: 'paint1',
        customImageUrl: '',
        medium: 'Oil on Canvas',
        dimensions: '24" × 36"',
        year: new Date().getFullYear().toString(),
        badge: '',
        description: ''
      });
    } catch (err) {
      showToast(err.message || 'Error saving product.', 'error');
    }
  };

  const handleStartEdit = (prod) => {
    setEditingProductId(prod.id);
    setNewProduct({
      title: prod.title || '',
      artist: prod.artist || '',
      price: prod.price ? prod.price.toString() : '',
      oldPrice: prod.oldPrice ? prod.oldPrice.toString() : '',
      category: prod.category || 'Paintings',
      imageKey: Object.keys(imageMap).includes(prod.imageKey) ? prod.imageKey : 'paint1',
      customImageUrl: !Object.keys(imageMap).includes(prod.imageKey) ? prod.imageKey : '',
      medium: prod.medium || 'Oil on Canvas',
      dimensions: prod.dimensions || '24" × 36"',
      year: prod.year ? prod.year.toString() : new Date().getFullYear().toString(),
      badge: prod.badge || '',
      description: prod.description || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setNewProduct({
      title: '',
      artist: '',
      price: '',
      oldPrice: '',
      category: 'Paintings',
      imageKey: 'paint1',
      customImageUrl: '',
      medium: 'Oil on Canvas',
      dimensions: '24" × 36"',
      year: new Date().getFullYear().toString(),
      badge: '',
      description: ''
    });
  };

  const handleRemoveProduct = async (id) => {
    if (!window.confirm('Are you sure you want to remove this product from the website?')) return;

    try {
      await productService.removeProduct(id);
      showToast('Product removed successfully.');
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      showToast(err.message || 'Error removing product.', 'error');
    }
  };

  const getProductImage = (imageKey) => {
    if (imageKey && (imageKey.startsWith('http') || imageKey.startsWith('/'))) {
      return imageKey;
    }
    return imageMap[imageKey] || imageMap['paint1'];
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FAF8F6' }}>
      <HomeNavbar />

      <Container maxWidth="xl" sx={{ py: 6, flexGrow: 1 }}>
        {/* Page Title Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 5 }}>
          <IconButton onClick={() => navigate('/products')} sx={{ color: '#1A1A1A' }}>
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h4" fontWeight={850} letterSpacing="-0.02em">
              Owner Panel & Catalog Admin
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add or remove fine art listings dynamically from the live database
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Left Column: Add Product Form */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ borderRadius: '16px', border: '1px solid #EAEAEA', boxShadow: 'none' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight={750} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  {editingProductId ? <EditIcon /> : <AddIcon />} {editingProductId ? 'Edit Artwork details' : 'Add New Artwork'}
                </Typography>
                
                <Box component="form" onSubmit={handleAddProduct} sx={{ display: 'flex', flexDirection: 'column', gap: 2.2 }}>
                  <TextField label="Artwork Title *" name="title" value={newProduct.title} onChange={handleInputChange} fullWidth size="small" />
                  <TextField label="Artist Name *" name="artist" value={newProduct.artist} onChange={handleInputChange} fullWidth size="small" />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField label="Price (₹) *" name="price" type="number" value={newProduct.price} onChange={handleInputChange} fullWidth size="small" />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField label="Old Price (₹)" name="oldPrice" type="number" value={newProduct.oldPrice} onChange={handleInputChange} fullWidth size="small" />
                    </Grid>
                  </Grid>

                  <FormControl fullWidth size="small">
                    <InputLabel>Category *</InputLabel>
                    <Select value={newProduct.category} label="Category *" onChange={(e) => handleSelectChange('category', e.target.value)}>
                      <MenuItem value="Paintings">Paintings</MenuItem>
                      <MenuItem value="Drawings">Drawings</MenuItem>
                      <MenuItem value="Sculpture">Sculpture</MenuItem>
                      <MenuItem value="Digital Art">Digital Art</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth size="small">
                    <InputLabel>Select Existing Image</InputLabel>
                    <Select value={newProduct.imageKey} label="Select Existing Image" onChange={(e) => handleSelectChange('imageKey', e.target.value)}>
                      {Object.keys(imageMap).map(key => (
                        <MenuItem key={key} value={key}>{key}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField label="Or Custom Image URL" name="customImageUrl" value={newProduct.customImageUrl} onChange={handleInputChange} fullWidth size="small" helperText="Overrides selection if entered" />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField label="Medium" name="medium" value={newProduct.medium} onChange={handleInputChange} fullWidth size="small" />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField label="Year" name="year" value={newProduct.year} onChange={handleInputChange} fullWidth size="small" />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField label="Dimensions" name="dimensions" value={newProduct.dimensions} onChange={handleInputChange} fullWidth size="small" />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Badge</InputLabel>
                        <Select value={newProduct.badge} label="Badge" onChange={(e) => handleSelectChange('badge', e.target.value)}>
                          <MenuItem value="">None</MenuItem>
                          <MenuItem value="SALE">SALE</MenuItem>
                          <MenuItem value="NEW">NEW</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <TextField label="Artwork Description *" name="description" value={newProduct.description} onChange={handleInputChange} fullWidth multiline rows={3} size="small" />

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
                    <Button type="submit" variant="contained" sx={{ backgroundColor: '#1A1A1A', color: '#FFF', fontWeight: 700, '&:hover': { backgroundColor: '#333' }, py: 1.2 }}>
                      {editingProductId ? 'Save Changes' : 'Publish Listing'}
                    </Button>
                    {editingProductId && (
                      <Button variant="outlined" color="inherit" onClick={handleCancelEdit} sx={{ fontWeight: 700, py: 1.2 }}>
                        Cancel Edit
                      </Button>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column: Products List Table */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ borderRadius: '16px', border: '1px solid #EAEAEA', boxShadow: 'none' }}>
              <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px' }}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#FAF9F8' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Artwork</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Artist</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                      <TableCell sx={{ fontWeight: 700, align: 'right' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                          Loading artwork catalog...
                        </TableCell>
                      </TableRow>
                    ) : products.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                          No listings found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      products.map((prod) => (
                        <TableRow key={prod.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar src={getProductImage(prod.imageKey)} variant="rounded" sx={{ width: 44, height: 44 }} />
                              <Box>
                                <Typography variant="body2" fontWeight={750}>{prod.title}</Typography>
                                <Typography variant="caption" color="text.secondary">{prod.medium}</Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{prod.artist}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">{prod.category}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight={700}>₹{prod.price}</Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              <IconButton onClick={() => handleStartEdit(prod)} sx={{ color: '#2D7D9A' }}>
                                <EditIcon />
                              </IconButton>
                              <IconButton onClick={() => handleRemoveProduct(prod.id)} sx={{ color: '#E03C3C' }}>
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <HomeFooter />

      {/* Toast Notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPage;
