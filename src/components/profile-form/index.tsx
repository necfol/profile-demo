import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRequest } from 'ahooks';
import { useParams, useNavigate } from 'react-router-dom';
import { EMAIL_REGEXP, PHONE_REGEXP } from '../../utils/helper';
import { createProfileService, updateProfileService, getProfileDetailService, IProfile } from '../../libs/profile';

function renderBtnText(isEdit: boolean) {
  return isEdit ? 'Update' : 'Save';
}

function ProfileForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    mode: 'onTouched',
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const { runAsync } = useRequest<{ data: IProfile }, any>(() => getProfileDetailService(id as string), {
    manual: true,
  });
  const isEdit = !!id;
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await runAsync();
      reset({
        username: data.username,
        email: data.email,
        phone: data.phone,
      });
    };
    loadProfile();
  }, [runAsync, reset]);

  const onSubmit = async (values: any) => {
    const url = isEdit ? updateProfileService : createProfileService;
    const params = isEdit
      ? {
          id,
          ...values,
        }
      : values;
    try {
      const res = await url(params);
      if (res && res.data && res.data.id) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate(-1);
        }, 500);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage(error?.response?.data);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="my-10">
        <div className="mb-5">
          <input
            type="text"
            placeholder="Username"
            autoComplete="false"
            className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 ${
              errors.name
                ? 'border-red-600 focus:border-red-600 ring-red-100 dark:ring-0'
                : 'border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0'
            }`}
            {...register('username', {
              required: 'Username is required',
              maxLength: 80,
            })}
          />
          {errors.username && (
            <div className="mt-1 text-red-600 text-left">
              <small>{errors.username.message as string}</small>
            </div>
          )}
        </div>

        <div className="mb-5">
          <input
            type="email"
            placeholder="Email Address"
            autoComplete="false"
            className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 ${
              errors.email
                ? 'border-red-600 focus:border-red-600 ring-red-100 dark:ring-0'
                : 'border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0'
            }`}
            {...register('email', {
              required: 'Enter your email',
              pattern: {
                value: EMAIL_REGEXP,
                message: 'Please enter a valid email',
              },
            })}
          />
          {errors.email && (
            <div className="mt-1 text-red-600 text-left">
              <small>{errors.email.message as string}</small>
            </div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="phone"
            placeholder="Phone"
            autoComplete="false"
            className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 ${
              errors.phone
                ? 'border-red-600 focus:border-red-600 ring-red-100 dark:ring-0'
                : 'border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0'
            }`}
            {...register('phone', {
              required: 'Enter your phone',
              pattern: {
                value: PHONE_REGEXP,
                message: 'Please enter a valid phone',
              },
            })}
          />
          {errors.phone && (
            <div className="mt-1 text-red-600 text-left">
              <small>{errors.phone.message as string}</small>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 dark:bg-white dark:text-black ">
          {isSubmitting ? (
            <svg
              className="w-5 h-5 mx-auto text-white dark:text-black animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            renderBtnText(isEdit)
          )}
        </button>
      </form>

      {isSubmitSuccessful && isSuccess && (
        <div className="mt-3 text-sm text-center text-green-500">{message || 'Success. Operate successfully'}</div>
      )}
      {isSubmitSuccessful && !isSuccess && (
        <div className="mt-3 text-sm text-center text-red-500">
          {message || 'Something went wrong. Please try later.'}
        </div>
      )}
    </div>
  );
}

export default ProfileForm;
