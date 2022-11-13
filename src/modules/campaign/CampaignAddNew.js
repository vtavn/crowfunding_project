import FormGroup from "components/common/FormGroup";
import FormRow from "components/common/FormRow";
import { Dropdown } from "components/dropdown";
import { Label } from "components/label";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import { Button } from "components/button";
import { Input, Textarea } from "components/input";
import useOnChange from "hooks/useOnChange";
import { toast } from "react-toastify";
import DatePicker from "react-date-picker";
import { apiUrl, imgbbAPI } from "config/config";
import ImageUpload from "components/image/ImageUpload";

Quill.register("modules/imageUploader", ImageUploader);

const CampaignAddNew = () => {
  const { handleSubmit, control, setValue, reset, watch } = useForm();
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const resetValue = () => {
    setStartDate("");
    setEndDate("");
    reset();
  };
  const handleAddNewCampaign = async (values) => {
    try {
      const response = await axios.post(`${apiUrl}/campaigns`, {
        ...values,
        startDate,
        endDate,
      });
      console.log(response);
      toast.success("Create new campaign successfully.");
      resetValue();
    } catch (error) {
      toast.error("Can not create new campaign");
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        // imgbbAPI
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: imgbbAPI,
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );

  const getDropdownLabel = (name) => {
    const value = watch(name);
    return value;
  };

  const handleSelectDropdown = (name, value) => {
    setValue(name, value);
  };

  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useOnChange(1000);

  useEffect(() => {
    async function fetchCountries() {
      if (!filterCountry) return;
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${filterCountry}`
        );
        setCountries(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchCountries();
  }, [filterCountry]);

  return (
    <div className="bg-white rounded-xl py-10 px-[66px]">
      <div className="text-center">
        <h1 className="py-4 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
          Start a Campaign 🚀
        </h1>
        <form onSubmit={handleSubmit(handleAddNewCampaign)}>
          <FormRow>
            <FormGroup>
              <Label>Campaign Title *</Label>
              <Input
                control={control}
                name="title"
                placeholder="Campaign Title"
              ></Input>
            </FormGroup>

            <FormGroup>
              <Label>Select a category *</Label>
              <Dropdown>
                <Dropdown.Select
                  placeholder={
                    getDropdownLabel("category") || "Select a category"
                  }
                ></Dropdown.Select>
                <Dropdown.List>
                  <Dropdown.Option
                    onClick={() => handleSelectDropdown("category", "asss")}
                  >
                    Aaa
                  </Dropdown.Option>
                </Dropdown.List>
              </Dropdown>
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label>Short Description</Label>
            <Textarea
              name="short-description"
              placeholder="Short Description"
              control={control}
            ></Textarea>
          </FormGroup>

          <FormGroup>
            <Label>Story *</Label>
            <ReactQuill
              placeholder="Write your story......"
              modules={modules}
              theme="snow"
              value={content}
              onChange={setContent}
            />
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label>Feature Image</Label>
              <ImageUpload
                onChange={setValue}
                name="featured_image"
              ></ImageUpload>
            </FormGroup>
            <FormGroup></FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label>Goal *</Label>
              <Input
                control={control}
                name="goal"
                placeholder="$0.00 USD"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Raised Amount *</Label>
              <Input
                control={control}
                name="amount"
                placeholder="$0.00 USD"
              ></Input>
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label>Amount Prefilled</Label>
              <Input
                control={control}
                name="prefilled"
                placeholder="Amount Prefilled"
              ></Input>
              <p className="text-sm text-left text-text3">
                It will help fill amount box by click, place each amount by
                comma, ex: 10,20,30,40
              </p>
            </FormGroup>
            <FormGroup>
              <Label>Video</Label>
              <Input control={control} name="video" placeholder="Video"></Input>
              <p className="text-sm text-left text-text3">
                Place Youtube or Vimeo Video URL
              </p>
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label>Campaign End Method</Label>
              <Dropdown>
                <Dropdown.Select
                  placeholder={
                    getDropdownLabel("campaignEndMethod") || "Select a method"
                  }
                ></Dropdown.Select>
                <Dropdown.List>
                  <Dropdown.Option
                    onClick={() =>
                      handleSelectDropdown("campaignEndMethod", "paypal")
                    }
                  >
                    Aaa
                  </Dropdown.Option>
                </Dropdown.List>
              </Dropdown>
            </FormGroup>

            <FormGroup>
              <Label>Country</Label>
              <Dropdown>
                <Dropdown.Select
                  placeholder={
                    getDropdownLabel("country") || "Select a country"
                  }
                ></Dropdown.Select>
                <Dropdown.List>
                  <Dropdown.Search
                    placeholder="Search country.."
                    onChange={setFilterCountry}
                  ></Dropdown.Search>
                  {countries.length > 0 &&
                    countries.map((country) => (
                      <Dropdown.Option
                        key={country?.name?.common}
                        onClick={() =>
                          handleSelectDropdown("country", country?.name?.common)
                        }
                      >
                        {country?.name?.common}
                      </Dropdown.Option>
                    ))}
                </Dropdown.List>
              </Dropdown>
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label>Start Date</Label>
              <DatePicker
                onChange={setStartDate}
                value={startDate}
                format="dd-MM-yyy"
              />
            </FormGroup>
            <FormGroup>
              <Label>End Date</Label>
              <DatePicker
                onChange={setEndDate}
                value={endDate}
                format="dd-MM-yyy"
              />
            </FormGroup>
          </FormRow>

          <div className="px-10 mt-10 text-center">
            <Button kind="primary" type="submit" className="mx-auto">
              Submit new campaign
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampaignAddNew;
