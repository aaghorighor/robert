import React, { useState, useEffect } from 'react';
import { Table, Spacer } from 'suftnet-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/client';
import { AiTwotoneEdit } from 'react-icons/ai';
import ConfirmationPopup from '../../../shared/popup';
import Notification from '../../../shared/notification';
import { FETCH_SLIDERS, REMOVE_SLIDER } from '../../../../queries/slider';
import {
  loadSliders,
  deleteSlider,
  editSlider,
} from '../../../../redux/slices/slider-slice';
import { renderStatusYesNo } from '../../../../utils/helper';

const SliderTableCard = () => {
  const dispatch = useDispatch();
  const { sliders } = useSelector((state) => state.sliderSlice);
  const [fetchMySliders] = useLazyQuery(FETCH_SLIDERS);
  const [deleteSliderMutation, { error = {} }] = useMutation(REMOVE_SLIDER);
  const [errorType, setErrorType] = useState('error');
  const [serverErrorMessage, setServerErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);

  useEffect(() => {
    const fetchAndLoadSliders = async () => {
       const {
          data: { getAllSliders },
        } = await fetchMySliders();
        dispatch(loadSliders(getAllSliders));
    };

    fetchAndLoadSliders();
  }, []);

  useEffect(() => {
    if (error && Object.keys(error).length) {
      setLoading(false);
      setServerErrorMessage(error.message);
      setNotificationStatus(true);
    }
  }, [error]);

  const onUpdate = (slider) => {
    slider = {
      ...slider,
      edit: true,
    };
    dispatch(editSlider(slider));
  };

  const onConfirm = async (id) => {
    setLoading(true);

    const {
      data: { removeSlider },
    } = await deleteSliderMutation({
      variables: {
        sliderId :id,
      },
    });

    if (removeSlider) {
      setLoading(false);

      dispatch(deleteSlider(id));

      setErrorType('success');
      setServerErrorMessage('Slider was deleted successfully.');
      setNotificationStatus(true);
    }
  };

  const onCancel = () => {};

  const onReset = () => {
    setNotificationStatus(false);
    setLoading(false);
    setErrorType('error');
    setServerErrorMessage('');
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sort: true,
      align: 'left',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      sort: true,
      align: 'left',
    },  
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sort: true,
      render: (_, row) => (
        <button
          className={`badge badge-pill bc-2 ${renderStatusYesNo(
            row.status,
          )}`}
        >
          {row.status ? 'YES' : 'NO'}
        </button>
      ),
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      render: (_, row) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <AiTwotoneEdit
            size={25}
            className="pointer"
            onClick={() => onUpdate(row)}
          />
          <Spacer horizontal={10} />
          <ConfirmationPopup
            title={'Delete confirmation'}
            message="Are you sure you want to delete this Slider?"
            onConfirm={(id) => onConfirm(id)}
            onCancel={() => onCancel()}
            id={row._id}
            position={'top'}
            okText={'Ok'}
            cancelText={'No'}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className={`${loading ? 'overlay__block' : null}`}>
        <Table data={sliders} columns={columns} pageSize={5} />
      </div>
      <Notification
        status={notificationStatus}
        type={errorType}
        message={serverErrorMessage}
        duration={4000}
        onReset={() => onReset()}
      />
      {loading && (
        <div className="overlay">
          <div className="overlay-content"></div>
        </div>
      )}
    </>
  );
};

export default SliderTableCard;
