import { useState, useEffect } from 'react'
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

import { getLichTrinhTourById, getTourById, getLichTrinhSingle } from '../../../services'
import Button from '../../../components/__atom/Button'
import productPlaceholder from '../../../assets/img/components/product_placeholder.png'
// import { getPrerequisites } from '../services'
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

// interface FormValues {
//   tenLichTrinh: string;
//   sttLichTrinh: number;
//   ghiChu: string;
//   lichTrinhChiTiet: string;
//   visible: boolean;
//   diemDen: string[]; // Kiểu dữ liệu phù hợp với diemDen
//   nameKhachSan: string
//   diaChiKhachSan: string
//   giaPhongKhachSan: number
//   phoneKhachSan: string
// }
const LTTTourSchema = Yup.object().shape({
  tenLichTrinh: Yup.string().min(1).required('Bạn Chưa Nhập Tên LichTrinh'),
  sttLichTrinh: Yup.number()
    .min(0, 'Không Hợp Lệ')
    .max(50, 'Không Hợp Lệ!')
    .required('required'),
  ghiChu: Yup.string().min(1).required('required'),
  lichTrinhChiTiet: Yup.string().min(1).required('Bạn Chưa Nhập lichTrinhChiTiet'),
  name: Yup.string().min(1).required('Tên Khách Sạn Rỗng'),
  diaChiKsan: Yup.string().min(1).required('Required'),
  giaPhong: Yup.number()
    .min(0, 'Không Hợp Lệ')
    .max(10000000, 'Không Hợp Lệ!')
    .required('required'),
  phone: Yup.string().min(0).required('Required'),
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

  const { id, lichtrinh_id } = useParams();

  // Bây giờ bạn có thể sử dụng tourid và lichtrinhid trong component của bạn


  console.log("Lichtrinhtour ID: " + lichtrinh_id + " Tour ID: " + id)
  const lichTrinhTourQuery = useQuery(['lichTrinhTour'],
    () => getLichTrinhSingle({ lichtrinh_id }), {
    enabled: !!lichtrinh_id,
  })
  console.log("lichTrinhTour Query:", lichTrinhTourQuery.data);

  const tourQuery = useQuery(['tour'],
    () => getTourById({ id }))
  console.log("Tour Query:", tourQuery.data);

  let soThuTuLT;

  // if (!edit) {
  //   if (lichTrinhTourQuery.data) {
  //     soThuTuLT = lichTrinhTourQuery.data.sttLichTrinh + 1;
  //     console.log("STT: " + soThuTuLT);
  //   } else {
  //     soThuTuLT = 1;
  //     console.log("STT: " + soThuTuLT);
  //   }
  // }
  // else {
  //   soThuTuLT = 1;
  //   console.log("STT: " + soThuTuLT);
  // }



  return (
    <>
      <Formik
        initialValues={
          !edit || lichTrinhTourQuery.isLoading
            ? {
              tour_id: id,
              tenLichTrinh: '',
              phuongTien: '',
              sttLichTrinh: 0,
              ghiChu: '',
              nameKhachSan: '',
              diaChiKhachSan: '',
              giaPhongKhachSan: 0,
              phoneKhachSan: '',
              lichTrinhChiTiet: '',
              diemDen: [],
              visible: true,
            }
            : {
              ...lichTrinhTourQuery.data,
              tour_id: id,
            }
        }
        enableReinitialize={true}
        onSubmit={(values) => {
          console.log('Submitting values:', values);
          handleSubmit.mutate(values);
        }}
      // validationSchema={LTTTourSchema}
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
              {tourQuery.data !== undefined && tourQuery.isSuccess &&
                <label className='form-label' >
                  Thông tin Lịch Trình: {tourQuery.data.name}
                </label>
              }
              <label className='form-label' htmlFor='tenLichTrinh'>
                Tên Lịch Trình
              </label>
              <Field
                component={Input}
                onChange={handleChange}
                onBlur={handleBlur}
                size='large'
                name='tenLichTrinh'
                id='tenLichTrinh'
                status={errors.tenLichTrinh && touched.tenLichTrinh ? 'error' : ''}
                value={values.tenLichTrinh}
              />
              <ErrorMessage
                component='div'
                className='form-error'
                name='tenLichTrinh'
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Thứ Tự Lịch Trình</label>
              <Field
                component={Input}
                type='number'
                onChange={handleChange}
                onBlur={handleBlur}
                size='large'
                name='sttLichTrinh'
                id='sttLichTrinh'
                status={
                  errors.sttLichTrinh && touched.sttLichTrinh ? 'error' : ''
                }
                value={values.sttLichTrinh}
              />
              <ErrorMessage
                component='div'
                className='form-error'
                name='sttLichTrinh'
              />
            </div>
            <div className='form-group'>
              <label className='form-label' htmlFor='ghiChu'>
                Ghi Chú HDV
              </label>
              <Field
                component={Input}
                onChange={handleChange}
                onBlur={handleBlur}
                size='large'
                name='ghiChu'
                id='ghiChu'
                status={
                  errors.ghiChu && touched.ghiChu
                    ? 'error'
                    : ''
                }
                value={values.ghiChu}
              />
              <ErrorMessage
                component='div'
                className='form-error'
                name='ghiChu'
              />
            </div>

            <div className='form-group'>
              <label className='form-label' htmlFor='lichTrinhChiTiet'>
                Lịch Trình Chi Tiết
              </label>
              <Field
                component={Input}
                onChange={handleChange}
                multiple={4}
                onBlur={handleBlur}
                size='large'
                name='lichTrinhChiTiet'
                id='lichTrinhChiTiet'
                status={
                  errors.lichTrinhChiTiet && touched.lichTrinhChiTiet
                    ? 'error'
                    : ''
                }
                value={values.lichTrinhChiTiet}
              />
              <ErrorMessage
                component='div'
                className='form-error'
                name='lichTrinhChiTiet'
              />
            </div>
            <div className='form-group'>
              <label className='form-label' htmlFor='nameKhachSan'>
                Tên Khách Sạn
              </label>
              <Field
                component={Input}
                onChange={handleChange}
                onBlur={handleBlur}
                size='large'
                name='nameKhachSan'
                id='nameKhachSan'
                status={
                  errors.nameKhachSan && touched.nameKhachSan
                    ? 'error'
                    : ''
                }
                value={values.nameKhachSan}
              />
              <ErrorMessage
                component='div'
                className='form-error'
                name='nameKhachSan'
              />
            </div>
            <div className='form-group'>
              <label className='form-label' htmlFor='diaChiKhachSan'>
                Địa Chỉ Khách Sạn
              </label>
              <Field
                component={Input}
                onChange={handleChange}
                multiple={2}
                onBlur={handleBlur}
                size='large'
                name='diaChiKhachSan'
                id='diaChiKhachSan'
                status={
                  errors.diaChiKhachSan && touched.diaChiKhachSan
                    ? 'error'
                    : ''
                }
                value={values.diaChiKhachSan}
              />
              <ErrorMessage
                component='div'
                className='form-error'
                name='diaChiKhachSan'
              />
            </div>

            <div className='form-group'>
              <label className='form-label' htmlFor='giaPhongKhachSan'>
                Giá Phòng Tham Khảo:
              </label>
              <Field
                component={Input}
                onChange={handleChange}
                multiple={2}
                onBlur={handleBlur}
                size='large'
                name='giaPhongKhachSan'
                id='giaPhongKhachSan'
                status={
                  errors.giaPhongKhachSan && touched.giaPhongKhachSan
                    ? 'error'
                    : ''
                }
                value={values.giaPhongKhachSan}
              />
              <ErrorMessage
                component='div'
                className='form-error'
                name='giaPhongKhachSan'
              />
            </div>

            <div className='form-group'>
              <label className='form-label' htmlFor='phoneKhachSan'>
                Số Liên Hệ:
              </label>
              <Field
                component={Input}
                onChange={handleChange}
                onBlur={handleBlur}
                type='text'
                size='large'
                name='phoneKhachSan'
                id='phoneKhachSan'
                status={
                  errors.phoneKhachSan && touched.phoneKhachSan
                    ? 'error'
                    : ''
                }
                value={values.phoneKhachSan}
              />
              <ErrorMessage
                component='div'
                className='form-error'
                name='phoneKhachSan'
              />
            </div>

            <div className='d-flex mt-4 flex-align-center gap-3'>
              <Button
                to={`/admin/lichtrinhtour/list/${id}`}
                type='outline'>
                BACK
              </Button>
              <Button loading={loading}>
                {edit ? 'SAVE' : 'CREATE'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default FormComp
