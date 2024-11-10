import React, { useState } from 'react';
import '../NewInventory.css';
import Sidebar from './Sidebar';
const NewInventory = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    inStock: '',
    unitPrice: '',
    discount: '',
    orderType: 'Single Order',
    description: '',
  });

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // current date
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })); // current time

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      alert('Please upload a valid PNG or JPEG image.');
    }
  };

  const handleEditImage = () => {
    document.getElementById('imageUpload').click();
  };

  const submitForm = async (status) => {
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('category', formData.category);
    formDataObj.append('inStock', formData.inStock);
    formDataObj.append('unitPrice', formData.unitPrice);
    formDataObj.append('discount', formData.discount);
    formDataObj.append('orderType', formData.orderType);
    formDataObj.append('description', formData.description);
    formDataObj.append('date', date);
    formDataObj.append('time', time);
    formDataObj.append('status', status); // 'draft' or 'submitted'

    if (image) {
      formDataObj.append('image', image);
    }

    try {
      const response = await fetch('http://localhost:5000/api/new_inventory', {
        method: 'POST',
        body: formDataObj,
      });

      if (response.ok) {
        // alert(status === 'submitted' ? 'Product added successfully' : 'Draft saved successfully');
        // setFormData({
        //   name: '',
        //   category: 'Electronics',
        //   inStock: '',
        //   unitPrice: '',
        //   discount: '',
        //   orderType: 'Single Order',
        //   description: '',
        // });
        // setDate(new Date().toISOString().slice(0, 10));
        // setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        // setImage(null);
        // setPreview(null);
        const data = await response.json();
      alert('Product added successfully');
      } else {
        alert('Error saving product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm('submitted');
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    submitForm('draft');
  };

  return (
    
    <div className="inventory-container">
      {/* <div className="sidebar">Sidebar</div> */}
      <Sidebar />
      <div class="maincontainer">
        <div class="topnav">
          <div class="textnav">
            <div class="nav">
              <div class="textpart">
                <h1>Inventory</h1>
              </div>
              <div class="profile">
                <div class="nanny">
                  <img src="/images/nanny.png" alt="Logo" />
                </div>
                <div class="notify_profile">
                  <img src="/images/notify_profile.png" alt="Logo" />
                </div>
              </div>
            </div>

          </div>
          <div class="breadcrumbs">
            <div class="breadcrumbs_content">
              <div class="home">
                <img src="/images/home.png" alt="Logo" />
              </div>
              <div class="inventory_item">
                /Inventory
              </div>
              <div class="inventory_item1">
                /New
              </div>
              <div class="inventory_item2">

              </div>
              <div class="inventory_item3">

              </div>
            </div>
          </div>
        </div>
        <div className="form-container">
        <h1>Add New Inventory Item</h1>
        <form>
          <input type="text" placeholder="Product Name" name="name" value={formData.name} onChange={handleChange} />

          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Electronics">Gadgets</option>
            <option value="Clothing">Fashion</option>
            <option value="Furniture">Car</option>
          </select>

          <input type="number" placeholder="In Stock" name="inStock" value={formData.inStock} onChange={handleChange} />

          <input type="number" placeholder="Unit Price" name="unitPrice" value={formData.unitPrice} onChange={handleChange} />

          <input type="number" placeholder="Discount (%)" name="discount" value={formData.discount} onChange={handleChange} />

          <select name="orderType" value={formData.orderType} onChange={handleChange}>
            <option value="Single Order">Single Order</option>
            <option value="Bulk Order">Bulk Order</option>
          </select>

          <textarea placeholder="Description" name="description" value={formData.description} onChange={handleChange} />

          <div className="date-time">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>

          <button type="submit" onClick={handleSubmit}>Add Product</button>
          <button type="button" onClick={handleSaveDraft}>Save as Draft</button>
        </form>
      </div>

      <div className="upload-section">
        <p>Upload Image (PNG, JPEG only, 600x600 recommended)</p>
        <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} id="imageUpload" />
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
            <button onClick={handleEditImage}>Edit Image</button>
          </div>
        )}
      </div>
      </div>
      
    </div>
  );
};

export default NewInventory;
