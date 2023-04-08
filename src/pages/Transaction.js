import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'redux/store';

import useAuth from 'hooks/useAuth';

import BarChart from 'components/BarChart';
import DoughnutChart from 'components/DoughnutChart';
import Footer from '../components/Footer';
import Navbar from 'components/Navbar';
import Header from 'components/Header';

import { classNames } from 'utils/helper';

import {
  getTotalSalesChart,
  getTotalSalesByServiceChart,
} from 'redux/slices/transaction';
import { getAllBranch } from 'redux/slices/branch';
import { getStaffSalesStatictics } from 'redux/slices/staff';

const options = [
  {
    id: '1',
    name: 'daily',
  },
  {
    id: '2',
    name: 'week',
  },
  {
    id: '3',
    name: 'month',
  },
  {
    id: '4',
    name: 'annual',
  },
];

const Transaction = () => {
  const [selectedType, setSelectedType] = useState(options[0]);
  // const [startDate, setStartDate] = useState([
  //   dayjs().subtract(1, 'day').toDate(),
  //   dayjs().toDate(),
  // ]);
  const [startDate, setStartDate] = useState(
    dayjs().subtract(7, 'day').toDate()
  );
  const [endDate, setEndDate] = useState(dayjs().toDate());
  const [showModal, setShowModal] = useState(false);
  const [showStartDateModal, setShowStartDateModal] = useState(false);
  const [showEndDateModal, setShowEndDateModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState();
  const [isSelectedBranchDisabled, setIsSelectedBranchDisabled] =
    useState(false);

  const { transaction, services } = useSelector((state) => state.transaction);
  const { branch } = useSelector((state) => state.branch);
  const { staff_stats } = useSelector((state) => state.staff);

  const { user, staff: staff_info } = useAuth();

  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getTotalSalesChart(selectedType.name));
    await dispatch(
      getTotalSalesByServiceChart({
        startDate: startDate,
        endDate: endDate,
      })
    );
  }, []);

  useEffect(async () => {
    console.log('user', user);
    if (user && user?.role !== 'admin') {
      // disabled branch selection (allow only on the respective branch)
      setIsSelectedBranchDisabled(true);
    } else {
      await dispatch(getAllBranch({ limit: 50 }));
    }

    await dispatch(
      getStaffSalesStatictics({
        branch: user?.role !== 'admin' ? staff_info?.branch_id?.id : '',
      })
    );
  }, [user]);

  useEffect(async () => {
    if (staff_info) {
      console.log('staff info', staff_info);
      setSelectedBranch(staff_info?.branch_id);
    }
  }, [staff_info]);

  useEffect(async () => {
    if (selectedType?.name)
      await dispatch(
        getTotalSalesChart({
          type: selectedType.name,
          branch: selectedBranch?.id,
        })
      );
  }, [selectedType]);

  useEffect(async () => {
    if (startDate && endDate) {
      await dispatch(
        getTotalSalesByServiceChart({
          startDate: startDate,
          endDate: endDate,
          branch: selectedBranch?.id,
        })
      );
      await dispatch(
        getStaffSalesStatictics({
          branch: selectedBranch?.id,
          startDate: startDate,
          endDate: endDate,
        })
      );
    }
  }, [endDate, startDate]);

  useEffect(async () => {
    await dispatch(
      getTotalSalesChart({
        type: selectedType.name,
        branch: selectedBranch?.id,
      })
    );
    await dispatch(
      getTotalSalesByServiceChart({
        startDate: startDate,
        endDate: endDate,
        branch: selectedBranch?.id,
      })
    );
    await dispatch(
      getStaffSalesStatictics({
        branch: selectedBranch?.id,
        startDate: startDate,
        endDate: endDate,
      })
    );
  }, [selectedBranch]);

  const generateTotalSalesChart = async () => {
    console.log('startDate', startDate);
    console.log('endDate', endDate);

    await dispatch(
      getTotalSalesByServiceChart({
        startDate: startDate,
        endDate: endDate,
        branch: selectedBranch?.id,
      })
    );

    await dispatch(
      getStaffSalesStatictics({
        branch: selectedBranch?.id,
        startDate: startDate,
        endDate: endDate,
      })
    );
  };

  return (
    <div>
      <main>
        <Navbar current='Transactions' />
        <Header title='Transactions' />

        <div className='mx-auto max-w-7xl overflow-auto py-6 sm:px-6 lg:px-8'>
          {showStartDateModal ? (
            <>
              <div className='flex justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                <div className='relative w-fit mx-6 my-6 mx-auto max-w-sm'>
                  <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                    <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                      <h3 className='text-3xl font-semibold'>
                        Select Start Date
                      </h3>
                      <button
                        className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                        onClick={() => setShowStartDateModal(false)}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-6 h-6'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M6 18L18 6M6 6l12 12'
                          />
                        </svg>
                      </button>
                    </div>

                    <div className='flex justify-center p-2'>
                      <Calendar
                        onChange={(value) => {
                          setStartDate(value);
                          setShowStartDateModal(false);
                        }}
                        value={startDate}
                        maxDate={new Date()}
                      />
                    </div>

                    <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
                      <button
                        className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        type='button'
                        onClick={() => setShowStartDateModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='opacity-50 fixed inset-0 z-40 bg-black'></div>
            </>
          ) : null}

          {showEndDateModal ? (
            <>
              <div className='flex justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                <div className='relative w-fit mx-6 my-6 mx-auto max-w-sm'>
                  <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                    <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                      <h3 className='text-3xl font-semibold'>
                        Select End Date
                      </h3>
                      <button
                        className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                        onClick={() => setShowEndDateModal(false)}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-6 h-6'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M6 18L18 6M6 6l12 12'
                          />
                        </svg>
                      </button>
                    </div>

                    <div className='flex justify-center p-2'>
                      <Calendar
                        onChange={(value) => {
                          setEndDate(value);
                          setShowEndDateModal(false);
                        }}
                        value={endDate}
                        maxDate={new Date()}
                      />
                    </div>

                    <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
                      <button
                        className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        type='button'
                        onClick={() => setShowEndDateModal(false)}
                      >
                        Cancel
                      </button>
                      {/* <button
                        className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        type='button'
                        onClick={() => setShowEndDateModal(false)}
                      >
                        Select
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className='opacity-50 fixed inset-0 z-40 bg-black'></div>
            </>
          ) : null}

          <div className='px-4 sm:px-0 overflow-auto'>
            <div className='sm:mt-0 overflow-auto'>
              <div className='lg:block md:max-w-3/6 md:items-center md:justify-center'>
                <div className='max-w-sm col-span-6 sm:col-span-3'>
                  <Listbox
                    value={selectedBranch}
                    onChange={setSelectedBranch}
                    disabled={isSelectedBranchDisabled}
                  >
                    {({ open }) => (
                      <>
                        <Listbox.Label className='block text-sm font-medium text-gray-700'>
                          Branch
                        </Listbox.Label>
                        <div className='relative mt-1'>
                          <Listbox.Button className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'>
                            <span className='flex items-center'>
                              <span
                                className='ml-3 block truncate text-gray-700'
                                style={
                                  selectedBranch?.name
                                    ? { color: 'black' }
                                    : isSelectedBranchDisabled
                                    ? { color: 'black' }
                                    : { color: 'black' }
                                }
                              >
                                {selectedBranch?.name
                                  ? selectedBranch?.name
                                  : isSelectedBranchDisabled
                                  ? selectedBranch?.name || 'Branch Name'
                                  : 'All Branch'}
                              </span>
                            </span>
                            <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                              <ChevronUpDownIcon
                                className='h-5 w-5 text-gray-400'
                                aria-hidden='true'
                              />
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                          >
                            <Listbox.Options className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                              <Listbox.Option
                                key={'all'}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? 'text-white bg-indigo-600'
                                      : 'text-gray-900',
                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                  )
                                }
                                value={{ name: 'All Branch', id: 'all' }}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <div className='flex items-center'>
                                      <span
                                        className={classNames(
                                          selected
                                            ? 'font-semibold'
                                            : 'font-normal',
                                          'ml-3 block truncate'
                                        )}
                                      >
                                        All Branch
                                      </span>
                                    </div>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? 'text-white'
                                            : 'text-indigo-600',
                                          'absolute inset-y-0 right-0 flex items-center pr-4'
                                        )}
                                      >
                                        <CheckIcon
                                          className='h-5 w-5'
                                          aria-hidden='true'
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                              {branch.docs &&
                                branch.docs.map((item) => (
                                  <Listbox.Option
                                    key={item.id}
                                    className={({ active }) =>
                                      classNames(
                                        active
                                          ? 'text-white bg-indigo-600'
                                          : 'text-gray-900',
                                        'relative cursor-default select-none py-2 pl-3 pr-9'
                                      )
                                    }
                                    value={item}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <div className='flex items-center'>
                                          <span
                                            className={classNames(
                                              selected
                                                ? 'font-semibold'
                                                : 'font-normal',
                                              'ml-3 block truncate'
                                            )}
                                          >
                                            {item.name}
                                          </span>
                                        </div>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active
                                                ? 'text-white'
                                                : 'text-indigo-600',
                                              'absolute inset-y-0 right-0 flex items-center pr-4'
                                            )}
                                          >
                                            <CheckIcon
                                              className='h-5 w-5'
                                              aria-hidden='true'
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                </div>

                <div className='max-w-4xl my-5 border border-slate-200 py-2 p-1'>
                  <div>
                    <div className='flex flex-row items-center col-span-6 sm:col-span-3 mb-3'>
                      <Listbox value={selectedType} onChange={setSelectedType}>
                        {({ open }) => (
                          <>
                            <Listbox.Label className='text-sm font-medium text-gray-700 mr-2'>
                              Sort By
                            </Listbox.Label>
                            <div className='relative mt-1'>
                              <Listbox.Button className='relative w-1/6 min-w-fit cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'>
                                <span className='flex items-center'>
                                  <span
                                    className='ml-3 capitalize block truncate text-gray-700'
                                    style={
                                      !selectedType?.name
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }
                                  >
                                    {selectedType?.name
                                      ? selectedType.name
                                      : 'Select One'}
                                  </span>
                                </span>
                                <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                                  <ChevronUpDownIcon
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                  />
                                </span>
                              </Listbox.Button>

                              <Transition
                                show={open}
                                as={Fragment}
                                leave='transition ease-in duration-100'
                                leaveFrom='opacity-100'
                                leaveTo='opacity-0'
                              >
                                <Listbox.Options className='absolute z-10 mt-1 max-h-56 w-1/6 min-w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                  {options &&
                                    options.map((item) => (
                                      <Listbox.Option
                                        key={item.id}
                                        className={({ active }) =>
                                          classNames(
                                            active
                                              ? 'text-white bg-indigo-600'
                                              : 'text-gray-900',
                                            'capitalize relative cursor-default select-none py-2 pl-3 pr-9'
                                          )
                                        }
                                        value={item}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <div className='flex items-center'>
                                              <span
                                                className={classNames(
                                                  selected
                                                    ? 'font-semibold'
                                                    : 'font-normal',
                                                  'capitalize ml-3 block truncate'
                                                )}
                                              >
                                                {item.name}
                                              </span>
                                            </div>

                                            {selected ? (
                                              <span
                                                className={classNames(
                                                  active
                                                    ? 'text-white'
                                                    : 'text-indigo-600',
                                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                                )}
                                              >
                                                <CheckIcon
                                                  className='h-5 w-5'
                                                  aria-hidden='true'
                                                />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Listbox>
                    </div>
                  </div>

                  <div className='max-w-xl'>
                    <BarChart
                      labels={transaction?.label}
                      dataList={transaction?.data}
                    />
                  </div>
                </div>

                <div className='max-w-4xl border border-slate-200 py-2 px-2 mb-5'>
                  <div className='max-w-sm mt-3 col-span-6 sm:col-span-4'>
                    <label
                      htmlFor='price'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Start Date
                    </label>
                    <input
                      type='text'
                      name='customer_phone_no'
                      id='customer_phone_no'
                      className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm text-gray-700'
                      placeholder='Enter Customer Phone Number'
                      // onChange={handleEventChange}
                      value={
                        startDate
                          ? dayjs(startDate).format('DD MMM YYYY')
                          : 'Select Date'
                      }
                      onClick={() => setShowStartDateModal(true)}
                    />
                  </div>

                  <div className='max-w-sm mt-3 col-span-6 sm:col-span-4'>
                    <label
                      htmlFor='price'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      End Date
                    </label>
                    <input
                      type='text'
                      name='customer_phone_no'
                      id='customer_phone_no'
                      className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm text-gray-700'
                      placeholder='Enter Customer Phone Number'
                      // onChange={handleEventChange}
                      value={
                        endDate
                          ? dayjs(endDate).format('DD MMM YYYY')
                          : 'Select Date'
                      }
                      onClick={() => setShowEndDateModal(true)}
                    />
                  </div>

                  <div className='flex justify-end sm:justify-start'>
                    <button
                      className='my-3 bg-blue-500 px-4 py-2 rounded-md text-md text-white'
                      onClick={() => generateTotalSalesChart(true)}
                    >
                      Filter
                    </button>
                  </div>

                  {/* <p className="text-center mt-3">{"No sales recorded on " + dayjs(startDate).format('DD MMM YYYY')} </p> */}
                  <div className='my-4 max-w-sm'>
                    <DoughnutChart
                      labels={services?.label}
                      dataList={services?.data}
                    />
                  </div>
                </div>

                <div className='max-w-4xl border border-slate-200 py-2 px-2 mb-5'>
                  <h5 className='font-medium text-base my-2 ml-2'>
                    Staff Sales Statistics
                  </h5>

                  <div className='flex flex-col'>
                    <div className='py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
                      <div className='inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg'>
                        <table className='min-w-full'>
                          <thead>
                            <tr>
                              <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                                Name
                              </th>
                              <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                                Total Sale
                              </th>
                            </tr>
                          </thead>
                          <tbody className='bg-white'>
                            {staff_stats ? (
                              staff_stats.map((item, index) => (
                                <tr key={item.id}>
                                  <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                                    <div className='flex items-center'>
                                      <div className='text-sm font-medium leading-5 text-gray-900'>
                                        {item.staff_name}
                                      </div>
                                    </div>
                                  </td>

                                  <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                                    <div className='flex items-center'>
                                      <div className='text-sm font-medium leading-5 text-gray-900'>
                                        {item?.total_sale || 0}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td className='text-center py-2'>
                                  No staff found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Transaction;
