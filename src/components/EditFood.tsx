import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../state';
import { Food } from '../types';
import foodService from '../services/foodService';
import imageUploadService from '../services/imageUploadService';
import dateUtils from '../utils/dateUtils';

// import { Field, Formik, Form } from 'formik';
import { PhotoIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

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
  const [error, setError] = useState('');
  const [uploadError, setUploadError] = useState('');

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
        setUploadError('File must be < 5 KB');
        return;
      } else {
        const formData = new FormData();
        formData.append('image', file);
        const uploadedImage = await imageUploadService.upload(formData);
        console.log(uploadedImage);
        if (uploadedImage) {
          setImageUrl(uploadedImage.imageUrl);
          setUploadError('');
        } else {
          setUploadError('Error uploading file');
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      navigate('/');
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setError("Only the food's creator can modify it.");
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
    <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center md:mt-20">
      <h2 className="text-3xl font-bold text-neutral-700">
        {action === 'edit' ? 'Edit' : 'Add'} Food
      </h2>
      <div className="mt-4 grid w-full gap-8 rounded-md bg-neutral-50 px-8 pt-8 pb-10 shadow-lg sm:grid-cols-5">
        {/* Image Upload */}
        <div className="max-w-[256px] sm:col-span-2">
          <div className="mt-1 flex aspect-square w-full items-center justify-center text-center">
            <div className="flex w-full flex-col">
              <div className="flex w-full items-center justify-center">
                <label
                  htmlFor="upload"
                  className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-neutral-200 bg-white hover:bg-neutral-50"
                >
                  {imageUrl ? (
                    <img
                      src={`${imageUrl}`}
                      className="h-full w-full rounded-lg bg-white object-cover object-center hover:opacity-80"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center border-dashed p-4">
                      <PhotoIcon className="h-16 w-16 stroke-neutral-400" />
                      <p className="text-sm text-neutral-500">
                        JPG, PNG, GIF, SVG
                      </p>
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
              </div>
              <p className="mt-1 text-sm text-neutral-500">
                Click to upload or replace
              </p>
              {uploadError && (
                <p className="mt-1 text-sm text-red-500">{uploadError}</p>
              )}
            </div>
          </div>
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
                  className="block w-full appearance-none rounded-md border-neutral-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:max-w-sm"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mt-4">
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
                  className="block w-full appearance-none rounded-md border-neutral-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:max-w-sm"
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
            <div className="mt-4">
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
                  rows={3}
                  value={description}
                  className="block w-full appearance-none rounded-md border-neutral-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:max-w-sm"
                  placeholder="Your notes on selecting and cooking with this ingredient"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="month"
                className="text-md block font-medium text-neutral-500"
              >
                Months in Season
              </label>
              <div className="mt-1 grid grid-cols-4 gap-y-2">
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
                          className="text-sm font-medium text-neutral-600"
                        >
                          {shortName}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {error && (
              <div className="mt-4">
                <p className="text-red-500">{error}</p>
              </div>
            )}
            <div className="mt-8">
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
    </div>
  );
}
