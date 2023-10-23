import { useState } from 'react'
import { Input, Image, Upload, Select, message, DatePicker } from 'antd'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import moment from 'moment'
// import { useFormikContext } from 'formik';
import { useFormikContext } from 'formik';

import { Formik, Form, Field, ErrorMessage, FieldProps, FormikState, FormikHelpers, } from 'formik'
import ImgCrop from 'antd-img-crop'
import * as Yup from 'yup'
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';

//Convert time
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";

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

// let formikHelpersGlobal: FormikHelpers<any>;

// Import thư viện thời gian và kích hoạt các plugin
dayjs.extend(utc);
dayjs.extend(timezone);

// Đặt múi giờ mặc định
dayjs.tz.setDefault("Asia/Ho_Chi_Minh"); // Giờ Việt Nam

const TIMEZONES = ["Asia/Ho_Chi_Minh", "UTC"];

const { Option } = Select
const { RangePicker } = DatePicker;

const TourSchema = Yup.object().shape({
  name: Yup.string().min(1).required('Bạn Chưa Nhập Tên Tour'),
  giaThamKhao: Yup.number()
    .min(1, 'Không Hợp Lệ')
    .max(1000000000, 'Không Hợp Lệ!')
    .required('required'),
  tomTat: Yup.string().min(1).required('required'),
  ngayGioXuatPhat: Yup.number()
    .min(1000, `Không hợp lệ :)`)
    .required('required'),
  ngaVe: Yup.number()
    .min(1000, `Không hợp lệ :)`)
    .required('required'),
  soLuongVe: Yup.number()
    .min(1, `Quá ít`)
    .required('required'),
  loaiTour_id: Yup.number().min(0, 'Không được chọn Tát Cả'),
  imageUrls: Yup.string().required('Please upload image'),
})

interface Props {
  edit?: boolean
  handleSubmit: any
}

//Định nghĩa biến môi trường
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

