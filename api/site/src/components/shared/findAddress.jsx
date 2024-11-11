import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import {
  Form,
  FormGroup,
  Button,
  Spacer,
  SwitchButton,
  Select,
} from 'suftnet-ui-kit';
import { searchAddress, formatAddressParts } from '../../utils/helper';

const FindAddress = ({ handleSelectedAddress }) => {
  const [fields, setFields] = useState({
    status: false,
    query: '',
    place_id: 0,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [findAddressStatus, setFindAddressStatus] = useState(false);

  const handleFind = async (e) => {
    e.preventDefault();
    const results = await searchAddress(fields.query);
    if (results) {
      setSearchResults(results);
    }
  };

  const handleSelectAddress = async (place_id) => {
    const results = searchResults.find(
      (address) => address.place_id === parseFloat(place_id),
    );
    handleSelectedAddress(results);
    setFindAddressStatus(false);
    setFields({ ...fields, status: false });
  };

  return (
    <>
      <Form horizontal>
        <FormGroup>
          <div className="flex-row align-items-center justify-content-start mt-2">
            <SwitchButton
              isChecked={fields.status}
              onToggle={(e) => {
                setFindAddressStatus(e);
                setFields({ ...fields, status: true });
              }}
            />
            <label className="px-1 text-mute">Find Address</label>
          </div>
        </FormGroup>
      </Form>
      {findAddressStatus && (
        <>
          <Form horizontal>
            <div className="flex-row align-items-center justify-content-start mt-2">
              <input
                id="find-address"
                name="find-address"
                placeholder="Find by street address or post code"
                value={fields.query}
                maxLength={50}
                onChange={(e) =>
                  setFields({ ...fields, query: e.target.value })
                }
                className="input-group form-control py-2 rounded-circle-30"
              />
              <Spacer horizontal={2} />
              <Button
                className="rounded-circle-30 secondary-solid-btn-0"
                onClick={(e) => handleFind(e)}
              >
                <FaSearch size={18}></FaSearch>
              </Button>
            </div>
          </Form>
          {(searchResults.length !== 0) && (
            <Form horizontal>
              <Select
                id={'select-address'}
                placeholder={'Please select address'}
                options={searchResults.map((result) => {
                  return {
                    value: result.place_id,
                    description: formatAddressParts(result.address),
                  };
                })}
                value={fields.place_id}
                className="rounded-circle-30 input-group form-control custom-dropdown flex-wrap"
                onChange={(e) => {
                  setFields({ ...fields, place_id: e.target.value });
                  handleSelectAddress(e.target.value);
                }}
              />
            </Form>
          )}
        </>
      )}
    </>
  );
};

export default FindAddress;
