import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateValue } from '../state';
import { Food } from '../types';
import foodService from '../services/foodService';
import imageUploadService from '../services/imageUploadService';
import dateUtils from '../utils/dateUtils';
import { tokenExpired } from '../utils/tokenManagement';

import { PhotoIcon } from '@heroicons/react/24/outline';
import Spinner from '../icons/Spinner';

// Reuse same form for adding and editing, via `action` prop
export default function EditFood({
  foodId,
  action,
}: {
  foodId: any;
  action: string;
}) {
  const [{ foods }, dispatch] = useStateValue();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('vegetable');
  const [description, setDescription] = useState('');
  const [months, setMonths] = useState(dateUtils.defaultSeasonality);
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [uploadError, setUploadError] = useState('');
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const toggleMonth = (monthNum: string, checked: boolean) => {
    setMonths({
      ...months,
      [monthNum]: checked,
    });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('File must be < 5 MB');
        return;
      }

      const formData = new FormData();
      formData.append('image', file);

      try {
        setUploading(true); // Display spinner icon
        const uploadedImage = await imageUploadService.upload(formData);

        if (uploadedImage) {
          setImageUrl(uploadedImage.imageUrl); // Display new image if upload succeeds
          setUploadError('');
        } else {
          setUploadError('Error uploading file');
        }
        setUploading(false); // Clear spinner
      } catch (error) {
        setUploading(false);
        if (error instanceof Error) {
          setUploadError(error.message);
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (tokenExpired()) {
      setMessage({
        text: 'Please login again.',
        type: 'error',
      });
    }

    const data: Food = {
      id: foodId,
      name,
      category,
      description,
      months,
      imageUrl,
    };

    try {
      action === 'edit'
        ? await foodService.update(data)
        : await foodService.create(data);
      setMessage({
        text: 'Details successfully updated.',
        type: 'success',
      });
    } catch (error) {
      if (error instanceof Error) {
        setMessage({
          text: "Only the food's creator can modify it.",
          type: 'error',
        });
      }
    }
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (window.confirm('Are you sure you want to delete this food?')) {
      try {
        await foodService.deleteFood(foodId);
        navigate('/');
      } catch (error) {
        if (error instanceof Error && error.message.includes('401')) {
          setMessage({
            text: "Only the food's creator can delete it.",
            type: 'error',
          });
        }
      }
    }
  };

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const food = foods.find((f) => f.id === foodId);
        if (food) {
          setName(food.name);
          setCategory(food.category);
          setDescription(food.description || '');
          setMonths({ ...months, ...food.months });
          setImageUrl(food.imageUrl || '');
        }
      } catch (error) {
        console.error(error);
      }
    };
    void fetchFood();
  }, [foods, dispatch]);

  return (
    <div className="mx-auto mt-6 flex max-w-3xl flex-col items-center md:mt-20">
      <h2 className="text-2xl font-bold text-neutral-700 md:text-3xl">
        {action === 'edit' ? 'Edit' : 'Add'} Food
      </h2>
      <div className="mt-4 grid w-full gap-8 rounded-md bg-neutral-50 px-8 pt-8 pb-10 shadow-lg sm:grid-cols-5">
        {/* Image Upload */}
        <div className="mx-auto flex w-full max-w-[200px] flex-col items-center text-center sm:col-span-2">
          {/* Image */}
          <label
            htmlFor="upload"
            className="aspect-square w-full cursor-pointer"
          >
            {uploading ? (
              <div className="flex aspect-square h-full w-full items-center justify-center rounded-lg bg-white">
                <Spinner />
              </div>
            ) : imageUrl ? (
              <img
                src={imageUrl}
                className="h-full w-full rounded-lg bg-white object-contain object-center hover:opacity-80"
              />
            ) : (
              <div className="flex aspect-square h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-200 bg-white p-4 hover:border-neutral-300 hover:bg-neutral-50">
                <PhotoIcon className="h-16 w-16 stroke-neutral-400" />
                <p className="text-sm text-neutral-500">JPG, PNG, GIF, SVG</p>
                <p className="text-sm text-neutral-500">Max size 5 MB</p>
              </div>
            )}
            <input
              id="upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
          {/* Caption */}
          <p className="mt-1 text-sm text-neutral-500">Click image to upload</p>
          {uploadError && (
            <p className="mt-1 text-sm text-red-500">{uploadError}</p>
          )}
        </div>
        {/* Form */}
        <div className="sm:col-span-3">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="text-md block font-medium text-neutral-500"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  required
                  className="block w-full appearance-none rounded-md border-neutral-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:max-w-md"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mt-6">
              <label
                htmlFor="category"
                className="text-md block font-medium text-neutral-500"
              >
                Category
              </label>
              <div className="mt-1">
                <select
                  name="category"
                  id="category"
                  value={category}
                  required
                  className="block w-full appearance-none rounded-md border-neutral-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:max-w-md"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value="vegetable">Vegetable</option>
                  <option value="fruit">Fruit</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <label
                htmlFor="description"
                className="text-md block font-medium text-neutral-500"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  value={description}
                  className="block w-full appearance-none rounded-md border-neutral-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:max-w-md"
                  placeholder="Notes on selecting and cooking with this ingredient"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="my-6">
              <label
                htmlFor="month"
                className="text-md block font-medium text-neutral-500"
              >
                Months in Season
              </label>
              <div className="mt-1 grid grid-cols-4 gap-y-2 md:gap-y-3">
                {Object.keys(dateUtils.defaultSeasonality).map((m) => {
                  const { shortName } = dateUtils.monthNumToAbbr(
                    parseInt(m, 10)
                  );

                  return (
                    <div key={m} className="flex items-center">
                      <input
                        id={shortName}
                        name={shortName}
                        type="checkbox"
                        checked={months[m]}
                        className="h-4 w-4 rounded border-neutral-300 text-green-600 focus:ring-green-600"
                        onChange={() => {
                          toggleMonth(m, !months[m]);
                        }}
                      />
                      <div className="ml-2">
                        <label
                          htmlFor={shortName}
                          className="text-sm font-medium text-neutral-600 md:text-base"
                        >
                          {shortName}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {message.text && (
              <div className="mt-1">
                <p
                  className={
                    message.type === 'error' ? 'text-red-500' : 'text-green-600'
                  }
                >
                  {message.text}
                </p>
              </div>
            )}
            <div className="mt-8 flex w-full gap-x-3 sm:gap-x-6">
              <Link
                to="/"
                className="flex w-full justify-center rounded-md border-transparent bg-neutral-200 py-3 px-4 font-medium tracking-wider text-neutral-900 hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2 active:bg-neutral-400"
              >
                Go Back
              </Link>
              <button
                className="flex w-full justify-center rounded-md border-transparent bg-green-600 py-3 px-4 font-medium tracking-wider text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 active:bg-green-700"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      {action === 'edit' && (
        <div className="mt-6">
          <button
            className="text-sm text-neutral-500 hover:underline"
            type="button"
            onClick={handleDelete}
          >
            Delete Food
          </button>
        </div>
      )}
    </div>
  );
}
