import { React, useState, useRef, forwardRef } from 'react'
import { Uploader, Button } from 'rsuite';
import { Loader, Placeholder } from 'rsuite';
import ImageIcon from '@rsuite/icons/Image';

import "./patientProfileDrawer.css"

const PatientProfile = () => {
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)

  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'GamaUpload')
    setLoading(true)
    const res = await fetch(
      '	https://api.cloudinary.com/v1_1/dqwwqax3d/image/upload',
      {
        method: 'POST',
        body: data,
      }
    )
    const file = await res.json()

    setImage(file.secure_url)
    setLoading(false)
  }

  const handleChangeProfile = async () => {
    try {
      let res = await fetch("http://localhost:8000/changePatientProfile", {
        method: "POST",
        body: JSON.stringify({ image: image }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      let resJson = await res.json();
    } catch (err) {
      console.log(err);
    }
    window.location.reload(true);

  };

  return (
    <div className="App">
      <h1>Upload New Profile</h1>
      <div className="my_uploader">
        <label for="inputTag">
          <ImageIcon className="FileUploadIcon" />
          <input
            className="filInput"
            type="file"
            name="file"
            id="inputTag"
            placeholder="Upload an image"
            onChange={uploadImage}
          />
          <p className="imageUploadLabel">Upload image</p>
          <br />
          <span id="imageName"></span>
        </label>
      </div>

      {loading ? (
        <div>
          <Placeholder.Paragraph rows={8} />
          <Loader backdrop content="loading..." vertical />
        </div>
      ) : (
        <div>
        </div>
      )}
      {image ? (
        <div>
          <img src={image} style={{ width: '300px' }} alt='' />
          <Button onClick={handleChangeProfile}>Change profile</Button>
        </div>) : (
        <div>
        </div>
      )}

    </div>
  )
}

export default PatientProfile