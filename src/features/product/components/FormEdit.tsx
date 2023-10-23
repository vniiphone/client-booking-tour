import { useState } from 'react'
import { Input, Image, Upload, Select, message } from 'antd'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import ImgCrop from 'antd-img-crop'
import * as Yup from 'yup'

import { CheckCircleOutlined } from '@ant-design/icons'
import ImageUploading from "react-images-uploading";
import { PlusOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

import { getTourById } from '../../../services'
import Button from '../../../components/__atom/Button'
import productPlaceholder from '../../../assets/img/components/product_placeholder.png'
import { getPrerequisites } from '../services'
import ButtonGroup from 'antd/lib/button/button-group'

const { Option } = Select

const TourSchema = Yup.object().shape({
  name: Yup.string().min(1).required('Name is required!'),
  price: Yup.number()
    .min(1, 'Invalid price!')
    .max(1000000000, 'Too big!')
    .required('Price is required'),
  description: Yup.string().min(1).required('Description is required'),
  modelYear: Yup.number()
    .min(1000, `Product can't be that old :)`)
    .max(moment().year(), `Back to the future huh?`)
    .required('Model year is required'),
  soLuongVe: Yup.number()
    .min(1, `Product quantity must greater than 1`)
    .required('Stock quantity is required'),
  loaiTour_id: Yup.number().min(1, 'Please select Loai Tour'),
  imageUrls: Yup.string().required('Please upload image'),
})

interface Props {
  edit?: true
  handleSubmit: any
}
//Định nghĩa biến môi trường
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

function FormEditComp({ edit, handleSubmit }: Props) {
  const [loading, setLoading] = useState(false)

  const [pulicIds, setPublicIds] = useState<string[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [uploaded, setUploaded] = useState(false);

  const [cloudinaryImages, setCloudinaryImages] = useState<string[]>([]);
  const [images, setImages] = useState([]);
  const maxNumber = 4;
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageUrls);
  };
  // const [messageApi, contextHolder] = message.useMessage();
  // const infoAlertMsg = (textMsg: string) => {
  //     messageApi.info(textMsg);
  // };

  const onDrop = async (imageFiles: any) => {
    // console.log("size imageList: ", images.length);
    if (imageFiles.length > 0) {
      for (const image of imageFiles) {
        const data = new FormData();
        data.append("file", image.file);
        data.append("upload_preset", uploadPreset);
        data.append("cloud_name", cloudName);
        axios
          .post("https://api.cloudinary.com/v1_1/quocvu1202/image/upload", data)
          .then((response) => {
            console.log(response);
            setCloudinaryImages((prevImages) => [
              ...prevImages,
              response.data.secure_url,
            ]);
            setPublicIds((prevPublicId) => [
              ...prevPublicId,
              response.data.public_id,
            ]);
            message.success('Upload Thành Công ')

          })
          .catch((error) => {
            // infoAlertMsg('Lỗi ' + error.message)
            console.log(error.message);
          });
      }
      setUploaded(true);
      setLoading(false);
      setImages(imageFiles);
      setUploadedUrls(uploadedUrls);
    } else {
      setUploaded(false);
      message.error("Vui lòng thử lại");
      // infoAlertMsg("Vui lòng thử lại")
      // toast.error("Please select Images");
    }

    // console.log("UploadURL: " + uploadedUrls[]);
  };

  const { id } = useParams()
  const tourQuery = useQuery(['tour'], () => getTourById({ id }), {
    enabled: !!id,
  })
  const imageUrls = tourQuery.data?.imageUrls || [];

  const prerequisitesQuery = useQuery(['prerequisites'], getPrerequisites)

  // const ifEdit = () => {
  //     tourQuery.data ?
  // }





  return (
    <Formik
      initialValues={
        // !edit || tourQuery.isLoading
        // ? {
        //   name: '',
        //   tomTat: '',
        //   giaThamKhao: 0,
        //   ngayGioXuatPhat: '',
        //   ngayVe: '',
        //   soLuongVe: 0,
        //   loaiTour_id: 0,
        //   imageUrls: [],
        //   imagePublicIds: [],
        //   tourCode: '',
        //   noiKhoiHanh: '',
        //   visible: true,

        // }
        // :
        {
          ...tourQuery.data,
          loaiTour_id: tourQuery.data.loaiTour.id,
        }
      }
      enableReinitialize={true}
      onSubmit={(values) => handleSubmit.mutate(values)}
      validationSchema={TourSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <Form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div className='form-group'>
            <label className='form-label' htmlFor='name'>
              Tên Chuyến Đi
            </label>
            <Field
              component={Input}
              onChange={handleChange}
              onBlur={handleBlur}
              size='large'
              name='name'
              id='name'
              status={errors.name && touched.name ? 'error' : ''}
              value={values.name}
            />
            <ErrorMessage
              component='div'
              className='form-error'
              name='name'
            />
          </div>
          <div className='form-group'>
            <label className='form-label'>Số Lượng Vé Tour</label>
            <Field
              component={Input}
              onChange={handleChange}
              onBlur={handleBlur}
              size='large'
              name='soLuongVe'
              id='soLuongVe'
              status={
                errors.soLuongVe && touched.soLuongVe ? 'error' : ''
              }
              value={values.soLuongVe}
            />
            <ErrorMessage
              component='div'
              className='form-error'
              name='soLuongVe'
            />
          </div>
          <div className='form-group'>
            <label className='form-label' htmlFor='tomTat'>
              Tóm Tắt Giới Thiệu
            </label>
            <Field
              component={Input}
              onChange={handleChange}
              onBlur={handleBlur}
              size='large'
              name='tomTat'
              id='tomTat'
              status={
                errors.tomTat && touched.tomTat
                  ? 'error'
                  : ''
              }
              value={values.tomTat}
            />
            <ErrorMessage
              component='div'
              className='form-error'
              name='tomTat'
            />
          </div>

          <div className='form-group'>
            <label className='form-label' htmlFor='loaiTour'>
              Loại Tour
            </label>
            <Select
              id='loaiTour_id'
              value={values.loaiTour_id}
              onChange={(value) =>
                setFieldValue('loaiTour_id', value)
              }
              size='large'
              status={
                errors.loaiTour_id && touched.loaiTour_id
                  ? 'error'
                  : ''
              }
            >
              <Option value={0}>-- Loại Tour --</Option>
              {prerequisitesQuery?.data?.[0].map(
                (c: { id: number; name: string }) => (
                  <Option key={c.id} value={c.id}>
                    {c.name}
                  </Option>
                )
              )}
            </Select>
            <ErrorMessage
              component='div'
              className='form-error'
              name='loaiTour_id'
            />
          </div>

          <div className='form-group'>
            <label className='form-label' htmlFor='giaThamKhao'>
              Giá Vé Tham Khảo
            </label>
            <Field
              component={Input}
              onChange={handleChange}
              onBlur={handleBlur}
              size='large'
              name='giaThamKhao'
              id='giaThamKhao'
              status={
                errors.giaThamKhao && touched.giaThamKhao ? 'error' : ''
              }
              value={values.giaThamKhao}
            />
            <ErrorMessage
              component='div'
              className='form-error'
              name='giaThamKhao'
            />
          </div>

          <div className='form-group'>
            <label className='form-label'>Ngày giờ Xuất Phát</label>
            <Field
              component={Input}
              onChange={handleChange}
              onBlur={handleBlur}
              size='large'
              name='ngayGioXuatPhat'
              id='ngayGioXuatPhat'
              status={
                errors.ngayGioXuatPhat && touched.ngayGioXuatPhat
                  ? 'error'
                  : ''
              }
              value={values.ngayGioXuatPhat}
            />
            <ErrorMessage
              component='div'
              className='form-error'
              name='ngayGioXuatPhat'
            />
          </div>

          <div className='form-group'>

            <label className='form-label'>Hình Ảnh</label>
            <div className='form-group'>

              <label className='form-label'>Hình Ảnh</label>

              {/* <Image
    //     src={values.imageUrls}
    //     width={400}
    //     height={400}
    //     alt='Tour image'
    //     fallback={productPlaceholder}
    // />  
} */}

              {/* <ImgCrop
    rotate
    aspect={1 / 1}
    modalWidth={800}
    quality={0.8}
> */}
              {/* <Upload
        name={`imageFile`}
        id={`imageFile`}
        maxCount={4}
        beforeUpload={async (file) => {
            setLoading(true)
            const data = new FormData()
            data.append('file', file)
            data.append('upload_preset', 'spring_react')
            // data.append("file", image.file);
            data.append("upload_preset", uploadPreset);
            data.append("cloud_name", cloudName);
            const uploadRes = await axios.post(
                'https://api.cloudinary.com/v1_1/quocvu1202/image/upload',
                data,
                { withCredentials: false }
            ).then((response) => {
                console.log(response);
                setCloudinaryImages((prevImages) => [
                    ...prevImages,
                    response.data.secure_url,
                ]);
                setPublicIds((prevPublicId) => [
                    ...prevPublicId,
                    response.data.public_id,
                ]);
            });
            const { urls, public_ids } = uploadRes.data
            setFieldValue('imageUrls', urls)
            setFieldValue('imagePublicId', public_ids)
            setLoading(false)
            return false
        }}
        listType='picture-card'
        showUploadList={false}
    >
        Upload image
    </Upload> */}
              {/* </ImgCrop> */}
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >

                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">

                    <ButtonGroup>
                      <Button
                        // style={isDragging ? { color: 'red' } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        Click Để Thêm Ảnh
                      </Button>
                      <Button onClick={onImageRemoveAll}>Gỡ Tất Cả Ảnh</Button>
                      <Button onClick={() => onDrop(images)}>Tải Ảnh Lên Cloud</Button>
                    </ButtonGroup>
                    &nbsp;
                    {imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <img src={image['data_url']} alt="Lỗi" width="250px" height="200px" />
                        <div className="image-item__btn-wrapper">
                          <ButtonGroup>
                            <Button onClick={() => onImageUpdate(index)}>Cập Nhật</Button>
                            <Button onClick={() => onImageRemove(index)}>Gỡ</Button>
                          </ButtonGroup>
                          {uploaded &&
                            <span style={{ marginLeft: "25px" }}>
                              <CheckCircleOutlined />
                            </span>
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading>


              <ErrorMessage
                component='div'
                className='form-error'
                name='imageUrl'
              />
            </div>

          </div>

          <div className='d-flex mt-4 flex-align-center gap-3'>
            <Button to='/admin/tour/list' type='outline'>
              BACK
            </Button>
            <Button loading={loading}>
              {edit ? 'SAVE' : 'CREATE'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default FormEditComp