function FormComp({ edit, handleSubmit }: Props) {
  const [loading, setLoading] = useState(false)
  // const { setFieldValue } = useFormikContext();
  // const [pulicIds, setPublicIds] = useState<string[]>([]);
  // const [urls, setUrls] = useState<string[]>([]);
  // const [uploaded, setUploaded] = useState(false);

  // const [cloudinaryImages, setCloudinaryImages] = useState<string[]>([]);
  // const [images, setImages] = useState([]);
  // const maxNumber = 4;
  // const [uploadedUrls, setUploadedUrls] = useState([]);

  // const [startDateTime, setStartDateTime] = useState();
  // const [endDate, setEndDate] = useState();


  // const onChange = (imageList: any, addUpdateIndex: any) => {
  //     // data for submit
  //     console.log(imageList, addUpdateIndex);
  //     setImages(imageList);
  // };


  // const dateToTimestamp = (dateString: any) => {
  //     const date = dayjs(dateString);
  //     return date.isValid() ? date.valueOf() : null;
  // };
  const { id } = useParams()
  const tourQuery = useQuery(['tour'], () => getTourById({ id }), {
    enabled: !!id,
  })
  // const imageUrls = tourQuery.data?.imageUrls || [];

  const prerequisitesQuery = useQuery(['prerequisites'], getPrerequisites)


  // const onclickSubmitCreate = () => {
  //     console.log('onclickSubmitCreate', tourQuery.data);
  // }

  // const saveUrls = (urls: Array<string>, ids: Array<string>) => {
  //     // if (formikHelpersGlobal) {
  //     // setFieldValue('imageUrls', urls);
  //     // setFieldValue('imagePublicIds', ids);
  //     showUrl()
  //     console.log('saveUrls: ', urls)
  //     // }
  // };
  // const showUrl = () => {
  //     console.log('showUrl', cloudinaryImages.toString)
  // }
  // const onDrop = async (imageFiles: any) => {
  //     // console.log("size imageList: ", images.length);
  //     if (imageFiles.length > 0) {
  //         const newImageUrls: string[] = [];
  //         const newImagePublicIds: string[] = [];
  //         setLoading(true)
  //         for (const image of imageFiles) {
  //             const data = new FormData();
  //             data.append("file", image.file);
  //             data.append("upload_preset", uploadPreset);
  //             data.append("cloud_name", cloudName);

  //             try {
  //                 const response = await
  //                     axios.post("https://api.cloudinary.com/v1_1/quocvu1202/image/upload", data);

  //                 newImageUrls.push(response.data.secure_url);
  //                 newImagePublicIds.push(response.data.public_id);
  //             } catch (error: any) {
  //                 console.log(error.message);
  //             }
  //         }
  //         // for (const image of imageFiles) {
  //         //     const data = new FormData();
  //         //     // 
  //         //     data.append("file", image.file);
  //         //     data.append("upload_preset", uploadPreset);
  //         //     data.append("cloud_name", cloudName);
  //         //     axios
  //         //         .post("https://api.cloudinary.com/v1_1/quocvu1202/image/upload", data)
  //         //         .then((response) => {
  //         //             // console.log(response.data);
  //         //             setCloudinaryImages((prevImages) => [
  //         //                 ...prevImages,
  //         //                 response.data.secure_url,
  //         //             ]);
  //         //             setPublicIds((prevPublicId) => [
  //         //                 ...prevPublicId,
  //         //                 response.data.public_id,
  //         //             ]);

  //         //             message.success('Upload Thành Công ')

  //         //         })
  //         //         .catch((error) => {
  //         //             // infoAlertMsg('Lỗi ' + error.message)
  //         //             console.log(error.message);
  //         //         });
  //         // }

  //         setUploaded(true);
  //         setLoading(false)
  //         setImages(imageFiles);
  //         setUploadedUrls(uploadedUrls);
  //     } else {
  //         setUploaded(false);
  //         message.error("Vui lòng thử lại");

  //     }
  // };

  return (
    <Formik
      initialValues={
        !edit || tourQuery.isLoading
          ? {
            name: '',
            tomTat: '',
            giaThamKhao: 0,
            ngayGioXuatPhat: '',
            ngayVe: '',
            soLuongVe: 0,
            loaiTour_id: 0,
            imageUrls: '',
            imagePublicIds: '',
            tourCode: '',
            noiKhoiHanh: '',
            visible: true,
          }
          : {
            // ...tourQuery.data.imageUrls || [],
            // ...tourQuery.data.imagePublicIds || [],
            ...tourQuery.data,
            loaiTour_id: tourQuery.data.loaiTour.id,

          }
      }
      enableReinitialize={true}
      onSubmit={(values) => handleSubmit.mutate(values)}

      // onSubmit={(values) => handleSubmit.mutate(values)}
      // onSubmit={(values) => {
      //     // Extract the imageUrls array from the form values
      //     const { imageUrls, imagePublicIds, ...otherValues } = values;

      //     handleSubmit.mutate({ ...otherValues, imageUrls, imagePublicIds }, {
      //         onSuccess: () => {
      //             // Handle success
      //             console.log('Object saved', values)
      //             // setSubmitting(false);
      //         },
      //         // Handle other callbacks as needed
      //     });
      // }}
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
            gap: '25px',
            fontFamily: 'serif'
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
              type='number'
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
              multiple={4}
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
              style={{ width: 220 }}
              id='loaiTour_id'
              allowClear
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
            <label className='form-label' htmlFor='tomTat'>
              Nơi Khởi Hành
            </label>
            <Field
              component={Input}
              onChange={handleChange}
              multiple={4}
              onBlur={handleBlur}
              size='large'
              name='noiKhoiHanh'
              id='noiKhoiHanh'
              status={
                errors.noiKhoiHanh && touched.noiKhoiHanh
                  ? 'error'
                  : ''
              }
              value={values.noiKhoiHanh}
            />
            <ErrorMessage
              component='div'
              className='form-error'
              name='noiKhoiHanh'
            />
          </div>
          <div className='form-group'>
            <label className='form-label' htmlFor='giaThamKhao'>
              Giá Vé Tham Khảo
            </label>
            <div className='input-with-currency'>

              <Field
                type='number'
                prefix='VND'
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
            </div>
            <ErrorMessage
              component='div'
              className='form-error'
              name='giaThamKhao'
            />
          </div>

          <div className='form-group'>
            <label className='form-label'>Ngày giờ Xuất Phát</label>
            <Field name='ngayGioXuatPhat'>
              {({ field, form }: FieldProps) => (
                <DatePicker
                  showTime={{ format: 'HH:mm' }}
                  format='DD-MM-YYYY HH:mm'
                  value={field.value ? moment(field.value) : null}
                  onChange={(date, dateString) => {
                    form.setFieldValue('ngayGioXuatPhat', dateString);
                    console.log('ngayGioXuatPhat' + dateString);
                  }}
                  onOk={(date) => {
                    const timestamp = dayjs(date.toDate()).unix() * 1000; // Chuyển đổi sang timestamp
                    form.setFieldValue('ngayGioXuatPhat', timestamp);
                    console.log('ngayGioXuatPhat: ', timestamp);
                  }}

                  onBlur={() => form.setFieldTouched('ngayGioXuatPhat', true)}
                />
              )}
            </Field>
            <div className='form-group'>
              <label className='form-label'>Ngày Về</label>
              <Field name='ngayVe'>
                {({ field, form }: FieldProps) => (
                  <DatePicker
                    format='DD-MM-YYYY HH'
                    value={field.value ? moment(field.value) : null}
                    showTime={{ format: 'HH' }}

                    onChange={(date, dateString) => {
                      form.setFieldValue('ngayVe', dateString);
                      console.log('ngayVe' + dateString);
                    }}
                    onOk={(date) => {
                      const timestamp = dayjs(date.toDate()).unix() * 1000; // Chuyển đổi sang timestamp
                      form.setFieldValue('ngayVe', timestamp);
                      console.log('ngayVe: ', timestamp);
                    }}


                    onBlur={() => form.setFieldTouched('ngayVe', true)}
                  />
                )}
              </Field>

              <ErrorMessage
                component='div'
                className='form-error'
                name='ngayVe'
              />
            </div>
          </div>
          <div className='form-group'>

            <label className='form-label'>Hình Ảnh</label>
            <Image
              src={values.imageUrls}
              width={600}
              height={400}
              alt='Tour image'
              fallback={productPlaceholder}
            />
            <ImgCrop
              rotate
              aspect={1 / 1}
              modalWidth={800}
              quality={0.8}
            >
              <Upload
                name={`imageFile`}
                id={`imageFile`}
                maxCount={1}
                beforeUpload={async (file) => {
                  setLoading(true)
                  const data = new FormData()
                  data.append("file", file);
                  data.append("upload_preset", uploadPreset);
                  data.append("cloud_name", cloudName);
                  // axios.post("https://api.cloudinary.com/v1_1/quocvu1202/image/upload", data);

                  const uploadRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/quocvu1202/image/upload", data,
                    { withCredentials: false }
                  )
                  const { url, public_id } = uploadRes.data
                  setFieldValue('imageUrls', url)
                  setFieldValue('imagePublicIds', public_id)
                  setLoading(false)
                  return false
                }}
                listType='picture-card'
                showUploadList={false}
              >
                Upload image
              </Upload>
            </ImgCrop>



            {/* <ImageUploading
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

                                        {
                                            imageList.length > 0 &&
                                            <Button onClick={() => onDrop(imageList)
                                            }>
                                                Tải Ảnh Lên Cloud
                                            </Button>

                                        }

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
                        </ImageUploading> */}
            {/* <input type="hidden" name="imageUrls" value={values.imageUrls.join(',')} /> */}


            <ErrorMessage
              component='div'
              className='form-error'
              name='imageUrls'
            />
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

export default FormComp
