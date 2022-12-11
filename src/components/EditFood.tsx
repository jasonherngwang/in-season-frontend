import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Food } from '../types';

import { Field, Formik, Form } from 'formik';
import { PhotoIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

export default function EditFood({ food }: { food: Food }) {
  food = {
    name: 'a food',
    category: 'vegetable',
    description: 'vegetable',
    months: [0, 1, 5, 9],
    imageUrl: 'asdfasd',
  };
  const [name, setName] = useState(food.name);
  const [category, setCategory] = useState(food.category);
  const [description, setDescription] = useState(food.description);
  const [months, setMonths] = useState(food.months);
  const [imageUrl, setImageUrl] = useState(food.imageUrl);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  return (
    <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center md:mt-20">
      <h2 className="text-3xl font-bold text-neutral-700">Edit Food</h2>
      <div className="mt-4 grid w-full gap-8 rounded-md bg-neutral-50 px-8 pt-8 pb-10 shadow-lg sm:grid-cols-5">
        {/* Image Upload */}
        <div className="max-w-[256px] sm:col-span-2">
          <h3 className="text-md font-medium text-neutral-500">Upload image</h3>
          <div className="mt-1 flex aspect-square w-full items-center justify-center rounded-md border-2 bg-white object-cover object-center text-center">
            <div className="flex flex-col items-center">
              <PhotoIcon className="h-16 w-16 stroke-neutral-400" />
              <p className="text-sm text-neutral-500">JPG, PNG, GIF, or WEBP</p>
              <p className="text-sm text-neutral-500">Max size 5 MB</p>
            </div>
          </div>
          <div className="mt-4 flex w-full items-center justify-center">
            <button
              className="font-base flex justify-center rounded-md border-transparent bg-green-600 py-2 px-3 text-sm tracking-wider text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 active:bg-green-700"
              type="submit"
            >
              <ArrowUpTrayIcon className="h-4 w-4" />
              <span className="ml-2">Select file</span>
            </button>
          </div>
        </div>
        {/* Form */}
        <div className="sm:col-span-3">
          <form onSubmit={() => {}}>
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
                  onChange={(e) => {}}
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
                  onChange={(e) => {}}
                >
                  <option>Vegetable</option>
                  <option>Fruit</option>
                  <option>Other</option>
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
                  onChange={(e) => {}}
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
                <div className="flex items-center">
                  <input
                    id="jan"
                    name="jan"
                    type="checkbox"
                    checked={months.includes(0)}
                    className="h-4 w-4 rounded border-neutral-300 text-green-600 focus:ring-green-600"
                    onChange={() => {}}
                  />
                  <div className="ml-2">
                    <label
                      htmlFor="jan"
                      className="text-sm font-medium text-neutral-600"
                    >
                      Jan
                    </label>
                  </div>
                </div>
                {/* <div className="flex items-center">
                  <input
                    id="feb"
                    name="feb"
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-300 text-green-600 focus:ring-green-600"
                    onChange={() => {}}
                  />
                  <div className="ml-2">
                    <label
                      htmlFor="feb"
                      className="text-sm font-medium text-neutral-600"
                    >
                      Feb
                    </label>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    id="mar"
                    name="mar"
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-300 text-green-600 focus:ring-green-600"
                    onChange={() => {}}
                  />
                  <div className="ml-2">
                    <label
                      htmlFor="mar"
                      className="text-sm font-medium text-neutral-600"
                    >
                      Mar
                    </label>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    id="apr"
                    name="apr"
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-300 text-green-600 focus:ring-green-600"
                    onChange={() => {}}
                  />
                  <div className="ml-2">
                    <label
                      htmlFor="apr"
                      className="text-sm font-medium text-neutral-600"
                    >
                      Apr
                    </label>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    id="may"
                    name="may"
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-300 text-green-600 focus:ring-green-600"
                    onChange={() => {}}
                  />
                  <div className="ml-2">
                    <label
                      htmlFor="may"
                      className="text-sm font-medium text-neutral-600"
                    >
                      May
                    </label>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    id="jun"
                    name="jun"
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-300 text-green-600 focus:ring-green-600"
                    onChange={() => {}}
                  />
                  <div className="ml-2">
                    <label
                      htmlFor="jun"
                      className="text-sm font-medium text-neutral-600"
                    >
                      Jun
                    </label>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    id="jul"
                    name="jul"
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-300 text-green-600 focus:ring-green-600"
                    onChange={() => {}}
                  />
                  <div className="ml-2">
                    <label
                      htmlFor="jul"
                      className="text-sm font-medium text-neutral-600"
                    >
                      Jul
                    </label>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    id="aug"
                    name="aug"
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-300 text-green-600 focus:ring-green-600"
                    onChange={() => {}}
                  />
                  <div className="ml-2">
                    <label
                      htmlFor="aug"
                      className="text-sm font-medium text-neutral-600"
                    >
                      Aug
                    </label>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    id="sep"
                    name="sep"
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-300 text-green-600 focus:ring-green-600"
                    onChange={() => {}}
                  />
                  <div className="ml-2">
                    <label
                      htmlFor="sep"
                      className="text-sm font-medium text-neutral-600"
                    >
                      Sep
                    </label>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    id="oct"
                    name="oct"
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-300 text-green-600 focus:ring-green-600"
                    onChange={() => {}}
                  />
                  <div className="ml-2">
                    <label
                      htmlFor="oct"
                      className="text-sm font-medium text-neutral-600"
                    >
                      Oct
                    </label>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    id="nov"
                    name="nov"
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-300 text-green-600 focus:ring-green-600"
                    onChange={() => {}}
                  />
                  <div className="ml-2">
                    <label
                      htmlFor="nov"
                      className="text-sm font-medium text-neutral-600"
                    >
                      Nov
                    </label>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    id="dec"
                    name="dec"
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-300 text-green-600 focus:ring-green-600"
                    onChange={() => {}}
                  />
                  <div className="ml-2">
                    <label
                      htmlFor="dec"
                      className="text-sm font-medium text-neutral-600"
                    >
                      Dec
                    </label>
                  </div>
                </div> */}
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
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
